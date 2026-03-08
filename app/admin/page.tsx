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
    gallery: [] as string[], // NEW: Array for multiple photos
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
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryProgress, setGalleryProgress] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Manage Projects State
  const [projects, setProjects] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch existing categories and projects on mount
  React.useEffect(() => {
    fetch('/api/projects?limit=0')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const uniqueCats = Array.from(new Set(data.map((p: any) => p.category))) as string[];
          setCategories(uniqueCats);
          setProjects(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        }
      })
      .catch(err => console.error('Failed to fetch data:', err));
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

  // MULTIPLE FILE UPLOADER FOR GALLERY
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert("Cloudinary credentials are not configured.");
      return;
    }

    setGalleryUploading(true);
    setGalleryProgress(0); // Optional: simplified progress for bulk
    setStatus(`Uploading ${e.target.files.length} gallery images...`);

    const files = Array.from(e.target.files);
    const uploadPromises = files.map(async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: data,
        });

        if (!res.ok) throw new Error('Failed to upload an image');
        const json = await res.json();
        return json.secure_url;
    });

    try {
        const uploadedUrls = await Promise.all(uploadPromises);
        setFormData(prev => ({
            ...prev,
            gallery: [...prev.gallery, ...uploadedUrls] // Append to existing
        }));
        setStatus(`Successfully uploaded ${uploadedUrls.length} gallery images!`);
    } catch (err) {
        console.error('Gallery Upload Error:', err);
        setStatus('Error uploading gallery images.');
    } finally {
        setGalleryUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const savedProject = await res.json();
        setStatus(editingId ? 'Success! Project updated.' : 'Success! Project added.');
        
        if (editingId) {
            setProjects(prev => prev.map(p => p._id === editingId ? savedProject : p));
        } else {
            setProjects(prev => [savedProject, ...prev]);
            // Extract categories dynamically
            if(!categories.includes(savedProject.category)) {
                setCategories([...categories, savedProject.category]);
            }
        }

        if(!editingId) {
            setFormData(prev => ({
            title: '', description: '', image: '', gallery: [], preview_video: '', youtube_link: '', category: prev.category, role: '', client: '', tools: '', year: ''
            }));
        }
        
      } else {
        let errorMessage = 'Failed to process project.';
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Server Error: ${res.status}`;
        }
        setStatus(`Error: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: Network issue`);
    }
  };

  const handleEditClick = (project: any) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      gallery: project.gallery || [],
      preview_video: project.preview_video || '',
      youtube_link: project.youtube_link || '',
      category: project.category || '',
      role: project.role || '',
      client: project.client || '',
      tools: project.tools || '',
      year: project.year || ''
    });
    setActiveTab('create');
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p._id !== id));
        alert('Project deleted.');
      } else {
        alert('Failed to delete project.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while deleting.');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '', description: '', image: '', gallery: [], preview_video: '', youtube_link: '', category: '', role: '', client: '', tools: '', year: ''
    });
    setStatus(null);
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

        {/* TABS */}
        <div className="flex gap-4 mb-12 border-b border-white/10 pb-4">
            <button 
                onClick={() => setActiveTab('create')}
                className={`uppercase tracking-widest font-bold text-sm px-4 py-2 ${activeTab === 'create' ? 'text-neon-green border-b-2 border-neon-green' : 'text-neutral-500 hover:text-white'}`}
            >
                {editingId ? 'Edit Project' : 'Add New Project'}
            </button>
            <button 
                onClick={() => { setActiveTab('manage'); cancelEdit(); }}
                className={`uppercase tracking-widest font-bold text-sm px-4 py-2 ${activeTab === 'manage' ? 'text-neon-green border-b-2 border-neon-green' : 'text-neutral-500 hover:text-white'}`}
            >
                Manage Projects ({projects.length})
            </button>
        </div>


        {activeTab === 'create' ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {editingId && (
                <div className="bg-neon-green/10 border border-neon-green p-4 rounded flex justify-between items-center mb-4">
                    <p className="text-neon-green font-mono text-sm capitalize">Editing Project: <b>{formData.title}</b></p>
                    <button type="button" onClick={cancelEdit} className="text-white hover:text-red-500 text-xs font-bold uppercase tracking-widest border border-white/20 px-3 py-1 bg-black">Cancel Edit</button>
                </div>
            )}

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
              <div className="relative h-full flex flex-col justify-center">
                <input
                  name="category"
                  className="bg-neutral-900 border border-neutral-800 p-4 w-full text-white focus:border-neon-green outline-none h-full pr-12 appearance-none"
                  placeholder="Select or Create New..."
                  value={formData.category}
                  onChange={handleChange}
                  onFocus={() => setShowCategoryDropdown(true)}
                  onBlur={() => setShowCategoryDropdown(false)}
                  required
                  autoComplete="off"
                />
                <div 
                  className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center cursor-pointer text-white/50 hover:text-white"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setTimeout(() => document.getElementsByName('category')[0]?.focus(), 0);
                  }}
                >
                  ▼
                </div>

                {showCategoryDropdown && categories.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 z-50 mt-1 bg-neutral-900 border border-neon-green max-h-48 overflow-y-auto rounded-b shadow-2xl">
                    {categories.filter(c => c).map((cat, i) => (
                      <li 
                        key={i} 
                        className="p-3 hover:bg-neon-green hover:text-black transition-colors cursor-pointer text-white border-b border-white/5 last:border-0 truncate"
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevent input onBlur from firing
                          setFormData({ ...formData, category: cat });
                          setShowCategoryDropdown(false);
                        }}
                      >
                        {cat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

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
              <label className="text-xs uppercase tracking-widest text-neutral-500">Date/Year</label>
              <input
                name="year"
                className="bg-neutral-900 border border-neutral-800 p-4 text-white focus:border-neon-green outline-none"
                placeholder="e.g. 05.02.2025"
                value={formData.year || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* FILE UPLOAD: VIDEO AND IMAGE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="flex flex-col gap-2 border border-white/10 p-4 rounded bg-white/5">
                <label className="text-xs uppercase tracking-widest text-neon-green">
                    {editingId && formData.preview_video ? 'Replace Project Video (Optional)' : 'Upload Project Video (Optional)'}
                </label>
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

                {formData.preview_video && !uploading && (
                    <div className="mt-2 text-xs">
                        <p className="text-green-500">✓ Video attached</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 border border-white/10 p-4 rounded bg-white/5">
                <label className="text-xs uppercase tracking-widest text-neon-green">
                    {editingId && formData.image ? 'Replace Project Photo (Optional)' : 'Upload Project Photo (Optional)'}
                </label>
                <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'image')}
                className="text-white text-sm file:bg-white file:text-black file:border-0 file:px-4 file:py-2 file:uppercase file:font-bold file:mr-4 hover:file:bg-neon-green cursor-pointer"
                />

                {formData.image && !uploading && (
                    <div className="mt-2 text-xs">
                        <p className="text-green-500">✓ Cover Photo attached</p>
                    </div>
                )}
            </div>
          </div>

          {/* NEW: MULTIPLE GALLERY UPLOAD */}
          <div className="flex flex-col gap-2 border border-white/10 p-4 rounded bg-white/5 mt-6">
              <label className="text-xs uppercase tracking-widest text-neon-green">
                  Upload Gallery Photos (Multiple)
              </label>
              <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="text-white text-sm file:bg-white file:text-black file:border-0 file:px-4 file:py-2 file:uppercase file:font-bold file:mr-4 hover:file:bg-neon-green cursor-pointer"
              />

              {galleryUploading && (
                  <p className="text-xs text-neon-green mt-2 font-mono uppercase animate-pulse">
                      Uploading Gallery Images...
                  </p>
              )}

              {formData.gallery && formData.gallery.length > 0 && (
                  <div className="mt-4">
                      <p className="text-xs text-green-500 mb-2">✓ {formData.gallery.length} Gallery Photos Attached</p>
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                          {formData.gallery.map((url, i) => (
                              <div key={i} className="relative aspect-square bg-black border border-white/20 rounded overflow-hidden group">
                                  <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover opacity-80" />
                                  {/* Button to remove single image */}
                                  <button
                                      type="button"
                                      onClick={() => setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, index) => index !== i) }))}
                                      className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    ×
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`mt-8 text-black font-black uppercase text-xl py-6 transition-colors disabled:opacity-50 ${editingId ? 'bg-neon-green hover:bg-white' : 'bg-white hover:bg-neon-green'}`}
          >
            {uploading ? 'Uploading Files...' : (editingId ? 'Update Master Record' : 'Publish Project')}
          </button>

          {status && (
            <p className={`text-center mt-4 font-mono text-sm tracking-widest uppercase ${status.includes('Error') ? 'text-red-500' : 'text-neon-green'}`}>
              {status}
            </p>
          )}

        </form>
        ) : (
            <div className="flex flex-col gap-4">
                {projects.length === 0 ? (
                    <p className="text-neutral-500 font-mono italic">No projects found in database.</p>
                ) : (
                    projects.map(project => (
                        <div key={project._id} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded flex flex-col md:flex-row justify-between items-start md:items-center hover:border-white/30 transition-colors">
                            <div className="mb-4 md:mb-0">
                                {project.category ? (
                                    <span className="text-[10px] uppercase font-mono text-neon-green border border-neon-green/30 px-2 py-1 rounded inline-block mb-2">{project.category}</span>
                                ) : (
                                    <span className="text-[10px] uppercase font-mono text-neutral-500 border border-neutral-700 px-2 py-1 rounded inline-block mb-2">Uncategorized</span>
                                )}
                                <h3 className="text-2xl font-black uppercase tracking-tight">{project.title || 'Untitled Project'}</h3>
                                <p className="text-neutral-500 text-xs font-mono mt-1">
                                    Added: {project.createdAt ? new Date(project.createdAt).toLocaleDateString('de-DE') : 'Unknown Date'}
                                </p>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <button 
                                    onClick={() => handleEditClick(project)}
                                    className="flex-1 md:flex-none px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black uppercase text-xs font-bold tracking-widest transition-colors"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(project._id, project.title)}
                                    className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white uppercase text-xs font-bold tracking-widest transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}
      </div>
    </div>
  );
}
