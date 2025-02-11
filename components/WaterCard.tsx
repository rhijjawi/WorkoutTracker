"use client"
import { useEffect, useState } from "react"
import { useWorkouts } from "./providers/DataProvider"
import { calculateTodayWater, Unit } from "@/utils/calculations"

export function WaterCard({unit} : {unit: Unit}) {
    const {water, setWater} = useWorkouts()
    const [todayWater, setTodayWater] = useState<number>(0)
    useEffect(()=>{
        setTodayWater(calculateTodayWater(water, unit))
    }, [water])
    return (<>
        <div className="text-2xl"><span className="font-bold text-blue-500">{todayWater}</span> <span className="font-bold">{unit == "metric" ? "ml" : "fl.oz"}</span></div>
    </>)
}