"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UnitSwitcher } from "../UnitSwitcher"
import { calculateBMI, calculateBMR, type Unit } from "@/utils/calculations"


export function BmiCalculator({unit, weight, height, age, gender}: {unit: Unit, weight: string, height: string, age: number, gender: "male" | "female"}) {
    let [bmi, setBmi] = useState<number | null>(null)
    let [bmr, setBmr] = useState<number | null>(null)
    useEffect(()=>{
        const weightNum = Number.parseFloat(weight)
        const heightNum = Number.parseFloat(height)
    
        const calculatedBMI = calculateBMI(weightNum, heightNum, unit)
        const calculatedBMR = calculateBMR(weightNum, heightNum, age, gender, unit)
        if (weightNum && heightNum && age) {
           setBmi(calculatedBMI)
           setBmr(calculatedBMR)
        }
    })

    return (
        <Card>
            <CardContent className="my-auto h-full py-4">
                <p><span className="font-bold">BMI</span>: {bmi}</p>
                <p><span className="font-bold">BMR</span>: {bmr} kcal</p>
            </CardContent>
        </Card>
    )
}

