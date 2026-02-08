import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/database';
import Category from '@/app/models/Category';

export async function GET() {
  await connectToDatabase();

  try {
    const categories = await Category.find({}, { name: 1 });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { category } = await request.json();

  if (!category) {
    return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const newCategory = new Category({ name: category });
    await newCategory.save();
    return NextResponse.json({ message: 'Category created successfully.' });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
