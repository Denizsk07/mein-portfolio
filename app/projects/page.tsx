'use client';

import { useState, useEffect } from 'react';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  youtube_link: string;
  category: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const categorizedProjects = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center text-white mb-12">Projekte</h1>
      {Object.keys(categorizedProjects).map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-6">{category}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorizedProjects[category].map((project) => (
              <li key={project.id} className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl shadow-2xl border border-white/20 transform transition duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-3xl">
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-blue-200 mb-4 leading-relaxed">{project.description}</p>
                {project.image && <img src={project.image} alt={project.title} className="mb-4 rounded-lg w-full max-w-xs mx-auto shadow-lg" />}
                {project.youtube_link && 
                  <a 
                    href={project.youtube_link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-orange-400 hover:text-orange-300 mt-2 block font-medium transition-colors duration-300"
                  >
                    Zum Projekt
                  </a>
                }
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
