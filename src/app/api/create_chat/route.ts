import { messages } from "@/lib/db/schema"
import { NextResponse } from "next/server"


export async function POST(req:Request , res : Response) {
        try {
            const body = await req.json()
            const {filekey,file_name} = body
            console.log(filekey,file_name)
            return NextResponse.json({message:"success"})
            
        } catch (error) {
            console.error(error)
            return NextResponse.json({error :"Internal Server Error!! ",status:500})
        }
    
} 