import mongoose, { Schema, Document } from 'mongoose';

export interface ProjectDocument extends Document {
  title: string;
  description: string;
  image?: string;
  gallery?: string[];
  preview_video: string;
  youtube_link?: string;
  category: string;
  role?: string;
  client?: string;
  tools?: string;
  year?: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, // Main cover (Video or single photo)
  gallery: { type: [String], default: [] }, // Array for multi-photo galleries
  preview_video: { type: String, required: false }, // Used as MAIN video now
  youtube_link: { type: String, required: false }, // Optional
  category: { type: String, required: true },
  role: { type: String, required: false },
  client: { type: String, required: false },
  tools: { type: String, required: false },
  year: { type: String, required: false },
}, { timestamps: true });

// Explicitly delete the model to force a schema refresh during development hot-reloads
// This ensures that changes to 'required' fields are picked up immediately.
if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

const Project = mongoose.model<ProjectDocument>('Project', projectSchema);

// Force refresh for dev environment validation changes
if (process.env.NODE_ENV === 'development' && mongoose.models.Project) {
  // This is a temporary fix to ensure schema changes apply during hot-reload
  // delete mongoose.models.Project; 
  // Actually, simply re-assigning might not be enough if the object reference is held elsewhere.
  // But usually 'mongoose.models.Project || ...' prevents the update.
}

export default Project;
