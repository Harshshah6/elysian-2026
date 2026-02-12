import { HeroBg } from "@/components/hero-bg";
import { Particles } from "@/components/ui/particles";

const HomePage = () => {
  return (
    <div className="relative min-h-screen">
      <HeroBg />
      <Particles
        className="absolute inset-0 z-0"
        quantity={50}
        ease={100}
        size={0.001}
        refresh
      />
    </div>
  );
};

export default HomePage;
