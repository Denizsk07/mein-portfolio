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

export const ProjectCard = ({ _id, title, description, previewVideo, image, category }: ProjectCardProps) => {

    return (
        <div className="group relative w-full flex flex-col h-full">
            {/* FOLDER TAB (Visual only) */}
            <div className="w-32 h-8 bg-[#0a0a0a] border-t border-x border-white/20 rounded-t-lg relative z-10 -mb-[1px] ml-4 flex items-center justify-center">
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider group-hover:text-neon-green transition-colors">
                    {category || 'FILE'}
                </span>
            </div>

            {/* FOLDER BODY */}
            <div className="relative rounded-lg rounded-tl-none overflow-hidden bg-[#0a0a0a] border border-white/20 group-hover:border-neon-green transition-all duration-300 shadow-2xl flex-1 flex flex-col">

                {/* Media Player - Clickable */}
                <Link href={`/project/${_id}`} className="block relative w-full aspect-[4/5] bg-black border-b border-white/10 overflow-hidden group/media">
                    {previewVideo ? (
                        <video
                            src={previewVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-105"
                        />
                    ) : image ? (
                        <img 
                            src={image} 
                            alt={title} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-700">No Media Source</div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-black uppercase tracking-widest border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors">
                            View Project
                        </span>
                    </div>
                </Link>

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
