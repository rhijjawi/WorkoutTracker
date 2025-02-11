"use client"
import { getDataFromLog, SSgetDataFromLog } from "@/lib/utils"
import { AreaChart, LineChart } from "@tremor/react"
import { useEffect, useState } from "react"
import { last7Days } from "@/lib/utils"
import { useWorkouts } from "../providers/DataProvider"
import { useUserPrefs } from "../providers/UserProviders"
import { calculateWaterIntake } from "@/utils/calculations"
import { useUnit } from "../providers/UnitSwitchProvider"
export function WaterChart() {
    const {water} = useWorkouts()
    const {unit} = useUnit()
    const {userData, loading} = useUserPrefs()
    const [waterIntakePast7Days, setWaterIntakePast7Days] = useState<any[]|null>([])
    useEffect(()=>{
        if (!water) return
        if (loading) return
        setWaterIntakePast7Days(last7Days.map((date) => {
            const dayData = water.filter((d) => {
                return d.time.split("T")[0] == date
            })
            const amount = dayData.reduce((acc, curr) => {
                if (unit == "imperial" && curr.unit == "metric"){
                    return acc + curr.amount * 0.033814
                }
                else if (unit == "metric" && curr.unit == "imperial"){
                    return acc + curr.amount * 29.5735
                }
                return acc + curr.amount
            }, 0)
            const weightInKg = userData?.unit === "imperial" ? (userData?.weight! / 2.205) : userData?.weight!;
            const maxSuggestedWaterL = calculateWaterIntake(weightInKg, userData?.gender!, userData?.preferredActivityLevel!, unit!);
            const getMaxSuggestedWater = unit === "imperial" ? parseFloat((maxSuggestedWaterL * 33.814).toFixed(2)) : maxSuggestedWaterL*1000;
            return {id: date, "Water Intake" : amount, "Minimum Required Water Intake": unit == "imperial" ? 64 : 2000, "Maximum suggested water intake" : getMaxSuggestedWater}
        }))
    }, [water, unit])
    if (!waterIntakePast7Days) return (null)
    return (
        <>
        <LineChart
            className="h-full"
            data={waterIntakePast7Days}
            index="id"
            categories={["Water Intake", "Minimum Required Water Intake", "Maximum suggested water intake"]}
            colors={["blue", "red", "emerald"]}
            valueFormatter={(v) => {
                return `${v} ${unit == "imperial" ? "fl. oz" : "ml"}`
            }}
            yAxisWidth={80}
            showXAxis
            xAxisLabel="Date"
            yAxisLabel={unit == "imperial" ? "fl. oz" : "ml"}
            showLegend={true}
        />
        </>
    )
}
