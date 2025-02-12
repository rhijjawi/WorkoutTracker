"use client"

import { useEffect, useState } from "react";
import { useWorkouts } from "./providers/DataProvider";
import { useUserPrefs } from "./providers/UserProviders";
import { calculateBMR } from "@/utils/calculations";
import { getDataFromLog } from "@/lib/utils";

export function CaloriesIn(){
    const {userData} = useUserPrefs()
    const {setCalories, calories}  = useWorkouts()
    const [caloriesIn, setCaloriesIn] = useState<number>(calories.reduce((acc, curr) => {
        return acc + (curr.direction == "in" ? curr.amount : 0)
    }, 0))

    return (
        <>
            <div className="text-2xl font-bold text-green-500">{caloriesIn} kcal</div>
        </>
    )
}
export function CaloriesOut(){
    const {userData} = useUserPrefs()
    const [naturallyLost, setNaturallyLost] = useState<number>(0)
    const {setCalories, calories}  = useWorkouts()
    const [caloriesOut, setCaloriesOut] = useState<number>(calories.reduce((acc, curr) => {
        return acc + (curr.direction == "out" ? curr.amount : 0)
    }, 0))
    useEffect(() => {
        function calculateAndSet(){
            const willBurn = calculateBMR(userData?.weight!, userData?.height!, userData?.age!, userData?.gender!, userData?.preferences.unit!)
            const timeSince = new Date()
            timeSince.setHours(0, 0, 0, 0)
            const burnedPerMinute = (((new Date().getTime() - timeSince.getTime())/(1000*60)) / 1440) * willBurn 
            setNaturallyLost(burnedPerMinute)
        }
        calculateAndSet()
        const id = setInterval(() => {
            calculateAndSet()
        }, 1000);
        return () => clearInterval(id);
    }, [])
    return (
        <>
            <div className="text-2xl font-bold text-red-500">{(naturallyLost + caloriesOut).toFixed(0)} kcal</div>
        </>
    )
}