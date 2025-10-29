import connectDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import bcrypt from "bcryptjs"

// connect db 
// get the data drom the req body 
export async function POST(request: NextRequest) {
    connectDb()
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const { username, email, password } = reqBody

        if (!username || !password || !email) {
            return NextResponse.json({ message: "All fileds are required", success: false }, { status: 400 })
        }

        const isUserExisted = await User.findOne({ email })
        if (isUserExisted) {
            return NextResponse.json({ message: "user with this email already existed", success: false }, { status: 400 })
        }

        // hash the password
         const hashedPassword =  await bcrypt.hash(password,10)

         const user = await User.create({
            username,
            email,
            password:hashedPassword
         })

         return NextResponse.json({message:"user Registered successfully",data:user},{status:200})

    } catch (error: any) {
        console.log(error, "Error while regestring the user")
        return NextResponse.json({ message: error.response || "internal Server Error" }, { status: 500 })
    }

}