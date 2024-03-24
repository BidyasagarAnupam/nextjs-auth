"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function ResetPassword() {
    const route = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState("");


    const onReset = async () => {
        if (token.length > 0) {
            const toastId = toast.loading("loading...")
            try {
                if (!(password.length > 0 || confirmPassword.length > 0)) {
                    toast.error("Both fields are required");
                    return
                }

                if (password !== confirmPassword) {
                    toast.error("Password and Confirm Password must be the same");
                    return
                }

                const responce = await axios.post('/api/users/resetpassword', { password, token })
                console.log("responce", responce);
                toast.success("Password reset successfully")
                route.push('/login')

            } catch (error: any) {
                console.log("Reset Password error: ", error);
                toast.error(error.response.data.error);
            } finally {
                toast.dismiss(toastId);
            }
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <h1 className="text-2xl">Set your New Password</h1>
            <hr />
            <div className="mt-5 flex gap-3 items-center justify-center">
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none
        focus:border-gray-600 text-black
        "
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />

            </div>
            <div className=" flex gap-3 items-center justify-center">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                    className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none
        focus:border-gray-600 text-black
        "
                    id="cpassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                    placeholder="confirm password"
                />

            </div>
            <button
                onClick={onReset}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Reset Password
            </button>
            <Link href="/login">Visit login page</Link>

        </div>
    )
}