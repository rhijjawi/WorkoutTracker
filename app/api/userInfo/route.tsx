import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const filePath = path.join(process.cwd(), "fakeData", "userInfo.json")

    
    const fileContent = await fs.readFile(filePath, "utf8")
    const existingData = JSON.parse(fileContent)

    const updatedData = { ...existingData, ...body }

    
    await fs.writeFile(filePath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json({ message: "User info updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error updating user info:", error)
    return NextResponse.json({ error: "Failed to update user info" }, { status: 500 })
  }
}

export async function GET() {
    const filePath = path.join(process.cwd(), "fakeData", "userInfo.json")
    const fileContent = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContent)
    return Response.json(data)
}