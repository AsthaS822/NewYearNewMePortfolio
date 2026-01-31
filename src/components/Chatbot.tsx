"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Terminal } from "lucide-react";
import { createPortal } from "react-dom";

const Chatbot = () => {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [messages, isOpen]);

    if (!mounted) return null;

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const history = messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage, history })
            });

            const data = await res.json();
            if (data.error) {
                setMessages(prev => [...prev, {
                    role: 'model',
                    content: `System Alert: ${data.error}. ${data.details || ""}`
                }]);
                return;
            }

            setMessages(prev => [...prev, { role: 'model', content: data.text }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', content: "Connection severed. verifying local protocols..." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const chatbotContent = (
        <div id="chatbot-portal-root">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-8 right-8 z-[9999]"
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="relative w-16 h-16 bg-black rounded-full shadow-[0_0_30px_rgba(123,63,242,0.4)] flex items-center justify-center border-2 border-[#7B3FF2] group"
                >
                    <Bot size={28} className="text-white group-hover:text-[#7B3FF2] transition-colors duration-300" />
                    <div className="absolute -top-1 right-0 w-4 h-4 bg-[#7B3FF2] rounded-full animate-pulse border-2 border-black" />
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-8 w-[calc(100vw-48px)] max-w-[440px] h-[400px] bg-[#0a0a0a] border border-[#7B3FF2]/30 rounded-[30px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col z-[10000] overflow-hidden backdrop-blur-3xl"
                    >
                        {/* Title Bar / Header */}
                        <div className="p-5 border-b border-[#7B3FF2]/20 bg-black/50 backdrop-blur-md flex items-center justify-between z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#7B3FF2]/10 border border-[#7B3FF2]/30 flex items-center justify-center text-[#7B3FF2]">
                                    <Terminal size={18} />
                                </div>
                                <div>
                                    <h3 className="font-['Orbitron'] text-xs tracking-[2px] text-white font-bold">DOSSIER OS</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#7B3FF2] animate-pulse"></span>
                                        <p className="font-['Inter'] text-[9px] text-white/50 tracking-wider">SYSTEM ACTIVE</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-[url('/assets/grid.svg')] bg-opacity-5"
                        >
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6 opacity-60">
                                    <div className="w-20 h-20 rounded-full border border-[#7B3FF2]/20 flex items-center justify-center relative">
                                        <Bot size={32} className="text-white/20" />
                                        <div className="absolute inset-0 border-t border-[#7B3FF2] rounded-full animate-spin [animation-duration:3s]" />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="font-['Orbitron'] text-sm tracking-[4px] text-white font-bold">INITIALIZED</h2>
                                        <p className="font-['Inter'] text-xs text-white/40 max-w-[200px] mx-auto leading-relaxed">
                                            Accessing secure archives for Subject: Astha Singh.
                                        </p>
                                    </div>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] px-5 py-3 rounded-2xl font-['Inter'] text-[13px] leading-relaxed backdrop-blur-sm border ${msg.role === 'user'
                                        ? 'bg-[#7B3FF2] text-white border-[#7B3FF2] rounded-tr-sm shadow-[0_4px_20px_rgba(123,63,242,0.3)]'
                                        : 'bg-white/5 text-white/90 border-white/10 rounded-tl-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/10 flex gap-1.5">
                                        <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" />
                                        <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                                        <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black border-t border-[#7B3FF2]/20">
                            <div className="relative flex items-center group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Enter command..."
                                    className="w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-white text-[13px] placeholder:text-white/20 focus:outline-none focus:border-[#7B3FF2]/50 focus:bg-[#161616] font-['Inter'] pr-14 transition-all"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 p-2.5 bg-[#7B3FF2] text-white rounded-lg hover:bg-[#6a35d4] transition-colors shadow-lg"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                            <div className="flex justify-center mt-3 gap-4 opacity-30">
                                <div className="h-0.5 w-8 bg-[#7B3FF2] rounded-full" />
                                <div className="h-0.5 w-8 bg-white rounded-full" />
                                <div className="h-0.5 w-8 bg-[#7B3FF2] rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return createPortal(chatbotContent, document.body);
};

export default Chatbot;
