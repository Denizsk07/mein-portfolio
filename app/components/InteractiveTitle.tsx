'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function InteractiveTitle() {
    return (
        <div className="relative z-20 cursor-default py-12 md:py-24 flex flex-col items-center justify-center">

            {/* Clean, Stable Typography */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
            >
                <h1 className="text-[14vw] leading-[0.8] font-black tracking-tighter text-white text-center select-none mix-blend-normal">
                    DENIZ
                    <br />
                    KAYA
                </h1>
            </motion.div>

            {/* Professional Subheading */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="mt-12 flex flex-col md:flex-row items-center gap-4 md:gap-8"
            >
                <div className="h-[1px] w-12 bg-neon-green hidden md:block" />
                <p className="text-neutral-400 font-mono uppercase text-xs md:text-sm tracking-[0.3em]">
                    Media Designer <span className="text-neon-green mx-2">/</span> Image & Sound
                </p>
                <div className="h-[1px] w-12 bg-neon-green hidden md:block" />
            </motion.div>

        </div>
    );
}
