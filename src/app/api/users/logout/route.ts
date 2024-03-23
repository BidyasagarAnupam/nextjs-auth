import { NextResponse } from "next/server";

export async function GET() {
    try {
        const responce = NextResponse.json({
            message: "Logout Successful",
            success: true
        });

        responce.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        });
        return responce;

    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}