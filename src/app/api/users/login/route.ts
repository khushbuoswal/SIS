import { connectMongoDB } from "@/db-config/db-config";
import User from '@/models/user-model';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectMongoDB();

// POST route to find user in DB
export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { email, password } = requestBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                error: 'User not found.'
            },
                { status: 400 }
            );
        }
        console.log(user);

        // Check password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({
                error: 'Invalid password.'
            },
                { status: 400 }
            );
        }

        // Create the token data using jwt
        const tokenData = {
            id: user._id, // _id object created by MongoDB
            email: user.email,
        }

        // Create token using tokenData
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '2d',
        });

        const response = NextResponse.json({
            message: 'Login Successful',
            success: true,
        });
        response.cookies.set('token', token, { httpOnly:true });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}