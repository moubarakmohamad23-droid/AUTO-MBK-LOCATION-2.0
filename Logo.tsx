import { motion, AnimatePresence } from 'motion/react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center p-4 ${className}`}>
      {/* Artistic Ovals surrounding everything */}
      <motion.div 
        className="absolute inset-0 border-2 border-green-500/30 rounded-[100%] rotate-12"
        animate={{ rotate: [12, 15, 12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute inset-0 border-2 border-green-400/20 rounded-[100%] -rotate-6"
        animate={{ rotate: [-6, -9, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div 
        className="absolute inset-2 border border-green-500/10 rounded-[100%] rotate-45"
        animate={{ rotate: [45, 40, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-center gap-4 z-10">
        {/* Car Icon */}
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-12 h-12"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path d="M16 10l3-6" className="origin-bottom-left" />
          </svg>
        </div>
        
        {/* Falling Animated Text */}
        <div className="flex flex-col">
          <motion.span 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 120,
              damping: 12,
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none"
          >
            AUTO MBK
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-[10px] font-bold text-green-500 tracking-[0.2em] uppercase mt-1"
          >
            Location / Vente
          </motion.span>
        </div>
      </div>
    </div>
  );
}
