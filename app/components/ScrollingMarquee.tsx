'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
    text: string;
    className?: string;
}

export default function ScrollingMarquee({ text, className = "" }: MarqueeProps) {
    return (
        <div className={`overflow-hidden whitespace-nowrap select-none pointer-events-none ${className}`}>
            <motion.div
                className="inline-block text-[12vw] font-black uppercase text-outline opacity-20"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20,
                }}
            >
                <span className="mr-8">{text}</span>
                <span className="mr-8">{text}</span>
                <span className="mr-8">{text}</span>
                <span className="mr-8">{text}</span>
            </motion.div>
        </div>
    );
}
