import { Unit } from "@/utils/calculations";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises"
import path from "path"

export async function POST(req : NextRequest){
    const {unit} = await req.json() as {unit: Unit}
    if (unit === "imperial" || unit === "metric"){
        try {
            const filePath = path.join(process.cwd(), "fakeData", "userInfo.json")
        
            const fileContent = await fs.readFile(filePath, "utf8")
            const existingData = JSON.parse(fileContent)
            const updatedData = { ...existingData, preferences: {unit} }
            
            await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2))
        
            return NextResponse.json({ message: "User info updated successfully" }, { status: 200 })
        } catch (error) {
            console.error("Error updating user info:", error)
            return NextResponse.json({ error: "Failed to update user info" }, { status: 500 })
        }
    }
    return Response.json({
        error: {
            message: "Invalid unit"
        }
    }, {status : 400})

}

export async function GET(req : NextRequest){
    const filePath = path.join(process.cwd(), "fakeData", "userInfo.json")
    const fileContent = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContent)
    console.log(data.unit)
    return Response.json({unit : data.preferences.unit})

}