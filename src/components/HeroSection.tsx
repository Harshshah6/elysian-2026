'use client';
import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <ParticleBackground />

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-1" style={{
                background: "radial-gradient(ellipse at center, transparent 0%, hsl(240 10% 4%) 70%)"
            }} />
            <div className="absolute bottom-0 left-0 right-0 h-40 z-1" style={{
                background: "linear-gradient(to top, hsl(240 10% 4%), transparent)"
            }} />

            <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Netflix-style masked title with cinematic red glow */}
                    <h1
                        className="font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] tracking-wider leading-none select-none"
                        style={{
                            background: "linear-gradient(180deg, hsl(0 0% 100%) 0%, hsl(357 91% 47%) 40%, hsl(357 91% 30%) 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 40px hsl(357 91% 47% / 0.5)) drop-shadow(0 0 80px hsl(357 91% 47% / 0.2))",
                        }}
                    >
                        ELYSIAN
                    </h1>

                    {/* Animated glow sweep */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(90deg, transparent 0%, hsl(357 91% 47% / 0.15) 50%, transparent 100%)",
                            mixBlendMode: "screen",
                        }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    />
                </motion.div>

                <motion.p
                    className="mt-4 text-lg sm:text-xl text-muted-foreground tracking-widest uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                    Where Talent Meets Stardom
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                    <Link
                        href="/register"
                        className="inline-block mt-10 px-10 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg tracking-wide transition-all duration-300 hover:scale-105 glow-primary hover:glow-primary-intense"
                    >
                        Register Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
