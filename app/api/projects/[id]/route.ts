import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { connectToDatabase } from '@/app/lib/database';
import Project from '@/app/models/Project';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('Unauthorized access attempt.');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();

  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();  // Get the last part of the URL
  const projectId = Array.isArray(id) ? id[0] : id;

  console.log(`Received request to delete project with ID: ${projectId}`);
  if (!projectId) {
    return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
  }

  try {
    const project = await Project.findById(projectId);
    console.log(`Project found: ${project}`);

    if (!project) {
      console.log('Project not found.');
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    const result = await Project.deleteOne({ _id: projectId });
    console.log(`Deletion result: ${result}`);

    if (result.deletedCount === 0) {
      console.log('Failed to delete project.');
      return NextResponse.json({ message: 'Failed to delete project' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
