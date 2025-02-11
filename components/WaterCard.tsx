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
    if (!todayWater) return (null)
    return (<>
        <div className="text-2xl"><span className="font-bold text-blue-500">{[String(todayWater).split(".")[0],String(todayWater).split(".")[1].slice(0,2)].join(".")}</span> <span className="font-bold">{unit == "metric" ? "ml" : "fl.oz"}</span></div>
    </>)
}