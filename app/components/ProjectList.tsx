'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Project = {
    _id: string;
    title: string;
    description: string;
    image: string;
    preview_video?: string;
    youtube_link: string;
    category: string;
    createdAt: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto mb-32 relative">
            {/* Header */}
            <div className="border-b border-white/20 pb-4 mb-4 flex justify-end items-end">
                <h3 className="text-xs font-mono uppercase text-neutral-500 tracking-widest">Category</h3>
            </div>

            {/* List Items */}
            <div className="flex flex-col">
                {projects.map((project, index) => (
                    <Link href={`/project/${project._id}`} key={project._id} passHref>
                        <div
                            onMouseEnter={() => setHoveredId(project._id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="relative border-t border-white/10 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer transition-colors hover:bg-white/5 px-2 md:px-4 gap-4 md:gap-0"
                        >
                            {/* Title (Big) */}
                            <div className="flex-1 w-full">
                                <h4 className="text-4xl md:text-5xl font-black uppercase text-white group-hover:text-neon-green transition-colors leading-none">
                                    {project.title}
                                </h4>
                            </div>

                            {/* Category / Folder */}
                            <div className="text-left md:text-right mt-2 md:mt-0">
                                <span className="text-[10px] md:text-xs border border-white/20 px-2 md:px-3 py-1 rounded-full text-white/50 group-hover:border-neon-green group-hover:text-neon-green transition-colors uppercase tracking-wider bg-white/5">
                                    {project.category}
                                </span>
                            </div>

                            {/* Arrow Hint (Only on Hover) */}
                            <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 md:static text-neon-green">
                                ↗
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
