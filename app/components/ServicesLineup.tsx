'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaWandMagicSparkles, FaVolumeHigh, FaPalette } from 'react-icons/fa6';

const services = [
    {
        id: '01',
        title: 'Video Editing',
        icon: FaVideo,
        description: 'Structuring narratives. I find the perfect flow and pace to turn your footage into a compelling story.'
    },
    {
        id: '02',
        title: 'Motion Graphics',
        icon: FaWandMagicSparkles,
        description: 'Dynamic text animations and visual elements that keep the viewer engaged and enhance your brand.'
    },
    {
        id: '03',
        title: 'Sound Design',
        icon: FaVolumeHigh,
        description: 'Immersive audio experiences. Mixing voice, music, and SFX to drive the emotional impact.'
    },
    {
        id: '04',
        title: 'Color Grading',
        icon: FaPalette,
        description: 'Setting the mood. Professional color correction and stylistic grading for a cohesive, high-end look.'
    }
];

export default function ServicesLineup() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col gap-2">
                {services.map((idx, index) => (
                    <div
                        key={idx.id}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="group relative border-b border-white/10 py-12 cursor-pointer transition-colors"
                    >
                        <div className="flex items-baseline justify-between relative z-10 px-4">
                            <span className="text-xl font-mono text-neon-green opacity-50 group-hover:opacity-100 transition-opacity mr-8">{idx.id}</span>
                            <h3 className="text-4xl md:text-6xl font-black uppercase text-white group-hover:text-neon-green transition-colors flex-1">
                                {idx.title}
                            </h3>
                            <motion.div
                                animate={{ rotate: hoveredIndex === index ? -45 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <idx.icon className="text-3xl text-white group-hover:text-neon-pink" />
                            </motion.div>
                        </div>

                        {/* Hover Content Expansion */}
                        <AnimatePresence>
                            {hoveredIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="pt-4 pl-16 text-xl text-gray-400 max-w-2xl font-mono">
                                        {idx.description}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Background Hover Effect */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                    </div>
                ))}
            </div>
        </div>
    );
}
