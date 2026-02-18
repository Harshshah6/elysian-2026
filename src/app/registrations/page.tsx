'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Phone, Hash, Check } from "lucide-react";
import { client } from '@/lib/orpc/orpc';

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

export default function Registrations() {
    const [search, setSearch] = useState("");
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await client.getAllRegistrations();
                setRegistrations(data as unknown as Registration[]);
            } catch (err) {
                console.error("Failed to fetch registrations", err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const filtered = registrations.filter(r =>
        [r.name, r.eventTitle, r.course]
            .some(f => f?.toLowerCase().includes(search.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-500">
                Loading registrations...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080808] text-[#d4d4d4] font-sans antialiased pt-8">
            <div className="max-w-6xl mx-auto px-6 py-16">

                {/* Header */}
                <header className="mb-12">
                    <div className="flex justify-between items-end border-b border-zinc-800 pb-8">
                        <div>
                            <h1 className="text-3xl font-light text-white uppercase">
                                <span className="text-red-600">ELYSIAN</span> Registrations
                            </h1>
                            <p className="text-xs text-zinc-500 mt-2 tracking-widest uppercase">
                                Registration Database / 2026
                            </p>
                        </div>

                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                            <input
                                type="text"
                                placeholder="Search records..."
                                className="w-full bg-zinc-900/50 border border-zinc-800 py-2 pl-9 pr-4 rounded-sm text-xs focus:outline-none focus:border-red-600 transition-colors"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                {/* Table */}
                <div className="space-y-1">
                    <div className="grid grid-cols-12 px-4 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        <div className="col-span-4">Student Name</div>
                        <div className="col-span-4">Event</div>
                        <div className="col-span-3">Details</div>
                        <div className="col-span-1"></div>
                    </div>

                    {filtered.map((reg, i) => (
                        <div key={i} className="group">
                            <button
                                onClick={() => setExpandedId(expandedId === i ? null : i)}
                                className={`w-full grid grid-cols-12 items-center px-4 py-4 text-left border border-zinc-900 transition-colors ${expandedId === i
                                    ? 'bg-zinc-900/50 border-zinc-700'
                                    : 'bg-transparent hover:bg-zinc-900/30'
                                    }`}
                            >
                                <div className="col-span-4">
                                    <p className="text-sm font-medium text-zinc-200">{reg.name}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-tighter mt-0.5">{reg.course}</p>
                                </div>

                                <div className="col-span-4">
                                    <span className="text-[11px] font-bold text-red-500/80 uppercase tracking-tight">
                                        {reg.eventTitle}
                                    </span>
                                </div>

                                <div className="col-span-3">
                                    <p className="text-[10px] text-zinc-500 uppercase font-medium">
                                        {reg.teamSize === 1 ? 'Solo' : `Team of ${reg.teamSize}`}
                                    </p>
                                </div>

                                <div className="col-span-1 flex justify-end">
                                    <ChevronDown
                                        size={14}
                                        className={`text-zinc-700 transition-transform ${expandedId === i ? 'rotate-180 text-white' : ''
                                            }`}
                                    />
                                </div>
                            </button>

                            <AnimatePresence>
                                {expandedId === i && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden bg-[#0c0c0c] border-x border-b border-zinc-800"
                                    >
                                        <div className="p-6 grid grid-cols-2 gap-8 text-xs">
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-zinc-600 font-bold uppercase text-[9px] mb-1 tracking-widest">
                                                        Contact Information
                                                    </p>
                                                    <p className="text-zinc-300 flex items-center gap-2">
                                                        <Phone size={12} className="text-zinc-700" />
                                                        {reg.phone}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-zinc-600 font-bold uppercase text-[9px] mb-1 tracking-widest">
                                                        Registration Date
                                                    </p>
                                                    <p className="text-zinc-300 flex items-center gap-2">
                                                        <Hash size={12} className="text-zinc-700" />
                                                        {new Date(reg.registeredAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-zinc-600 font-bold uppercase text-[9px] mb-2 tracking-widest">
                                                    Team Members
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-2 py-1 bg-zinc-800 rounded-sm text-zinc-400 border border-zinc-700">
                                                        {reg.name} (Lead)
                                                    </span>

                                                    {reg.teamMembers?.map((m, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 bg-zinc-900 rounded-sm text-zinc-500 border border-zinc-800"
                                                        >
                                                            {m}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <footer className="mt-8 flex justify-between items-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <Check size={10} className="text-green-600" />
                            Database Verified
                        </span>
                        <span>Total Records: {filtered.length}</span>
                    </div>
                </footer>
            </div>
        </div>
    );
}
