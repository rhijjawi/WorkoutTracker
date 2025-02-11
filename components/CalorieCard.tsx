"use client"

import { useEffect, useState } from "react";
import { useWorkouts } from "./providers/DataProvider";
import { useUserPrefs } from "./providers/UserProviders";
import { calculateBMR } from "@/utils/calculations";

export function CaloriesIn(){
    const {userData} = useUserPrefs()
    const [naturallyLost, setNaturallyLost] = useState<number>(0)
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
            <div className="text-2xl font-bold text-red-500">{(naturallyLost + 0).toFixed(0)} kcal</div>
        </>
    )
}