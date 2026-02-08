'use client';

import React from 'react';

export default function AtmosphericBackground() {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#030303] pointer-events-none overflow-hidden">

            {/* 1. Deep Atmospheric Glow (Static gradient, no animation) */}
            <div
                className="absolute top-0 left-0 w-full h-full opacity-20"
                style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05), transparent 70%)',
                }}
            />

            {/* 2. Defined Tech Grid (Static) */}
            <div
                className="absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px), 
                        linear-gradient(90deg, rgba(255, 255, 255, 0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px', // Slightly larger grid
                    maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
                }}
            />

            {/* 3. Static Light Accent */}
            <div
                className="absolute top-0 right-0 w-[50%] h-[50%] opacity-10"
                style={{
                    background: 'radial-gradient(circle at 100% 0%, rgba(204, 255, 0, 0.1), transparent 70%)',
                }}
            />

            {/* 4. Film Grain (Static Image) */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
            />
        </div>
    );
}
