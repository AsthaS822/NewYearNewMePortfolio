import { motion } from "framer-motion";

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "education", label: "EDUCATION" },
  { id: "certifications", label: "CERTIFICATIONS" },
];

export default function DimensionNavigator() {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl px-4">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
        className="flex items-center justify-center gap-1 md:gap-2 p-2 md:p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.15)] mx-auto overflow-x-auto custom-scrollbar"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative px-4 py-2 md:px-6 md:py-2 rounded-full group transition-all duration-300 hover:bg-white/5 whitespace-nowrap"
          >
            <span className="text-[10px] md:text-xs font-orbitron font-bold text-white/70 group-hover:text-purple-400 tracking-widest transition-colors">
              {item.label}
            </span>

            {/* Hover bottom glow line */}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-purple-500 group-hover:w-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 blur-[1px]" />

            {/* Background glow */}
            <span className="absolute inset-0 rounded-full bg-purple-500/0 group-hover:bg-purple-500/5 blur-md transition-all" />
          </button>
        ))}
      </motion.div>
    </div>
  );
}
