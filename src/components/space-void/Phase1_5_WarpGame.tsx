import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";

interface WarpGameProps {
    onComplete: () => void;
}

export default function Phase1_5_WarpGame({ onComplete }: WarpGameProps) {
    const [distance, setDistance] = useState(0);
    const [debris, setDebris] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
    const [velocity, setVelocity] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [isWarping, setIsWarping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const keysPressed = useRef<{ [key: string]: boolean }>({});

    // Physics Loop for "Banking/Tilting" only
    useEffect(() => {
        if (isWarping) return;
        let animationFrameId: number;

        const updatePhysics = () => {
            let targetTilt = 0;
            if (keysPressed.current["ArrowLeft"]) targetTilt = -0.5;
            if (keysPressed.current["ArrowRight"]) targetTilt = 0.5;

            setVelocity(prev => {
                const diff = targetTilt - prev;
                const newVelocity = prev + diff * 0.1;
                // This handles the "banking" look while moving
                setRotation(newVelocity * 20);
                return newVelocity;
            });

            animationFrameId = requestAnimationFrame(updatePhysics);
        };
        updatePhysics();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isWarping]);

    // Keyboard state tracking
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { keysPressed.current[e.key] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current[e.key] = false; };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // Distance Loop with Speed logic
    useEffect(() => {
        if (isWarping) return;

        const interval = setInterval(() => {
            setDistance((prev) => {
                if (prev >= 100) {
                    return 100;
                }

                // BASE SPEED: Always moving forward slowly
                let speed = 0.2;

                // KEY CONTROL: Right Arrow adds speed, Left Arrow subtracts speed
                if (keysPressed.current["ArrowRight"]) speed += 0.8;
                if (keysPressed.current["ArrowLeft"]) speed -= 0.6;
                // TURBO: ArrowUp for massive boost
                if (keysPressed.current["ArrowUp"]) speed += 1.5;

                // Calculate new distance (clamped between 0 and 100)
                const nextDist = Math.max(0, prev + speed);
                return nextDist;
            });

            setDebris((prev) => [
                ...prev.filter(d => d.size < 300).map(d => ({ ...d, size: d.size * 1.15 })),
                { id: Math.random(), x: Math.random() * 100, y: Math.random() * 100, size: 2 }
            ]);
        }, 100);

        return () => clearInterval(interval);
    }, [isWarping]);

    // Completion Trigger
    useEffect(() => {
        if (distance >= 100 && !isWarping) {
            setIsWarping(true);
            onComplete();
        }
    }, [distance, isWarping, onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-black overflow-hidden cursor-none">
            <AnimatePresence mode="wait">
                {!isWarping && (
                    <motion.div
                        key="game-ui"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full h-full"
                    >

                        {/* Starfield Background */}
                        <div className="absolute inset-0 opacity-40">
                            {[...Array(80)].map((_, i) => (
                                <div key={i} className="absolute bg-white rounded-full animate-pulse"
                                    style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, width: '1px', height: '1px', boxShadow: '0 0 10px white' }}
                                />
                            ))}
                        </div>

                        {/* Floating Debris with Purple Explosion Effects */}
                        {debris.map((d) => (
                            <motion.div
                                key={d.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 - d.size / 300 }}
                                className="absolute border border-purple-500/40 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center text-[10px] font-mono text-purple-400/80 p-2 overflow-hidden select-none"
                                style={{
                                    left: `${d.x}%`,
                                    top: `${d.y}%`,
                                    width: `${d.size}px`,
                                    height: `${d.size}px`,
                                    transform: 'translate(-50%, -50%)',
                                    filter: `blur(${d.size / 100}px)`,
                                    boxShadow: `0 0 ${d.size / 5}px rgba(168, 85, 247, 0.5)`
                                }}
                            >
                                {d.size > 50 && "SYSTEM_ERROR_0x" + Math.floor(d.id * 1000).toString(16)}
                            </motion.div>
                        ))}

                        {/* 3D SHIP: Linked to Distance for Horizontal Path */}
                        <motion.div
                            animate={{
                                // POSITION: Bound to bar (10% to 90% range)
                                left: `${10 + (distance * 0.8)}%`,
                                top: `35%`,
                                // ROTATION: Added +90 to flip the ship face to point RIGHT
                                rotateZ: rotation + 90,
                                rotateY: velocity * 20,
                                scale: keysPressed.current["ArrowUp"] ? 1.2 : 1
                            }}
                            transition={{ type: "spring", damping: 25, stiffness: 120 }}
                            className="absolute w-[400px] h-[400px] pointer-events-none z-[50]"
                            style={{ transform: 'translate(-50%, -50%)' }}
                        >
                            <Suspense fallback={<div className="font-orbitron animate-pulse">WARP_SYNCING...</div>}>
                                <Spline scene="https://prod.spline.design/Ieb0dD1ZAGxPI8lL/scene.splinecode" />
                            </Suspense>

                            {/* Turbo Engine Glow */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/30 blur-[80px] rounded-full transition-opacity duration-300 ${keysPressed.current["ArrowUp"] ? 'opacity-100' : 'opacity-0'}`} />
                        </motion.div>

                        {/* Game HUD */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 space-y-6">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <span className="text-purple-500 text-[10px] font-orbitron tracking-[0.5em] block uppercase opacity-50">Vector Status</span>
                                    <div className="text-white font-orbitron text-xs">WARP VELOCITY: {(distance * 1200).toLocaleString()} KM/S</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-purple-500 text-[10px] font-orbitron tracking-[0.5em] block uppercase opacity-50">Sync Distance</span>
                                    <div className="text-white font-orbitron text-xl">{Math.floor(distance)}%</div>
                                </div>
                            </div>

                            <div className="h-2 w-full bg-white/5 relative overflow-hidden rounded-full">
                                <motion.div animate={{ width: `${distance}%` }} className="h-full bg-purple-500 relative shadow-[0_0_15px_#A855F7]" />
                            </div>

                            <p className="text-white/30 text-center font-mono text-[9px] tracking-[0.4em] uppercase">
                                [ {keysPressed.current["ArrowUp"] ? "TURBO_ACTIVE" : "ARROW_KEYS"} ] TO NAVIGATE THRU VOID
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
