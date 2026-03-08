'use client';

import { FaLocationDot } from 'react-icons/fa6';
import { SiAdobeaftereffects, SiAdobepremierepro, SiAdobephotoshop } from 'react-icons/si';
import { ExperienceCounter } from './ExperienceCounter';

import { useState } from 'react';

export default function BentoGrid() {
    const [activeTool, setActiveTool] = useState<string | null>(null);
    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-white/20">

                {/* 1. TITLE & BIO */}
                <div className="md:col-span-2 md:row-span-2 border-r border-b border-white/20 p-12 flex flex-col justify-between min-h-[400px] hover:bg-white/5 transition-colors">
                    <div>
                        <h2 className="text-neon-green text-sm font-mono uppercase tracking-widest mb-4">Profile</h2>
                        <h3 className="text-4xl font-bold text-white mb-6">Media Designer <br /><span className="text-neutral-500">Image & Sound</span></h3>
                    </div>
                    <p className="text-neutral-400 leading-relaxed text-lg max-w-md">
                        I focus on the intersection of image and sound. Creating rhythmic visual systems that communicate clear, powerful messages. No fluff, just impact.
                    </p>
                </div>

                {/* 2. PROFILE IMAGE (Tall portrait) */}
                <div className="md:col-span-1 md:row-span-2 border-r border-b border-white/20 relative overflow-hidden group min-h-[300px] md:min-h-full">
                    <div className="absolute inset-0 bg-black z-[-2]" />
                    <img 
                        src="/profile.jpg" 
                        alt="Deniz Kaya - Media Designer"
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                </div>

                {/* 3. STATS */}
                <div className="md:col-span-1 border-r border-b border-white/20 p-8 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors group">
                    <ExperienceCounter />
                    <p className="mt-4 text-xs font-mono uppercase text-neutral-500 group-hover:text-neon-green transition-colors">Professional Experience</p>
                </div>

                {/* 4. LOCATION */}
                <div className="md:col-span-1 border-r border-b border-white/20 p-8 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors relative overflow-hidden group">
                    {/* Hover Image Reveal */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595867865331-405cb670d947?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-500 grayscale" />

                    <FaLocationDot className="text-3xl text-white mb-4 z-10" />
                    <h3 className="text-xl font-bold text-white z-10">Munich</h3>
                    <p className="text-xs font-mono text-neutral-500 uppercase z-10">Base of Operations</p>
                </div>

                {/* 4. SOFTWARE STACK (Dynamic Interactive) */}
                <div className="md:col-span-4 border-r border-b border-white/20 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center hover:bg-white/5 transition-colors">

                    {/* Dynamic Title */}
                    <div className="mb-6 md:mb-0 min-w-[200px]">
                        <h2 className="text-sm font-mono uppercase tracking-widest transition-all duration-300">
                            {activeTool ? (
                                <span className="text-neon-green animate-pulse">{activeTool}</span>
                            ) : (
                                <span className="text-white/50">02 / Arsenal</span>
                            )}
                        </h2>
                    </div>

                    {/* Icons */}
                    <div className="flex gap-8 md:gap-16 items-center flex-wrap justify-center mt-6 md:mt-0">
                        <div
                            className="group cursor-pointer p-2 transition-all duration-300 hover:scale-110"
                            onMouseEnter={() => setActiveTool("After Effects")}
                            onMouseLeave={() => setActiveTool(null)}
                        >
                            <SiAdobeaftereffects className="text-4xl text-neutral-700 group-hover:text-[#00005b] group-hover:drop-shadow-[0_0_15px_rgba(0,0,91,0.8)] transition-all duration-300" />
                        </div>

                        <div
                            className="group cursor-pointer p-2 transition-all duration-300 hover:scale-110"
                            onMouseEnter={() => setActiveTool("Premiere Pro")}
                            onMouseLeave={() => setActiveTool(null)}
                        >
                            <SiAdobepremierepro className="text-4xl text-neutral-700 group-hover:text-[#9999ff] group-hover:drop-shadow-[0_0_15px_rgba(153,153,255,0.8)] transition-all duration-300" />
                        </div>

                        <div
                            className="group cursor-pointer p-2 transition-all duration-300 hover:scale-110"
                            onMouseEnter={() => setActiveTool("Photoshop")}
                            onMouseLeave={() => setActiveTool(null)}
                        >
                            <SiAdobephotoshop className="text-4xl text-neutral-700 group-hover:text-[#31a8ff] group-hover:drop-shadow-[0_0_15px_rgba(49,168,255,0.8)] transition-all duration-300" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
