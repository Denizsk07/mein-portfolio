'use client';

import { useState } from "react";

export const ExperienceCounter = () => {
    const displayValue = 3; // Static value for stability

    return (
        <div className="relative z-10">
            <h3 className="text-7xl font-black mb-2 tracking-tighter flex justify-center items-center text-white">
                {displayValue}
                <span className="text-4xl text-neutral-500 ml-1">+</span>
            </h3>
            <p className="font-bold uppercase tracking-widest text-sm text-neutral-500">Years Experience</p>

            {/* Visual Waveform */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 20" className="w-full h-full text-black">
                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M0 10 Q 25 20, 50 10 T 100 10" />
                </svg>
            </div>
        </div>
    );
};
