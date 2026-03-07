import { connectToDatabase } from '@/app/lib/database';
import Project from '@/app/models/Project';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MagneticWrapper from '@/app/components/MagneticWrapper';
import Footer from '@/app/components/Footer';
import AtmosphericBackground from '@/app/components/AtmosphericBackground';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

async function getProject(id: string) {
    await connectToDatabase();
    try {
        const project = await Project.findById(id);
        return project;
    } catch (e) {
        return null;
    }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const project = await getProject(params.id);

    if (!project) {
        notFound();
    }


    return (
        <main className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-neon-green selection:text-black">
            <AtmosphericBackground />

            {/* NAVIGATION */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference">
                <MagneticWrapper>
                    <Link href="/" className="text-xl md:text-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:text-neon-green transition-colors">
                        <FaArrowLeft className="text-2xl md:text-3xl" /> Back
                    </Link>
                </MagneticWrapper>
                <div className="text-xs font-mono text-neutral-500 uppercase">Case Study: {String(project._id).slice(-4)}</div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative w-full h-[80vh] flex flex-col justify-end p-4 md:p-12 border-b border-white/10">
                <div className="absolute inset-0 z-[-1]">
                    <video
                        src={project.preview_video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="max-w-7xl w-full mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                        <div>
                            <span className="inline-block px-3 py-1 border border-neon-green text-neon-green text-xs font-mono uppercase tracking-widest mb-6 rounded-full bg-neon-green/10">
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] mb-4">
                                {project.title}
                            </h1>
                        </div>

                        <div className="md:w-1/3 text-sm md:text-base text-gray-300 font-mono leading-relaxed">
                            {project.description}
                        </div>
                    </div>
                </div>
            </section>

            {/* INFO GRID */}
            <section className="py-24 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-mono">Role</h4>
                        <p className="text-xl font-bold">{project.role || 'Director & Editor'}</p>
                    </div>
                    <div>
                        <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-mono">Client</h4>
                        <p className="text-xl font-bold">{project.client || 'Confidential'}</p>
                    </div>
                    <div>
                        <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-mono">Tools</h4>
                        <p className="text-xl font-bold">{project.tools || 'DaVinci Resolve'}</p>
                    </div>
                    <div>
                        <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-mono">Year</h4>
                        <p className="text-xl font-bold">{project.year || new Date(project.createdAt).getFullYear()}</p>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="aspect-video w-full border border-white/20 rounded-2xl overflow-hidden shadow-2xl shadow-neon-green/5 flex items-center justify-center bg-black">
                    <video
                        src={project.preview_video}
                        controls
                        className="w-full h-full object-contain"
                    />
                </div>
            </section>
            <section className="py-32 flex justify-center border-t border-white/20">
                <MagneticWrapper strength={0.4}>
                    <Link href="/" className="inline-flex items-center gap-4 text-4xl font-black uppercase hover:text-neon-green transition-colors">
                        Next Project <FaArrowRight />
                    </Link>
                </MagneticWrapper>
            </section>

            <Footer />
        </main>
    );
}
