import { os } from "@orpc/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
    students,
    events,
    registrations,
    teamMembers,
} from "@/lib/db/schema";
import { eq, count, sql } from "drizzle-orm";

/* =========================
   1️⃣ Get Events
========================= */

const getEvents = os.handler(async () => {
    const allEvents = await db.select().from(events);

    const enriched = await Promise.all(
        allEvents.map(async (ev) => {
            const [{ value }] = await db
                .select({ value: count() })
                .from(registrations)
                .where(eq(registrations.eventId, ev.id));

            const filled = Number(value);

            return {
                ...ev,
                filled,
                slotsLeft: ev.maxCapacity - filled,
            };
        })
    );

    return enriched;
});

/* =========================
   2️⃣ Register Student
========================= */

const registerStudent = os
    .input(
        z.object({
            name: z.string().min(2),
            phone: z.string().regex(/^\d{10}$/),
            course: z.string(),

            selectedEvents: z.array(z.string()).min(1),

            teamData: z
                .record(z.string(), z.array(z.string()))
                .optional(),
        })
    )
    .handler(async ({ input }) => {
        return await db.transaction(async (tx) => {
            // 1️⃣ Create student
            const [student] = await tx
                .insert(students)
                .values({
                    name: input.name,
                    phone: input.phone,
                    course: input.course,
                })
                .returning();

            // 2️⃣ Loop events
            for (const eventId of input.selectedEvents) {
                const [event] = await tx
                    .select()
                    .from(events)
                    .where(eq(events.id, eventId));

                if (!event) {
                    throw new Error("Event not found");
                }

                // Capacity check
                const [{ value }] = await tx
                    .select({ value: count() })
                    .from(registrations)
                    .where(eq(registrations.eventId, eventId));

                const filled = Number(value);

                if (filled >= event.maxCapacity) {
                    throw new Error(`${event.title} is sold out`);
                }

                // Create registration
                const [registration] = await tx
                    .insert(registrations)
                    .values({
                        studentId: student.id,
                        eventId,
                    })
                    .returning();

                // Team members
                if (event.teamSize > 1) {
                    const members = input.teamData?.[eventId] ?? [];

                    if (members.length !== event.teamSize - 1) {
                        throw new Error(
                            `Invalid team size for ${event.title}`
                        );
                    }

                    await tx.insert(teamMembers).values(
                        members.map((name) => ({
                            registrationId: registration.id,
                            name,
                        }))
                    );
                }
            }

            return {
                success: true,
                message: "Registration successful 🎉",
            };
        });
    });

/* =========================
   3️⃣ Get Student By Phone
========================= */

const getStudentByPhone = os
    .input(
        z.object({
            phone: z.string().regex(/^\d{10}$/),
        })
    )
    .handler(async ({ input }) => {
        const [student] = await db
            .select()
            .from(students)
            .where(eq(students.phone, input.phone));

        if (!student) return null;

        const regs = await db
            .select()
            .from(registrations)
            .where(eq(registrations.studentId, student.id));

        return {
            student,
            registrations: regs,
        };
    });


/* =========================
   3️⃣ Get All Students Registrations
========================= */

const getAllRegistrations = os.handler(async () => {
    const rows = await db.execute(sql`
    SELECT 
      s.name,
      s.phone,
      s.course,
      e.id as event,
      e.title as "eventTitle",
      e.team_size as "teamSize",
      r.created_at as "registeredAt",
      COALESCE(
        json_agg(tm.name) FILTER (WHERE tm.name IS NOT NULL),
        '[]'
      ) as "teamMembers"
    FROM registrations r
    JOIN students s ON r.student_id = s.id
    JOIN events e ON r.event_id = e.id
    LEFT JOIN team_members tm ON tm.registration_id = r.id
    GROUP BY r.id, s.id, e.id
    ORDER BY r.created_at DESC
  `);

    return rows.rows;
});


/* =========================
   Router Export
========================= */

export const router = {
    getEvents,
    registerStudent,
    getStudentByPhone,
    getAllRegistrations,
};
