import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log("reqBody", reqBody);
        const { email } = reqBody;

        console.log("Email", email);

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Email is not available" }, { status:400})
        }

        // send forgot password email
        await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            message: "Email send successfully",
            success: true
        })
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}