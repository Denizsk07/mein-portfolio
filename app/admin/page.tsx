'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Project Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '', // Will be populated by upload
    preview_video: '', // Will be populated by upload
    youtube_link: '',
    category: '',
    role: '',
    client: '',
    tools: '',
    year: ''
  });

  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // New State
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch existing categories on mount
  React.useEffect(() => {
    fetch('/api/projects?limit=0')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const uniqueCats = Array.from(new Set(data.map((p: any) => p.category))) as string[];
          setCategories(uniqueCats);
        }
      })
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  // Secure Login via API
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
      } else {
        alert('Access Denied: Invalid Password');
      }
    } catch (err) {
      console.error('Login Error:', err);
      alert('Login System Error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // GENERIC FILE UPLOADER WITH PROGRESS (Cloudinary)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'preview_video') => {
    if (!e.target.files || e.target.files.length === 0) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary credentials are not configured.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', uploadPreset);

    // Use XMLHttpRequest for progress tracking
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        try {
          const json = JSON.parse(xhr.responseText);
          setFormData(prev => ({ ...prev, [field]: json.secure_url }));
          setStatus(`Uploaded ${field} successfully!`);
        } catch (err) {
          console.error('JSON Parse Error:', err);
          setStatus(`Error parsing server response for ${field}`);
        }
      } else {
        console.error('Upload failed:', xhr.responseText);
        setStatus(`Error uploading ${field}: Server Error`);
      }
      setUploading(false);
    };

    xhr.onerror = () => {
      console.error('Network Error during upload');
      setStatus(`Network Error uploading ${field}`);
      setUploading(false);
    };

    // Cloudinary endpoint (video and image use different resource types implicitly handled by auto or specifying video)
    // using "auto" resource_type allows uploading both images and videos through the same endpoint
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/${field === 'preview_video' ? 'video' : 'image'}/upload`);
    xhr.send(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Success! Project added.');
        setFormData(prev => ({
          title: '',
          description: '',
          image: '',
          preview_video: '',
          youtube_link: '',
          category: prev.category, // Keep category for batch uploads
          role: '',
          client: '',
          tools: '',
          year: ''
        }));
      } else {
        // Try to parse JSON, if fails, read text
        let errorMessage = 'Failed to add project.';
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response:', e);
          errorMessage = `Server Error: ${res.status} ${res.statusText}`;
        }
        setStatus(`Error: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message || 'Network issue (Check Console)'}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 border border-white/20 bg-white/5 rounded-xl">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4">Admin Access</h1>
          <input
            type="password"
            placeholder="Enter Password"
            className="bg-black border border-white/20 p-3 text-white focus:border-neon-green outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="bg-white text-black font-bold uppercase py-3 hover:bg-neon-green transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-24 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/20 pb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">Project Control</h1>
            <p className="text-neutral-400">Upload and manage your portfolio content.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-red-500 hover:text-red-400 uppercase text-sm font-bold tracking-widest">Logout</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* MAIN INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neon-green">Project Title</label>
              <input
                name="title"
                className="bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-neon-green outline-none text-xl font-bold"
                placeholder="ENTER TITLE"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neon-green">Category</label>
              <input
                name="category"
                className="bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-neon-green outline-none h-full"
                placeholder="Select or Create New..."
                value={formData.category}
                onChange={handleChange}
                required
                list="category-suggestions"
              />
              <datalist id="category-suggestions">
                {categories.map((cat, i) => (
                  <option key={i} value={cat} />
                ))}
              </datalist>

              {/* Quick Select Chips - Visible Buttons */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs text-neutral-500 self-center mr-2">Quick Select:</span>
                {categories.length > 0 ? categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className="px-3 py-1 text-xs font-mono uppercase border border-white/20 hover:border-neon-green hover:text-neon-green hover:bg-neon-green/10 transition-colors rounded-full text-neutral-300"
                  >
                    {cat}
                  </button>
                )) : (
                  <span className="text-xs text-neutral-600 italic">No categories yet. Type one above!</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-neon-green">Description</label>
            <textarea
              name="description"
              className="bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-neon-green outline-none min-h-[150px]"
              placeholder="Project description..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* NEW FIELDS FOR CASE STUDY */}
          <div className="grid grid-cols-2 gap-6 border-t border-white/20 pt-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500">Role</label>
              <input
                name="role"
                className="bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-neon-green outline-none"
                placeholder="e.g. Director / Editor"
                value={formData.role || ''}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500">Client</label>
              <input
                name="client"
                className="bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-neon-green outline-none"
                placeholder="e.g. Nike"
                value={formData.client || ''}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500">Tools</label>
              <input
                name="tools"
                className="bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-neon-green outline-none"
                placeholder="e.g. DaVinci, Premiere"
                value={formData.tools || ''}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-neutral-500">Year</label>
              <input
                name="year"
                className="bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-neon-green outline-none"
                placeholder="e.g. 2024"
                value={formData.year || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FILE UPLOAD: VIDEO ONLY */}
          <div className="flex flex-col gap-2 border border-white/10 p-4 rounded bg-white/5 mt-6">
            <label className="text-xs uppercase tracking-widest text-neon-green">Upload Project Video (Required)</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, 'preview_video')}
              className="text-white text-sm file:bg-white file:text-black file:border-0 file:px-4 file:py-2 file:uppercase file:font-bold file:mr-4 hover:file:bg-neon-green cursor-pointer"
            />

            {/* PROGRESS BAR */}
            {uploading && uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-neon-green h-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            {uploading && (
              <p className="text-xs text-neon-green mt-1 font-mono uppercase">
                {uploadProgress < 100 ? `Uploading... ${Math.round(uploadProgress)}%` : 'Processing File...'}
              </p>
            )}

            {formData.preview_video && !uploading && <p className="text-green-500 text-xs">✓ Video uploaded: {formData.preview_video.split('/').pop()}</p>}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="mt-8 bg-white text-black font-black uppercase text-xl py-6 hover:bg-neon-green transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading Files...' : 'Publish Project'}
          </button>

          {status && (
            <p className={`text-center mt-4 ${status.includes('Error') ? 'text-red-500' : 'text-neon-green'}`}>
              {status}
            </p>
          )}

        </form>
      </div>
    </div>
  );
}
