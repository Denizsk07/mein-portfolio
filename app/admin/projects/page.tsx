// components/Projects.js
'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  youtube_link: string;
};

export default function Projects() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/projects')
        .then((res) => res.json())
        .then((data) => setProjects(data));
    }
  }, [status]);

  const handleDelete = async (id: string) => {
    console.log(`Attempting to delete project with ID: ${id}`);
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });
    console.log(`Delete response status: ${res.status}`);
    if (res.ok) {
      setProjects(projects.filter((project) => project._id !== id));
    } else {
      try {
        const errorData = await res.json();
        console.error('Failed to delete project:', errorData);
      } catch (err) {
        console.error('Failed to parse error response:', err);
      }
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Projects</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-white">{project.description}</p>
            {project.image && <img src={project.image} alt={project.title} className="mt-2 rounded-md w-full max-w-xs mx-auto" />}
            {project.youtube_link && 
              <a 
                href={project.youtube_link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-indigo-600 hover:text-indigo-800 mt-2 block"
              >
                Watch on YouTube
              </a>
            }
            <button 
              onClick={() => handleDelete(project._id)}
              className="mt-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
