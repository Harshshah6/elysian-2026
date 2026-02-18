export const HeroBg = () => {
    const shows = [
        { name: "Peaky Blinders", image: "/pb.jpg" },
        { name: "Breaking Bad", image: "/bb.jpg" },
        { name: "Better Call Saul", image: "/bcs.jpg" },
        { name: "Narcos", image: "/narcos.webp" },
        { name: "Stranger Things", image: "/stranger-things.jpg" },
        { name: "Squid Game", image: "/squid-game.jpeg" },
        { name: "Money Heist", image: "/money-heist.jpeg" },
        { name: "Sacred Games", image: "/sacred-games.jpg" },
        { name: "Game of Thrones", image: "/got.jpg" },
        { name: "Wednesday", image: "/wednesday.jpg" },
    ];

    return (
        <div suppressHydrationWarning className="absolute inset-0 w-full h-max overflow-hidden bg-black">
            {/* Responsive Grid */}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full px-4 py-6 scale-100 sm:scale-105 md:scale-110"
            >
                {shows.map((show, index) => (
                    <div
                        key={index}
                        className="relative aspect-2/3 overflow-hidden rounded-md"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${show.image})` }}
                        />
                    </div>
                ))}
            </div>

            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Vignette Effect */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/60" />
        </div>
    );
};