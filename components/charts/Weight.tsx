"use client"
import { Unit } from "@/utils/calculations";
import { LineChart } from "@tremor/react";
import { useWorkouts } from "@/components/providers/DataProvider";
import { HumanBody } from "@/lib/types";
import { useEffect, useState } from "react";
import { normalizeWeight } from "@/lib/utils";

export default function Weight({unit}:{unit: Unit}){
    const {body, loading} = useWorkouts()
    const [weightData, setWeightData] = useState<HumanBody[]|null>([])
    useEffect(()=>{
        if (loading) return
        // setWeightData(body)
        setWeightData(body.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        }).map((weight)=>{
            return {...weight, date: weight.date.split("T")[0], "Weight" : normalizeWeight(weight.weight!, weight.unit!, unit!)}
        }))
    }, [body])
    return (
    <>
        <LineChart
            className="h-full"
            data={weightData!}
            index="date"
            categories={["Weight"]}
            colors={["blue", "red", "emerald"]}
            valueFormatter={(v) => {
                return `${unit == "metric" ? v.toFixed(2) : v.toFixed(0)} ${unit == "imperial" ? "lbs" : "kg"}`
            }}
            yAxisWidth={80}
            allowDecimals={unit == "metric"}
            showXAxis
            xAxisLabel="Date"
            yAxisLabel={unit == "imperial" ? "lbs" : "kg"}
            showLegend={true}
        />
    </>)
}