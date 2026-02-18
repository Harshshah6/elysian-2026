import {
    pgTable,
    uuid,
    varchar,
    integer,
    timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* =========================
   Students
========================= */

export const students = pgTable("students", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 10 }).notNull(),
    course: varchar("course", { length: 100 }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   Events
========================= */

export const events = pgTable("events", {
    id: varchar("id", { length: 100 }).primaryKey(),
    // use your existing IDs like "solo-singing"

    title: varchar("title", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),

    teamSize: integer("team_size").notNull(),
    maxCapacity: integer("max_capacity").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   Registrations (Join Table)
========================= */

export const registrations = pgTable("registrations", {
    id: uuid("id").defaultRandom().primaryKey(),

    studentId: uuid("student_id")
        .references(() => students.id, { onDelete: "cascade" })
        .notNull(),

    eventId: varchar("event_id", { length: 100 })
        .references(() => events.id, { onDelete: "cascade" })
        .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   Team Members
========================= */

export const teamMembers = pgTable("team_members", {
    id: uuid("id").defaultRandom().primaryKey(),

    registrationId: uuid("registration_id")
        .references(() => registrations.id, { onDelete: "cascade" })
        .notNull(),

    name: varchar("name", { length: 255 }).notNull(),
});

/* =========================
   Relations (Optional but Recommended)
========================= */

export const studentsRelations = relations(students, ({ many }) => ({
    registrations: many(registrations),
}));

export const eventsRelations = relations(events, ({ many }) => ({
    registrations: many(registrations),
}));

export const registrationsRelations = relations(registrations, ({ one, many }) => ({
    student: one(students, {
        fields: [registrations.studentId],
        references: [students.id],
    }),
    event: one(events, {
        fields: [registrations.eventId],
        references: [events.id],
    }),
    teamMembers: many(teamMembers),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
    registration: one(registrations, {
        fields: [teamMembers.registrationId],
        references: [registrations.id],
    }),
}));
