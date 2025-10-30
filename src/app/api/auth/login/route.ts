import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import JWT from "jsonwebtoken"
import connectDb from "@/dbConfig/dbConfig";
export async function POST(request: NextRequest) {
    connectDb();
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        if (!email || !password) {
            return NextResponse.json({ message: "All fileds are required to login" }, { status: 400 })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "user not found" }, { status: 404 })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return NextResponse.json({ message: "Invalid credebtials" }, { status: 404 })
        }

        const payload = {
            id: user._id,
            email: user.email
        }

        const token = await JWT.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1d"
        })

        const response = NextResponse.json({ message: "User loggedin SuccessFully", success: true, data: user, token }, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: unknown) {
        console.log(error, "error while login")
        const message = error instanceof Error ? error.message : String(error)
        return NextResponse.json({ message: message || "Internal Server Error" }, { status: 500 })
    }
}