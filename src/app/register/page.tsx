'use client'
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Sparkles, CheckCircle2, Ticket, Users, Info } from "lucide-react";
import { toast } from "sonner";
import ParticleBackground from "@/components/ParticleBackground";

// Added 'maxCapacity' and 'currentRegistrations' to simulate a "Max Out" state
const eventOptions = [
    { id: "solo-singing", title: "Solo Singing", emoji: "🎤", teamSize: 1, category: "Music", max: 30, filled: 28 },
    { id: "group-dance", title: "Group Dance", emoji: "💃", teamSize: 5, category: "Dance", max: 10, filled: 10 }, // Maxed Out
    { id: "standup", title: "Stand-Up Comedy", emoji: "🎭", teamSize: 1, category: "Drama", max: 15, filled: 5 },
    { id: "battle-bands", title: "Battle of Bands", emoji: "🎸", teamSize: 4, category: "Music", max: 8, filled: 8 }, // Maxed Out
    { id: "short-film", title: "Short Film", emoji: "🎬", teamSize: 3, category: "Media", max: 20, filled: 12 },
    { id: "fashion-walk", title: "Fashion Walk", emoji: "👗", teamSize: 6, category: "Lifestyle", max: 12, filled: 4 },
];

const courses = ["BBA", "BBA Aviation", "BCOM A", "BCOM B", "BCA"];

export default function Register() {
    const [form, setForm] = useState({
        name: "", phone: "", course: "",
        selectedEvents: [] as string[],
        teamData: {} as Record<string, string[]>,
    });

    // Calculate progress for the top bar
    const progress = useMemo(() => {
        let p = 0;
        if (form.name && form.phone && form.course) p += 40;
        if (form.selectedEvents.length > 0) p += 60;
        return p;
    }, [form]);

    const toggleEvent = (ev: typeof eventOptions[0]) => {
        if (ev.filled >= ev.max && !form.selectedEvents.includes(ev.id)) {
            toast.error("This show is Sold Out!");
            return;
        }

        setForm(prev => {
            const isSelected = prev.selectedEvents.includes(ev.id);
            const newEvents = isSelected
                ? prev.selectedEvents.filter(id => id !== ev.id)
                : [...prev.selectedEvents, ev.id];

            const newTeamData = { ...prev.teamData };
            if (isSelected) {
                delete newTeamData[ev.id];
            } else if (ev.teamSize > 1) {
                newTeamData[ev.id] = Array(ev.teamSize - 1).fill("");
            }

            return { ...prev, selectedEvents: newEvents, teamData: newTeamData };
        });
    };

    const handleTeamMemberChange = (eventId: string, index: number, value: string) => {
        setForm(prev => ({
            ...prev,
            teamData: { ...prev.teamData, [eventId]: prev.teamData[eventId].map((m, i) => i === index ? value : m) }
        }));
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 pb-20 selection:bg-red-600 pt-10">

            {/* <HeroBg /> */}
            <ParticleBackground />
            {/* Cinematic Background Vignette */}
            <div className="absolute inset-0 z-0" style={{
                background: "radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.4) 40%, #0a0a0a 90%)"
            }} />
            <div className="absolute bottom-0 left-0 right-0 h-64 z-1 bg-linear-to-t from-[#0a0a0a] to-transparent" />

            {/* Top Cinematic Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
                <motion.div
                    className="h-full bg-red-600 shadow-[0_0_15px_#e50914]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-10 z-48">

                {/* Main Form Left Side */}
                <div className="lg:col-span-2 space-y-12">
                    <header className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-red-600 font-bold tracking-[0.5em] text-[10px] sm:text-xs uppercase mb-2 block">
                                An Elysian Original Series
                            </span>

                            {/* The New Cinematic Title */}
                            <h1 className="text-6xl md:text-8xl font-black leading-[0.8] mb-4 select-none">
                                REGIS<span className="text-red-600">TER</span>
                                <br />
                                <span className="text-zinc-700 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)] italic font-light tracking-widest">
                                    2026
                                </span>
                            </h1>

                            <div className="flex items-center gap-4 mt-4">
                                <span className="border border-zinc-700 px-2 py-0.5 text-[10px] font-bold text-zinc-400">
                                    TV-MA
                                </span>
                                <span className="text-zinc-400 text-xs font-medium tracking-wide">
                                    Music, Dance, Drama & more
                                </span>
                                <span className="bg-green-600/20 text-green-500 text-[10px] font-bold px-2 py-0.5 rounded">
                                    98% Match
                                </span>
                            </div>

                            <p className="mt-6 text-zinc-500 text-sm max-w-md leading-relaxed">
                                Step into the limelight. Showcase of talent.
                            </p>
                        </motion.div>
                    </header>

                    {/* Step 1: Profile */}
                    <div className="space-y-6">
                        <h2 className="flex items-center gap-2 text-lg font-semibold"><User className="w-5 h-5 text-red-600" /> Personal Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                placeholder="Full Name"
                                className="bg-zinc-900/50 border-b-2 border-zinc-800 p-4 focus:border-red-600 outline-none transition-all"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                            <input
                                placeholder="Phone"
                                className="bg-zinc-900/50 border-b-2 border-zinc-800 p-4 focus:border-red-600 outline-none transition-all"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                            />
                            <select
                                className="bg-zinc-900/50 border-b-2 border-zinc-800 p-4 focus:border-red-600 outline-none md:col-span-2"
                                value={form.course}
                                onChange={e => setForm({ ...form, course: e.target.value })}
                            >
                                <option value="">Select Course</option>
                                {courses.map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Step 2: Grid Selection with "Max Out" state */}
                    <div className="space-y-6">
                        <h2 className="flex items-center gap-2 text-lg font-semibold"><Sparkles className="w-5 h-5 text-red-600" /> Select Genres</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {eventOptions.map((ev) => {
                                const active = form.selectedEvents.includes(ev.id);
                                const isSoldOut = ev.filled >= ev.max;
                                return (
                                    <motion.div
                                        key={ev.id}
                                        onClick={() => toggleEvent(ev)}
                                        whileHover={!isSoldOut ? { y: -5, backgroundColor: "rgba(39, 39, 42, 0.8)" } : {}}
                                        className={`relative p-5 rounded-lg border-l-4 cursor-pointer transition-all duration-300 ${isSoldOut ? "opacity-40 grayscale cursor-not-allowed border-zinc-700 bg-zinc-800/20" :
                                            active ? "border-red-600 bg-zinc-800/80 shadow-2xl" : "border-transparent bg-zinc-900/40"
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{ev.category}</span>
                                                <h3 className="text-xl font-bold mt-1">{ev.title}</h3>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">{ev.teamSize === 1 ? 'Solo' : `Team of ${ev.teamSize}`}</span>
                                                    {isSoldOut ? (
                                                        <span className="text-[10px] text-red-500 font-black uppercase tracking-tighter">● Sold Out</span>
                                                    ) : (
                                                        <span className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">● {ev.max - ev.filled} Slots Left</span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-3xl">{ev.emoji}</span>
                                        </div>
                                        {active && <CheckCircle2 className="absolute bottom-4 right-4 text-red-600 w-5 h-5" />}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Team Section (Dynamic) */}
                    <AnimatePresence>
                        {form.selectedEvents.some(id => eventOptions.find(e => e.id === id)?.teamSize! > 1) && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <h2 className="flex items-center gap-2 text-lg font-semibold"><Users className="w-5 h-5 text-red-600" /> Cast Your Team</h2>
                                {form.selectedEvents.map(id => {
                                    const ev = eventOptions.find(e => e.id === id);
                                    if (!ev || ev.teamSize === 1) return null;
                                    return (
                                        <div key={id} className="bg-zinc-900/30 p-6 rounded-xl border border-zinc-800">
                                            <p className="text-sm font-bold text-red-600 mb-4 tracking-widest uppercase italic">{ev.title} Squad</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {form.teamData[id]?.map((m, i) => (
                                                    <input
                                                        key={i}
                                                        placeholder={`Member ${i + 2} Full Name`}
                                                        className="bg-black/40 border border-zinc-800 p-3 text-sm rounded outline-none focus:border-red-600"
                                                        value={m}
                                                        onChange={e => handleTeamMemberChange(id, i, e.target.value)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Floating Sticky Watchlist (Summary) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-4">
                        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Ticket className="w-24 h-24 -rotate-12" />
                            </div>

                            <h3 className="text-xs font-black text-red-600 uppercase tracking-[0.3em] mb-6">Your Spotlight</h3>

                            <div className="space-y-4 mb-8">
                                {form.selectedEvents.length === 0 ? (
                                    <p className="text-zinc-500 text-sm italic">No events selected yet...</p>
                                ) : (
                                    form.selectedEvents.map(id => {
                                        const ev = eventOptions.find(e => e.id === id);
                                        return (
                                            <div key={id} className="flex justify-between items-center group">
                                                <span className="text-sm font-medium">{ev?.title}</span>
                                                <div className="h-px flex-1 mx-4 bg-zinc-800 group-hover:bg-red-900 transition-colors" />
                                                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-black">ADMIT 1</span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <div className="pt-6 border-t border-zinc-800">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-zinc-400 text-sm italic">Character Name</span>
                                    <span className="text-sm font-bold">{form.name || "—"}</span>
                                </div>
                                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(229,9,20,0.3)] transition-all active:scale-95">
                                    Final Submission
                                </button>
                                <div className="flex items-center gap-2 mt-4 text-[10px] text-zinc-500">
                                    <Info className="w-3 h-3" />
                                    <span>Registration is binding for Elysian 2026.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}