import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest) { 
    try {

        const reqBody = await request.json();
        const { token, password } = reqBody;

        console.log("token, password", token, password);
        //check if user exists or not
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 })
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword

        await user.save()

        return NextResponse.json({
            message: "Password change successfully",
            success: true
        })
        
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}