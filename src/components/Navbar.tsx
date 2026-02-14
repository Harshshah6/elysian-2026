'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathName = usePathname();

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4"
            style={{ background: "linear-gradient(to bottom, hsl(240 10% 4% / 0.9), transparent)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Link href="/" className="font-display text-3xl text-foreground tracking-widest hover:text-primary transition-colors">
                ELYSIAN
            </Link>
            <div className="flex gap-6 items-center">
                {/* <Link
                    href="/"
                    className={`text-sm tracking-wide transition-colors ${pathName === "/" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                    Home
                </Link> */}
                <Link
                    href="/register"
                    className="text-sm px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium transition-all duration-300 hover:scale-105 glow-primary"
                >
                    Register
                </Link>
            </div>
        </motion.nav>
    );
}
