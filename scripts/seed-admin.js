const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined');
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);

    const email = 'admin@example.com';
    const password = 'admin'; // Keeping it simple for the user

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('Admin user already exists');
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        email,
        password: hashedPassword,
        role: 'admin'
    });

    console.log(`Admin user created: ${email} / ${password}`);
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
