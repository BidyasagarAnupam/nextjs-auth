import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import { sendEmail } from '@/helpers/mailer';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(username, email, password);
        //check if user already exists
        const user = await User.findOne({ email })

        console.log("User", user);
        if (user) {
            return NextResponse.json({ message: "User already exist" }, { status: 400 })
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        console.log("Hash password", hashedPassword);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })


        const savedUser = await newUser.save()
        console.log("savedUser", savedUser);

        //send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User created successfully",
            savedUser,
            success: true
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}