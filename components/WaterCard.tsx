"use client"
import { useEffect, useState } from "react"
import { useWorkouts } from "./providers/DataProvider"
import { calculateTodayWater, Unit } from "@/utils/calculations"
import { useUnit } from "./providers/UnitSwitchProvider"

export function WaterCard() {
    const {water, setWater} = useWorkouts()
    const [todayWater, setTodayWater] = useState<number>(0)
    const {unit} = useUnit()
    useEffect(()=>{
        setTodayWater(calculateTodayWater(water, unit) ?? 0)
        console.log(calculateTodayWater(water, unit))
    }, [water])
    if (!todayWater) return (null)
    return (<>
        <div className="text-2xl"><span className="font-bold text-blue-500">{unit == "metric" ? todayWater : todayWater}</span> <span className="font-bold">{unit == "metric" ? "ml" : "fl.oz"}</span></div>
    </>)
}