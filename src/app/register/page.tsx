'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, GraduationCap, Sparkles } from "lucide-react";
import { toast } from "sonner";

const eventOptions = [
    { id: "solo-singing", title: "Solo Singing", emoji: "🎤", teamSize: 1 },
    { id: "group-dance", title: "Group Dance", emoji: "💃", teamSize: 5 },
    { id: "standup", title: "Stand-Up Comedy", emoji: "🎭", teamSize: 1 },
    { id: "battle-bands", title: "Battle of Bands", emoji: "🎸", teamSize: 4 },
    { id: "short-film", title: "Short Film", emoji: "🎬", teamSize: 3 },
    { id: "fashion-walk", title: "Fashion Walk", emoji: "👗", teamSize: 6 },
];

const courses = [
    "BBA",
    "BBA Aviation",
    "BCOM A",
    "BCOM B",
    "BCA",
];

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        course: "",
        event: "",
        teamSize: 1,
        teamMembers: [""],
    });

    const selectedEvent = eventOptions.find((e) => e.id === form.event);
    const isTeamEvent = selectedEvent ? selectedEvent.teamSize > 1 : false;

    const handleEventSelect = (eventId: string) => {
        const ev = eventOptions.find((e) => e.id === eventId);
        const size = ev?.teamSize || 1;
        setForm({
            ...form,
            event: eventId,
            teamSize: size,
            teamMembers: size > 1 ? Array(size - 1).fill("") : [""],
        });
    };

    const handleTeamMemberChange = (index: number, value: string) => {
        const updated = [...form.teamMembers];
        updated[index] = value;
        setForm({ ...form, teamMembers: updated });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.phone || !form.course || !form.event) {
            toast.error("Please fill all fields");
            return;
        }
        if (isTeamEvent && form.teamMembers.some((m) => !m.trim())) {
            toast.error("Please fill all team member names");
            return;
        }

        const existing = JSON.parse(localStorage.getItem("elysian-registrations") || "[]");
        existing.push({
            ...form,
            eventTitle: selectedEvent?.title,
            registeredAt: new Date().toISOString(),
        });
        localStorage.setItem("elysian-registrations", JSON.stringify(existing));

        toast.success("Registration Successful! 🎉");
        setForm({ name: "", phone: "", course: "", event: "", teamSize: 1, teamMembers: [""] });
    };

    const inputClass =
        "w-full pl-11 pr-4 py-3.5 rounded-xl bg-secondary/80 border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 focus:bg-secondary transition-all duration-300 text-sm";

    return (
        <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-20 sm:py-24 relative">
            {/* Background effects */}
            <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse at top, hsl(357 91% 47% / 0.08) 0%, transparent 50%)"
            }} />
            <div className="absolute inset-0" style={{
                background: "radial-gradient(circle at 80% 80%, hsl(357 91% 47% / 0.04) 0%, transparent 40%)"
            }} />

            <motion.form
                onSubmit={handleSubmit}
                className="relative w-full max-w-md sm:max-w-lg glass-card rounded-2xl p-6 sm:p-10 cinematic-shadow"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1
                            className="font-display text-5xl sm:text-6xl leading-none mb-2"
                            style={{
                                background: "linear-gradient(180deg, hsl(0 0% 100%) 30%, hsl(357 91% 47%) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Register
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base">Join the spotlight at Elysian</p>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent mb-7" />

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={inputClass}
                            placeholder="Enter your full name"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="mb-4">
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className={inputClass}
                            placeholder="+91 99999 99999"
                        />
                    </div>
                </div>

                {/* Course */}
                <div className="mb-6">
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Course</label>
                    <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <select
                            value={form.course}
                            onChange={(e) => setForm({ ...form, course: e.target.value })}
                            className={`${inputClass} appearance-none cursor-pointer`}
                        >
                            <option value="">Select your course</option>
                            {courses.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent mb-6" />

                {/* Event Selection */}
                <div className="mb-6">
                    <label className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Select Event
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {eventOptions.map((ev) => (
                            <motion.button
                                key={ev.id}
                                type="button"
                                onClick={() => handleEventSelect(ev.id)}
                                className={`flex flex-col items-center gap-1.5 p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer ${form.event === ev.id
                                    ? "border-primary bg-primary/10 glow-primary"
                                    : "border-border bg-secondary/60 hover:border-primary/40 hover:bg-secondary"
                                    }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-2xl sm:text-3xl">{ev.emoji}</span>
                                <span className="text-xs text-foreground font-medium text-center leading-tight">{ev.title}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${ev.teamSize === 1
                                    ? "bg-muted text-muted-foreground"
                                    : "bg-primary/10 text-primary"
                                    }`}>
                                    {ev.teamSize === 1 ? "Solo" : `Team of ${ev.teamSize}`}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Team Members */}
                {isTeamEvent && selectedEvent && (
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                            <label className="block text-xs font-medium text-primary mb-3 uppercase tracking-wider">
                                Team Members ({selectedEvent.teamSize} total including you)
                            </label>
                            <div className="space-y-2.5">
                                {form.teamMembers.map((member, i) => (
                                    <div key={i} className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/50 font-mono">
                                            {String(i + 2).padStart(2, "0")}
                                        </span>
                                        <input
                                            type="text"
                                            value={member}
                                            onChange={(e) => handleTeamMemberChange(i, e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/80 border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300 text-sm"
                                            placeholder={`Member ${i + 2} name`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Submit */}
                <motion.button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg tracking-wide transition-all duration-300 hover:scale-[1.02] glow-primary hover:glow-primary-intense"
                    whileTap={{ scale: 0.97 }}
                >
                    Submit Registration
                </motion.button>

                <p className="text-center text-xs text-muted-foreground/50 mt-4">
                    By registering you agree to participate in Elysian events
                </p>
            </motion.form>
        </div>
    );
}

