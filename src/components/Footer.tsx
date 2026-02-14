import { Github, Globe } from "lucide-react";
export default function Footer() {
    return (
        <footer className="border-t border-border bg-[#0a0a0a] backdrop-blur-sm py-6 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                <p>
                    © {new Date().getFullYear()} <span className="font-display text-foreground tracking-wider">ELYSIAN</span> — All rights reserved
                </p>
                <div className="flex items-center gap-2">
                    <span>Built by</span>
                    <span className="text-foreground font-medium">Harsh S Shah</span>
                    <span className="text-muted-foreground/50">|</span>
                    <span>BCA 4th Sem</span>
                    <span className="text-muted-foreground/50">|</span>
                    <a href="https://github.com/harshshah6" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Github className="w-4 h-4" />
                    </a>
                    <a href="https://harshbits.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        <Globe className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
}