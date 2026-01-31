"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const boardRef = useRef<HTMLDivElement>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const ROWS = 6;
    const COLS = 6;

    const systemLogs = [
        "Establishing secure link...",
        "Decrypting core modules...",
        "Allocating neural buffers...",
        "Syncing dimensional clock...",
        "Initializing Tech_OS kernel...",
        "Loading visual assets...",
        "Calibrating scanner array...",
        "System check: 100% stable."
    ];

    useEffect(() => {
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < systemLogs.length) {
                setLogs(prev => [...prev.slice(-4), systemLogs[logIndex]]);
                logIndex++;
            } else {
                clearInterval(logInterval);
            }
        }, 400);

        const board = boardRef.current;
        if (board && board.innerHTML === "") {
            for (let i = 0; i < ROWS; i++) {
                const row = document.createElement("div");
                row.className = "flex flex-1 gap-[2px] bg-black";
                for (let j = 0; j < COLS; j++) {
                    const tile = document.createElement("div");
                    tile.className = "flex-1 relative preserve-3d transition-transform duration-400 bg-white";
                    tile.style.transformStyle = "preserve-3d";
                    // Fix B.1: Fully opaque backgrounds with forced white
                    tile.innerHTML = `
            <div class="absolute inset-0 backface-hidden bg-[url('/assets/frontim.png')] bg-[length:600%_600%] bg-white"></div>
            <div class="absolute inset-0 backface-hidden bg-[url('/assets/backim.png')] bg-[length:600%_600%] rotate-x-180 bg-white"></div>
          `;

                    const bgPosition = `${j * 20}% ${i * 20}%`;
                    tile.querySelectorAll("div").forEach(face => {
                        (face as HTMLElement).style.backgroundPosition = bgPosition;
                        (face as HTMLElement).style.backfaceVisibility = "hidden";
                        // Fix B.3: Increase contrast
                        (face as HTMLElement).style.filter = "contrast(1.15) brightness(1.05)";
                    });

                    // Upgrade C.1: Subtle scan glow on hover
                    tile.addEventListener("mouseenter", () => {
                        gsap.to(tile, {
                            rotateX: 180,
                            duration: 0.65,              // ⬅ slower flip
                            boxShadow: "0 0 40px rgba(255,215,0,0.25)",
                            ease: "power3.out"
                        });
                        gsap.to(tile, {
                            rotateX: 0,
                            boxShadow: "none",
                            duration: 0.65,              // ⬅ slower return
                            delay: 1.6                   // ⬅ let it breathe
                        });
                    });

                    row.appendChild(tile);
                }
                board.appendChild(row);
            }

            // Upgrade C.2: Make the whole board feel "alive"
            gsap.fromTo(
                board.children,
                { opacity: 0 },
                {
                    opacity: 1,
                    stagger: {
                        amount: 1.2,
                        grid: [ROWS, COLS],
                        from: "center"
                    }
                }
            );
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.to(".preloader-status-indicator", {
                text: "BOOTING_SYSTEM_V2.0...",
                duration: 0.5,
                delay: 2.5
            })
                .to("#landing-preloader-view", {
                    opacity: 0,
                    y: -100,
                    duration: 1,
                    onComplete: () => {
                        gsap.set("#landing-preloader-view", { display: "none" });
                        gsap.set("#scanner-preloader", { display: "flex" });
                    }
                })
                .fromTo(".robo-frame", { opacity: 0 }, { opacity: 1, duration: 0.1, repeat: 7, yoyo: true })
                .to({ val: 0 }, {
                    val: 100,
                    duration: 2.4,              // faster scan (was 3.6)
                    ease: "power2.inOut",
                    onUpdate: function () {
                        const progress = (this as any).targets()[0].val;

                        // Scanner line (unchanged)
                        gsap.set(".robo-frame", { left: `${progress}%` });

                        // Image reveal — BOOSTED
                        const imageProgress = Math.min(progress * 1.35, 100);

                        gsap.set(".scan-window", {
                            clipPath: `inset(0 ${100 - imageProgress}% 0 0)`
                        });
                    }
                })
                .to(".role-text", {
                    opacity: 1,
                    y: -30,
                    duration: 1.2,
                    ease: "power4.out"
                }, "-=0.8")
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 1.5,
                    delay: 0.2,                   // ⬅ faster transition (was 1.2)
                    onComplete: onComplete
                });

        }, containerRef);

        return () => {
            ctx.revert();
            clearInterval(logInterval);
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black overflow-hidden font-['Orbitron']">
            <div id="landing-preloader-view" className="absolute inset-0 z-10 flex flex-col">
                <nav className="absolute top-0 w-full p-10 flex justify-between items-center z-50">
                    <div className="text-white text-xl tracking-[8px] font-black italic">ASTHA_SINGH</div>
                    <div className="preloader-status-indicator text-yellow-400 text-[12px] font-black tracking-[4px]">
                        SYSTEM_IDLE: AWAITING_BOOT_PROTOCOL...
                    </div>
                </nav>

                <div className="flex-1 flex gap-1 bg-black p-4">
                    <div ref={boardRef} className="flex-1 flex flex-col gap-1 perspective-2000"></div>
                    <div className="hidden lg:flex w-64 flex-col justify-end p-8 border-l border-white/10 space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className="text-[11px] text-green-400 font-bold tracking-wider">
                                {`> ${log}`}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div id="scanner-preloader" className="hidden absolute inset-0 bg-black items-center justify-center z-20">
                <div className="relative w-[85vw] h-[75vh]">
                    <div className="relative h-full w-full border border-white/10 overflow-hidden">
                        <div className="robo-frame absolute h-[110%] w-5 top-[-5%] left-0 z-30">
                            <div className="w-[3px] h-full bg-[#FFD700] mx-auto shadow-[0_0_30px_#FFD700]"></div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40px] h-2 bg-[#FFD700]"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40px] h-2 bg-[#FFD700]"></div>
                            <div className="absolute top-1/2 left-8 -translate-y-1/2 whitespace-nowrap text-[12px] text-yellow-400 font-black rotate-90 tracking-widest leading-none">
                                SCAN_CORE_V2.0 // ACTIVE
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black">
                            <div className="text-white text-3xl font-black tracking-[14px] italic">
                                ASTHA&nbsp;SINGH
                            </div>
                        </div>
                        <div className="scan-window absolute inset-0 z-20 overflow-hidden" style={{ clipPath: "inset(0 100% 0 0)" }}>
                            <img src="/assets/backim.png" className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(255,215,0,0.7)]" alt="Internal" />
                        </div>
                        <div className="role-text absolute bottom-[-50px] w-full text-center text-[#FFD700] tracking-[15px] font-black text-lg opacity-0 italic">
                            FRONTEND_DEVELOPER
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
