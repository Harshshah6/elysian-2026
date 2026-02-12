import { HeroBg } from "@/components/hero-bg";
import { Particles } from "@/components/ui/particles";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative z-10">
        <HeroBg />
        <Particles
          className="absolute inset-0 z-0"
          quantity={50}
          ease={100}
          size={0.001}
          refresh
        />
      </div>

      {/* Top Bar */}
      <div className="relative z-50 p-4">Top Bar</div>
    </div>
  );
};

export default HomePage;
