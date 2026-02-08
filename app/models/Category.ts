// models/Category.js
import mongoose, { Schema, Document } from 'mongoose';

export interface CategoryDocument extends Document {
  name: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Category = mongoose.models.Category || mongoose.model<CategoryDocument>('Category', categorySchema);

export default Category;
