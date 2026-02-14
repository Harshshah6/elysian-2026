'use client';
import { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Play, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import ParticleBackground from "./ParticleBackground";

export default function HeroSection() {
    // Mouse Tracking Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the movement
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            <ParticleBackground/>

            {/* Interactive Mouse Glow Overlay */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-10 opacity-50"
                style={{
                    background: useMotionValue(`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(229, 9, 20, 0.15), transparent 80%)`)
                }}
            />

            {/* Cinematic Background Vignette */}
            <div className="absolute inset-0 z-0" style={{
                background: "radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.4) 40%, #0a0a0a 90%)"
            }} />

            <div className="absolute bottom-0 left-0 right-0 h-64 z-1 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

            <div className="relative z-20 text-center px-4 w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Premiere Label */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="bg-red-600 text-[10px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-tighter">
                            Original
                        </span>
                        <span className="text-zinc-500 font-bold tracking-[0.4em] text-[10px] uppercase">
                            Campus Premiere 2026
                        </span>
                    </div>

                    {/* Main Title - ELYSIAN */}
                    <div className="relative mb-6">
                        <h1
                            className="text-[14vw] sm:text-[12vw] lg:text-[11rem] font-[950] tracking-tighter leading-[0.8] select-none italic text-white"
                            style={{
                                filter: "drop-shadow(0 0 30px rgba(229, 9, 20, 0.1))",
                                fontFamily: "Inter, system-ui, sans-serif"
                            }}
                        >
                            ELYSIAN
                        </h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-1.5 md:h-3 bg-red-600 w-1/4 mx-auto mt-4 rounded-full shadow-[0_0_25px_#e50914]"
                        />
                    </div>

                    {/* Metadata Bar */}
                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
                        <span className="hidden sm:inline-flex text-green-500 font-bold text-sm">98% Match</span>

                        <span className="text-zinc-400 font-bold text-[10px] border border-zinc-800 px-2 py-0.5 rounded">TV-MA</span>

                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs md:text-sm font-medium">
                            <Calendar className="w-4 h-4 text-red-600" />
                            <span>Coming March 2026</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs md:text-sm font-medium">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span>Demo Hall</span>
                        </div>
                    </div>

                    {/* Synopsis */}
                    <p className="max-w-md mx-auto text-zinc-500 text-sm md:text-base leading-relaxed mb-10 font-medium px-4">
                        From lecture halls to the spotlight. The exclusive campus premiere where talent meets stardom.
                    </p>

                    {/* Primary Action Only */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-30"
                    >
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-3 px-12 py-4 rounded-md bg-white text-black font-[900] text-lg transition-all hover:bg-zinc-200 shadow-[0_10px_40px_rgba(255,255,255,0.1)]"
                        >
                            <Play className="w-5 h-5 fill-black" />
                            REGISTER NOW
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}