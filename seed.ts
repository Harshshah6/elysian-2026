import "dotenv/config";
import { db } from "./src/lib/db";
import { events, students, registrations, teamMembers } from "./src/lib/db/schema";

async function main() {
    console.log("🌱 Seeding database...");

    /* =========================
       1️⃣ Seed Events
    ========================= */

    await db.insert(events).values([
        {
            id: "solo-singing",
            title: "Solo Singing",
            category: "Music",
            teamSize: 1,
            maxCapacity: 30,
        },
        {
            id: "group-dance",
            title: "Group Dance",
            category: "Dance",
            teamSize: 5,
            maxCapacity: 10,
        },
        {
            id: "standup",
            title: "Stand-Up Comedy",
            category: "Drama",
            teamSize: 1,
            maxCapacity: 15,
        },
        {
            id: "battle-bands",
            title: "Battle of Bands",
            category: "Music",
            teamSize: 4,
            maxCapacity: 8,
        },
        {
            id: "short-film",
            title: "Short Film",
            category: "Media",
            teamSize: 3,
            maxCapacity: 20,
        },
        {
            id: "fashion-walk",
            title: "Fashion Walk",
            category: "Lifestyle",
            teamSize: 6,
            maxCapacity: 12,
        },
    ]).onConflictDoNothing();

    console.log("✅ Events seeded");

    /* =========================
       2️⃣ Seed Sample Student
    ========================= */

    const [student] = await db.insert(students).values({
        name: "Arjun Rao",
        phone: "9876543210", // use string if you followed best practice
        course: "BBA",
    }).returning();

    console.log("✅ Student created:", student.name);

    /* =========================
       3️⃣ Register Student
    ========================= */

    const [registration] = await db.insert(registrations).values({
        studentId: student.id,
        eventId: "group-dance",
    }).returning();

    console.log("✅ Registered for Group Dance");

    /* =========================
       4️⃣ Add Team Members
    ========================= */

    await db.insert(teamMembers).values([
        {
            registrationId: registration.id,
            name: "Rahul Sharma",
        },
        {
            registrationId: registration.id,
            name: "Sneha Patel",
        },
        {
            registrationId: registration.id,
            name: "Karan Mehta",
        },
        {
            registrationId: registration.id,
            name: "Priya Nair",
        },
    ]);

    console.log("✅ Team members added");

    console.log("🎉 Seeding complete!");
}

main()
    .catch((err) => {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });
