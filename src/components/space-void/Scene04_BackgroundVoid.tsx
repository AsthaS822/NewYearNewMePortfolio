import { motion } from "framer-motion";
import CinematicNoise from "./CinematicNoise";

export default function Scene04_BackgroundVoid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Radial Gradient */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsl(270 100% 60% / 0.1) 0%, hsl(260 30% 3%) 100%)`
        }}
      />

      {/* Animated Digital Noise/Grain - Replaced SVG with Canvas for performance */}
      <CinematicNoise opacity={0.03} />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
    </div>
  );
}
