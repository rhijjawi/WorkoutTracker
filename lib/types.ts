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
export type UserInfoType = {
    name: string,
    age: number,
    height: number,
    weight: number,
    bodyFat: number,
    gender: Gender,
    preferredActivityLevel: ActivityLevel,
    preferences: {
        unit: Unit
    },
    unit: Unit,
}

export type UserInfo = {
    userData: UserInfoType | null,
    loading: boolean
}