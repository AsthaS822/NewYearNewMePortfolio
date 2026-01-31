import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";

interface BackButtonProps {
    onBack: () => void;
    theme?: "light" | "dark";
}

export default function BackButton({ onBack, theme = "dark" }: BackButtonProps) {
    return (
        <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`fixed top-8 left-8 z-[999] group flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md transition-all ${theme === "dark"
                    ? "bg-black/40 border border-purple-500/30 hover:border-purple-500/60 text-white hover:bg-purple-500/10"
                    : "bg-white/40 border border-black/20 hover:border-black/40 text-black hover:bg-white/60"
                }`}
            style={{
                boxShadow:
                    theme === "dark"
                        ? "0 0 20px rgba(168, 85, 247, 0.2)"
                        : "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <IoMdArrowRoundBack className="text-2xl group-hover:-translate-x-1 transition-transform" />
            <span className="font-orbitron text-sm font-bold tracking-wider uppercase">
                Back
            </span>
        </motion.button>
    );
}
