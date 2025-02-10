import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as {key: string, data: {[key: string]: any}[]}
        const filePath = path.join(process.cwd(), "fakeData", "pastData.json")
        
        const fileContent = await fs.readFile(filePath, "utf8")
        const existingData = JSON.parse(fileContent)
        let newData = Object.assign({}, existingData) as {[key: string]: any[]}
        let data = body.data
        //@ts-ignore
        data.date = new Date().toISOString()
        newData[body.key].push(data)
        await fs.writeFile(filePath, JSON.stringify(newData, null, 2))
        return NextResponse.json({ data: newData }, { status: 200 })
    } catch (error) {
        console.error("Error updating user info:", error)
        return NextResponse.json({ error: "Failed to update user info" }, { status: 500 })
    }
}

export async function GET(req: NextRequest, {params} : {params : {key : string}}) {
    const filePath = path.join(process.cwd(), "fakeData", "pastData.json")
    const fileContent = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContent)
    if (params.key){
        if (!data[params.key]){
            return NextResponse.json({error: "Key not found"}, {status: 404})
        }
        return NextResponse.json(data[params.key])
    }
    return Response.json(data)
}