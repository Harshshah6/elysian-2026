'use client'
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Users, User as UserIcon } from "lucide-react";

interface Registration {
    name: string;
    phone: string;
    course: string;
    event: string;
    eventTitle: string;
    teamSize: number;
    teamMembers: string[];
    registeredAt: string;
}

const demoRegistrations: Registration[] = [
    {
        name: "Aarav Patel",
        phone: "+91 98765 43210",
        course: "BCA",
        event: "battle-bands",
        eventTitle: "Battle of Bands",
        teamSize: 4,
        teamMembers: ["Meera Sharma", "Rohan Gupta", "Priya Singh"],
        registeredAt: "2026-02-10T14:30:00.000Z",
    },
    {
        name: "Ishita Verma",
        phone: "+91 87654 32109",
        course: "BCOM A",
        event: "solo-singing",
        eventTitle: "Solo Singing",
        teamSize: 1,
        teamMembers: [],
        registeredAt: "2026-02-11T09:15:00.000Z",
    },
    {
        name: "Karan Mehta",
        phone: "+91 76543 21098",
        course: "BCOM B",
        event: "standup",
        eventTitle: "Stand-Up Comedy",
        teamSize: 1,
        teamMembers: [],
        registeredAt: "2026-02-11T16:45:00.000Z",
    },
    {
        name: "Ananya Reddy",
        phone: "+91 65432 10987",
        course: "BBA",
        event: "group-dance",
        eventTitle: "Group Dance",
        teamSize: 5,
        teamMembers: ["Divya Nair", "Sneha Joshi", "Ravi Kumar", "Tanvi Desai"],
        registeredAt: "2026-02-12T11:00:00.000Z",
    },
    {
        name: "Vikram Chauhan",
        phone: "+91 54321 09876",
        course: "BBA Aviation",
        event: "short-film",
        eventTitle: "Short Film",
        teamSize: 3,
        teamMembers: ["Neha Kapoor", "Arjun Rao"],
        registeredAt: "2026-02-12T18:20:00.000Z",
    },
    {
        name: "Simran Kaur",
        phone: "+91 43210 98765",
        course: "BCOM A",
        event: "fashion-walk",
        eventTitle: "Fashion Walk",
        teamSize: 6,
        teamMembers: ["Pooja Iyer", "Kavya Menon", "Ritu Agarwal", "Sanya Malik", "Tara Bose"],
        registeredAt: "2026-02-13T08:30:00.000Z",
    },
];

export default function Registrations() {
    // const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [search, setSearch] = useState("");

    const registrations = useMemo(() => {
        if (typeof window === "undefined") return demoRegistrations;

        try {
            const stored = JSON.parse(
                localStorage.getItem("elysian-registrations") || "[]"
            );
            return [...demoRegistrations, ...stored];
        } catch {
            return demoRegistrations;
        }
    }, []);


    const filtered = registrations.filter(
        (r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            (r.eventTitle || r.event).toLowerCase().includes(search.toLowerCase()) ||
            r.course.toLowerCase().includes(search.toLowerCase())
    );

    const totalParticipants = registrations.reduce(
        (sum, r) => sum + r.teamSize,
        0
    );

    return (
        <div className="min-h-screen px-3 sm:px-8 py-20 sm:py-24 relative">
            <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse at top, hsl(357 91% 47% / 0.06) 0%, transparent 50%)"
            }} />

            <div className="relative max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-2">Registrations</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-primary" />
                            {registrations.length} registration{registrations.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-border">•</span>
                        <span>{totalParticipants} total participants</span>
                    </div>
                </motion.div>

                {/* Search */}
                <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, event, or course..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 text-sm"
                        />
                    </div>
                </motion.div>

                {/* Registration cards */}
                <div className="grid gap-3">
                    {filtered.map((reg, i) => (
                        <motion.div
                            key={i}
                            className="glass-card rounded-xl p-4 sm:p-5 border border-border hover:border-primary/20 transition-all duration-300 group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                                        <UserIcon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-base text-foreground">{reg.name}</h3>
                                        <p className="text-xs text-muted-foreground mt-0.5">{reg.phone} · {reg.course}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-13 sm:ml-0">
                                    <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                                        {reg.eventTitle || reg.event}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${reg.teamSize === 1
                                        ? "bg-muted text-muted-foreground"
                                        : "bg-accent/10 text-accent border border-accent/20"
                                        }`}>
                                        {reg.teamSize === 1 ? "Solo" : `Team of ${reg.teamSize}`}
                                    </span>
                                </div>
                            </div>
                            {reg.teamSize > 1 && reg.teamMembers?.filter(Boolean).length > 0 && (
                                <div className="mt-3 pt-3 border-t border-border/50 ml-13 sm:ml-13">
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-muted-foreground/70">Team: </span>
                                        {reg.name}, {reg.teamMembers.filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            )}
                            <p className="text-[11px] text-muted-foreground/50 mt-2 ml-13 sm:ml-13">
                                {new Date(reg.registeredAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <motion.div
                        className="glass-card rounded-2xl p-12 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-muted-foreground">No matching registrations found.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
