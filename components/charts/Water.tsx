"use client"
import { getDataFromLog, SSgetDataFromLog } from "@/lib/utils"
import { AreaChart } from "@tremor/react"
import { useEffect, useState } from "react"
import { last7Days } from "@/lib/utils"
export function WaterChart({unit, ...props}:{unit?: "imperial"|"metric"}) {
    const [data, setData] = useState<any[]|null>(null)
    const [waterIntakePast7Days, setWaterIntakePast7Days] = useState<any[]|null>([])
    useEffect(()=>{
        async function _(){
            const __ = await getDataFromLog("water")
            if (__.data) {
                setData(__.data)
            }
        }
        _()
    }, [])
    useEffect(()=>{
        if (!data) return
        setWaterIntakePast7Days(last7Days.map((date) => {
            const dayData = data.filter((d) => d.time.split("T")[0] == date)
            const amount = dayData.reduce((acc, curr) => {
                if (unit == "imperial" && curr.unit == "metric"){
                    return acc + curr.amount * 0.033814
                }
                else if (unit == "metric" && curr.unit == "imperial"){
                    return acc + curr.amount * 29.5735
                }
                return acc + curr.amount
            }, 0)
            return {id: date, "Water Intake" : amount, "Minimum Required Water Intake": unit == "imperial" ? 64 : 2000}
        }).reverse())
    }, [data])
    if (!waterIntakePast7Days) return (null)
    return (
        <AreaChart
            className="h-full"
            data={waterIntakePast7Days}
            index="id"
            categories={["Water Intake", "Minimum Required Water Intake"]}
            colors={["blue", "red"]}
            valueFormatter={(v) => {
                return `${v} ${unit == "imperial" ? "fl. oz" : "ml"}`
            }}
            yAxisWidth={80}
            showXAxis
            xAxisLabel="Date"
            yAxisLabel={unit == "imperial" ? "fl. oz" : "ml"}
            showLegend={true}
        />
    )
}
