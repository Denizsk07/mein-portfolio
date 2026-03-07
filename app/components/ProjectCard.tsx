'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type ProjectCardProps = {
    _id?: string;
    title: string;
    description: string;
    image?: string; // Optional now
    previewVideo?: string;
    youtubeLink?: string;
    category?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isDimmed?: boolean;
};

export const ProjectCard = ({ title, description, previewVideo, category }: ProjectCardProps) => {

    return (
        <div className="group relative flex flex-col h-full">
            {/* FOLDER TAB (Visual only) */}
            <div className="w-32 h-8 bg-[#0a0a0a] border-t border-x border-white/20 rounded-t-lg relative z-10 -mb-[1px] ml-4 flex items-center justify-center">
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider group-hover:text-neon-green transition-colors">
                    {category || 'FILE'}
                </span>
            </div>

            {/* FOLDER BODY */}
            <div className="relative rounded-lg rounded-tl-none overflow-hidden bg-[#0a0a0a] border border-white/20 group-hover:border-neon-green transition-all duration-300 shadow-2xl flex-1 flex flex-col">

                {/* Video Player */}
                <div className="relative aspect-video w-full bg-black border-b border-white/10">
                    {previewVideo ? (
                        <video
                            src={previewVideo}
                            controls
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-700">No Video Source</div>
                    )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-black uppercase text-white group-hover:text-neon-green transition-colors leading-tight">
                            {title}
                        </h3>
                        <div className="text-[10px] text-neutral-600 border border-neutral-800 px-2 py-1 rounded font-mono">
                            ID: {Math.floor(Math.random() * 9000) + 1000}
                        </div>
                    </div>
                    <p className="text-neutral-500 text-sm font-mono leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};
