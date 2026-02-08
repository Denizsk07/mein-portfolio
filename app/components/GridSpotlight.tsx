'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";

export const GridSpotlight = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        setMousePosition({ x: clientX, y: clientY });
    };

    return (
        <div
            className="fixed inset-0 z-0 w-full h-full pointer-events-none"
            onMouseMove={handleMouseMove}
        >
            {/* Base Grid */}
            <div
                className="absolute inset-0 z-0 bg-transparent bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"
            />

            {/* Spotlight Mask - High Visibility */}
            <motion.div
                className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#ccff00_1px,transparent_1px),linear-gradient(to_bottom,#ccff00_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 mix-blend-normal"
                style={{
                    maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                    WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
                }}
                animate={{
                    maskPosition: `${mousePosition.x - 175}px ${mousePosition.y - 175}px`
                }}
                transition={{ type: "tween", ease: "backOut" }}
            />
        </div>
    );
};
