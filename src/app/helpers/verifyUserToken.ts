import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const verifyUserToken = async(request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value

        if(!token){
            return NextResponse.json({message:"User unauthorized",success:false},{
                status:401
            })
        }

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET!)

        return decodedToken
    } catch (error:unknown) {
        throw new Error("Failed to verify user token")
    }
}