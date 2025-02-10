import fs from "fs/promises"
import path from "path"

export async function GET() {
    const filePath = path.join(process.cwd(), "fakeData", "workouts.json")
    const fileContent = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContent)
    return Response.json(data)
}