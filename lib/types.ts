import { Unit } from "@/utils/calculations"

export type Water = {
    amount: number,
    id?: number,
    time: string,
    unit: Unit,
    date: string
}

export type HumanBody = {
    "weight": number,
    "height": number,
    "unit": Unit,
    "bodyFat": number,
    "date": string
}

export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
