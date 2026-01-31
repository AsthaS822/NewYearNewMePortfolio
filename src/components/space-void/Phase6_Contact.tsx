import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
const astronautVideo = "/space/astronautlooking-Ci82unKl.mp4";

export default function Phase6_Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus("sending");

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
            formRef.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
        )
            .then(() => {
                setStatus("success");
                formRef.current?.reset();
                setTimeout(() => setStatus("idle"), 5000);
            })
            .catch((err) => {
                console.error(err);
                setStatus("error");
                setTimeout(() => setStatus("idle"), 5000);
            });
    };

    return (
        <section className="relative min-h-screen bg-black flex items-center justify-center py-20 px-6 overflow-hidden">

            {/* GRADIENT FLOOR BACKGROUND */}
            <div className="absolute inset-0 bg-black z-0">
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-zinc-800/20 via-black to-black" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
            </div>

            {/* ASTRONAUT SILHOUETTE STRATEGY */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[60vh] z-10 pointer-events-none opacity-80">
                <video
                    src={astronautVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] grayscale brightness-125"
                    style={{
                        maskImage: "linear-gradient(to top, transparent 5%, black 40%)",
                        WebkitMaskImage: "linear-gradient(to top, transparent 5%, black 40%)"
                    }}
                />

                {/* RIM LIGHTING / GLOW */}
                <div className="absolute inset-0 rounded-full bg-white/5 blur-[100px] opacity-20" />

                {/* GLITCH RIPPLES AT FEET */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-10 bg-white/10 blur-xl rounded-full"
                />
            </div>

            <div className="relative z-20 w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-zinc-950/80 backdrop-blur-3xl border border-purple-500/30 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden group"
                    style={{
                        boxShadow: '0 0 40px rgba(168, 85, 247, 0.15), inset 0 0 20px rgba(168, 85, 247, 0.05)',
                    }}
                >
                    {/* NEON BORDER GLOW ACCENTS */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

                    <div className="text-center mb-12 relative">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-orbitron font-black text-white mb-4 tracking-tighter italic uppercase relative z-10"
                        >
                            VOYAGE <span className="text-purple-500" style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.4)' }}>RESUMED</span>
                        </motion.h2>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-purple-400/60 font-mono text-[10px] md:text-sm tracking-[0.4em] uppercase"
                        >
                            PREPARING FOR NEW TOUR // ESTABLISHING LINK
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                        {/* Contact Form */}
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-orbitron text-purple-400 tracking-widest uppercase">Target Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    placeholder="Enter identifier..."
                                    className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl p-4 text-white focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] outline-none transition-all font-mono placeholder:text-purple-300/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-orbitron text-purple-400 tracking-widest uppercase">Frequency Header</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    placeholder="your@signal.com"
                                    className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl p-4 text-white focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] outline-none transition-all font-mono placeholder:text-purple-300/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-orbitron text-purple-400 tracking-widest uppercase">Transmission Data</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="Write your message..."
                                    className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl p-4 text-white focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] outline-none transition-all font-mono resize-none placeholder:text-purple-300/20"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className={`w-full group relative overflow-hidden py-4 rounded-xl flex items-center justify-center gap-2 font-orbitron text-white tracking-widest transition-all font-bold 
                                    ${status === "success" ? "bg-green-600 shadow-[0_0_20px_rgba(22,163,74,0.4)]" :
                                        status === "error" ? "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]" :
                                            "bg-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]"}
                                `}
                            >
                                {status === "idle" && (
                                    <>
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        INITIATE TRANSMISSION
                                    </>
                                )}
                                {status === "sending" && <span>UPLINKING...</span>}
                                {status === "success" && (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        SIGNAL RECEIVED
                                    </>
                                )}
                                {status === "error" && (
                                    <>
                                        <AlertCircle className="w-4 h-4" />
                                        LINK FAILED
                                    </>
                                )}
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            </button>
                        </form>

                        {/* Social Links */}
                        <div className="flex flex-col justify-between py-2">
                            <div className="space-y-8">
                                <a href="mailto:singhhhaaastha@gmail.com" className="flex items-center gap-6 group">
                                    <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-full group-hover:bg-purple-500/30 group-hover:border-purple-500/50 transition-all shadow-xl">
                                        <Mail className="w-6 h-6 text-white group-hover:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-orbitron text-purple-400/40 uppercase tracking-widest">Email Signal</p>
                                        <p className="text-white font-mono group-hover:text-purple-400 text-sm">singhhhaaastha@gmail.com</p>
                                    </div>
                                </a>
                                <a href="https://linkedin.com/in/astha-singh-a6128a228" className="flex items-center gap-6 group">
                                    <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-full group-hover:bg-purple-500/30 group-hover:border-purple-500/50 transition-all shadow-xl">
                                        <Linkedin className="w-6 h-6 text-white group-hover:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-orbitron text-purple-400/40 uppercase tracking-widest">LinkedIn Uplink</p>
                                        <p className="text-white font-mono group-hover:text-purple-400 text-sm">astha-singh-a6128a228</p>
                                    </div>
                                </a>
                                <a href="https://github.com/AsthaS822" className="flex items-center gap-6 group">
                                    <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-full group-hover:bg-purple-500/30 group-hover:border-purple-500/50 transition-all shadow-xl">
                                        <Github className="w-6 h-6 text-white group-hover:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-orbitron text-purple-400/40 uppercase tracking-widest">GitHub Archive</p>
                                        <p className="text-white font-mono group-hover:text-purple-400 text-sm">github.com/AsthaS822</p>
                                    </div>
                                </a>
                                <div className="space-y-4 pt-4 border-t border-purple-500/10">
                                    <p className="text-[10px] font-orbitron text-purple-500 uppercase tracking-[0.3em]">Credentials</p>
                                    <div className="flex flex-col gap-2">
                                        <a href="https://www.guvi.in/share-certificate/d62a7g7971j7i688JM" className="text-white/60 hover:text-purple-400 font-mono text-[10px] uppercase truncate">• GUVI Certificate</a>
                                        <a href="https://app.wilco.gg/certificate/6963b164c47bde1d8a58dfb6" className="text-white/60 hover:text-purple-400 font-mono text-[10px] uppercase truncate">• Wilco Credential</a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 p-4 bg-purple-950/20 border border-purple-500/20 rounded-xl space-y-1 text-[10px] font-mono text-white/40 tracking-tighter uppercase leading-relaxed">
                                <div className="flex justify-between"><span>STATUS</span><span className="text-purple-400">READY_TO_COLLABORATE</span></div>
                                <div className="flex justify-between"><span>LATENCY</span><span className="text-purple-400">MINIMAL</span></div>
                                <div className="flex justify-between"><span>ENCRYPT</span><span className="text-purple-400">END_TO_END</span></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
