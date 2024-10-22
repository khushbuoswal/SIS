import { connectMongoDB } from "@/db-config/db-config";
import User from '@/models/user-model';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';

connectMongoDB();

// POST route to create new user in DB
export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { firstName, lastName, email, password } = requestBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({
                error: 'This user already exists.'
            },
                { status: 400 }
            );
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Save the new user in DB
        const savedUser = await newUser.save();

        return NextResponse.json({
            message:'User created successfully.',
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
