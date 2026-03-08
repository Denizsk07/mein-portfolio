import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/database';
import Project from '../../models/Project';

// GET-Methode
export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '0', 10); // Standardlimit 0 (keine Begrenzung)

    let query = Project.find({}).sort({ createdAt: -1 }); // Sortierung nach Erstellungsdatum
    if (limit > 0) {
      query = query.limit(limit); // Limit anwenden, wenn angegeben
    }

    const projects = await query.exec();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST-Methode
export async function POST(request: NextRequest) {
  const { title, description, image, gallery, preview_video, youtube_link, category, role, client, tools, year } = await request.json();

  // Updated Validation: Require category, title, description. At least ONE media source should ideally exist but isn't strictly enforced.
  if (!title || !description || !category) {
    return NextResponse.json({ error: 'Title, Description, and Category are required.' }, { status: 400 });
  }

  try {
    await connectToDatabase();

    // Clean data: If image/youtube_link is empty string, make it undefined so Mongoose default/optional logic works better
    const projectData = {
      title,
      description,
      preview_video: preview_video || undefined,
      category,
      image: image || undefined,
      gallery: Array.isArray(gallery) ? gallery : [],
      youtube_link: youtube_link || undefined,
      role,
      client,
      tools,
      year
    };

    const newProject = new Project(projectData);
    await newProject.save();
    return NextResponse.json({ message: 'Project created successfully.' });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
  }
}

// DELETE-Methode
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  await connectToDatabase();

  try {
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
