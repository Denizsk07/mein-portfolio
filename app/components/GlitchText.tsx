'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GlitchText({ text }: { text: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative inline-block cursor-default group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10">{text}</span>

            {/* Glitch Layer 1 - Cyan */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-0 group-hover:opacity-100"
                animate={isHovered ? {
                    x: [-2, 2, -1, 0],
                    y: [1, -1, 0],
                    opacity: [0.8, 0],
                } : {}}
                transition={{
                    repeat: Infinity,
                    duration: 0.2,
                    repeatType: "reverse"
                }}
            >
                {text}
            </motion.span>

            {/* Glitch Layer 2 - Red */}
            <motion.span
                className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-100"
                animate={isHovered ? {
                    x: [2, -2, 1, 0],
                    y: [-1, 1, 0],
                    opacity: [0.8, 0],
                } : {}}
                transition={{
                    repeat: Infinity,
                    duration: 0.3,
                    repeatType: "reverse"
                }}
            >
                {text}
            </motion.span>
        </div>
    );
}
