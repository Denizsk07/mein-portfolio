'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProjectCard } from './ProjectCard';
import ProjectList from './ProjectList';
import { motion } from 'framer-motion';

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



export default function HomeProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All Funds');
  const [activeMediaType, setActiveMediaType] = useState<'video' | 'photo'>('video');

  useEffect(() => {
    fetch('/api/projects?limit=0') // Fetch all
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedProjects = data.sort((a: Project, b: Project) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setProjects(sortedProjects);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      });
  }, []);

  const videoProjects = projects.filter(p => p.preview_video);
  const photoProjects = projects.filter(p => !p.preview_video && p.image);

  // Filter based on active toggle
  const mediaFilteredProjects = activeMediaType === 'video' ? videoProjects : photoProjects;

  const categories = ['All Funds', ...Array.from(new Set(mediaFilteredProjects.map(p => p.category)))];
  
  const filteredProjects = activeCategory === 'All Funds'
    ? mediaFilteredProjects
    : mediaFilteredProjects.filter(p => p.category === activeCategory);

  return (
    <section className="py-32 relative z-10 min-h-screen" id="projects">
      <div className="container mx-auto px-4">

        {/* SECTION HEADER - TECH AESTHETIC */}
        <div className="mb-32 pl-4 border-l-2 border-neon-green flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-neon-green font-mono text-sm tracking-widest mb-2"
            >
                // ORG_UNIT: 03_PROJECTS
            </motion.p>
            <h3 className="text-5xl md:text-8xl font-black uppercase text-white tracking-tight">Last<br />Projects</h3>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Database Status: Online</p>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Entries: {projects.length}</p>
          </div>
        </div>

        {loading ? (
          // SKELETON LOADER (Feel faster than spinner)
          <div className="space-y-4 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full h-24 border-t border-white/10 bg-white/5" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {/* 1. LIST VIEW (TOP 5 RECENT VIDEOS ONLY) */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
              <ProjectList projects={projects.filter(p => p.preview_video).slice(0, 5)} />
            </motion.div>

            {/* 2. DIRECTORY VIEW (ALL PROJECTS With Folders) */}
            <div className="mt-48">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <p className="text-neon-green font-mono text-sm tracking-widest mb-2">// DIRECTORY_ROOT</p>
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <h4 className="text-4xl md:text-5xl font-black uppercase text-white">All Projects</h4>
                    
                    {/* ANIMATED TOGGLE */}
                    <div className="relative flex items-center bg-black border border-white/20 rounded-full p-1.5 w-fit">
                        {/* Active Background Pill */}
                        <motion.div 
                            className="absolute bg-neon-green rounded-full shadow-[0_0_15px_rgba(204,255,0,0.3)] h-[80%] top-[10%]"
                            initial={false}
                            animate={{ 
                                left: activeMediaType === 'video' ? '6px' : '50%', 
                                width: 'calc(50% - 6px)' 
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                        
                        <button 
                            onClick={() => { setActiveMediaType('video'); setActiveCategory('All Funds'); }}
                            className={`relative px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-colors z-10 ${activeMediaType === 'video' ? 'text-black' : 'text-neutral-500 hover:text-white'}`}
                        >
                            Videos
                        </button>
                        <button 
                            onClick={() => { setActiveMediaType('photo'); setActiveCategory('All Funds'); }}
                            className={`relative px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-colors z-10 ${activeMediaType === 'photo' ? 'text-black' : 'text-neutral-500 hover:text-white'}`}
                        >
                            Photography
                        </button>
                    </div>
                  </div>
                </div>

                {/* FOLDER TABS - SCROLLABLE ON MOBILE */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`
                                    px-6 py-3 border-t-2 border-x-2 rounded-t-xl font-mono text-xs uppercase tracking-widest transition-all whitespace-nowrap
                                    ${activeCategory === cat
                          ? 'border-neon-green bg-neon-green/10 text-white'
                          : 'border-white/20 text-neutral-500 hover:text-white hover:border-white/50 bg-black'
                        }
                                `}
                    >
                      📁 {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* FOLDER CONTAINER - Look like a file cabinet content area */}
              <div className="border-t-2 border-neon-green relative p-8 md:p-12 bg-white/5 min-h-[500px] rounded-b-3xl">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-neon-green shadow-[0_0_20px_#ccff00]" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      key={project._id}
                      className="w-full flex"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard
                        _id={project._id}
                        title={project.title}
                        description={project.description}
                        previewVideo={project.preview_video}
                        image={project.image}
                        category={project.category}
                      />
                    </motion.div>
                  ))}
                  {filteredProjects.length === 0 && (
                    <p className="text-neutral-600 font-mono text-center w-full py-20 col-span-3">Directory Empty.</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
