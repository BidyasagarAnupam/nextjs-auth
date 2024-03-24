"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Forgotpassword() {
    const router = useRouter();

    const [email, setEmail] = useState("")

    const onReset = async () => {
        const toastId = toast.loading("loading...")
        try {
            if (!(email.length > 0)) {
                toast.error("Please enter your email address");
                return
            }
            console.log("email", email);
            const response = await axios.post('/api/users/forgotpassword', { email })

            console.log("email sent successful", response.data);
            toast.success(response.data.message)
            router.push('/message')

        } catch (error: any) {
            console.log("Reset Password error: ", error);
            toast.error(error.response.data.error || error.response.data.message);
        } finally {
            toast.dismiss(toastId);
        }


    }

    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <h1 className="text-2xl">Reset Password</h1>
            <h2>Enter your email to reset the password</h2>
            <hr />
            <div className="mt-5 flex gap-3 items-center justify-center">
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none
        focus:border-gray-600 text-black
        "
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    placeholder="email"
                />

            </div>
            <button
                onClick={onReset}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Send Email
            </button>
            <Link href="/login">Visit login page</Link>

        </div>

    );
}
