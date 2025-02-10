"use client"
import { getUserInfo, getWorkoutData } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

type GeoJSON = {
    points: [number, number][];
    type: "LineString";
};

interface Workout {
    type: "running" | "swimming" | "cycling";
    distance_metric: number;
    duration: number;
    date: string;
    geojson: GeoJSON | null;
}

export type WorkoutsData = Workout[]|null;

export type DataType = {
    workoutData: WorkoutsData,
    loading: boolean
}

const Workouts = createContext<DataType>({
    loading: true,
    workoutData: null
})

export function WorkoutProvider({children}: Readonly<{children: React.ReactNode}>) {
    const [workoutData, dataSetter] = useState<WorkoutsData>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        getWorkoutData({setLoading, dataSetter})
    }, [])
    return (
        <Workouts.Provider value={{workoutData, loading}}>
            {children}
        </Workouts.Provider>
    )
}

export function useWorkouts() {
    const ctx = useContext(Workouts)
    if (!ctx) {
        throw new Error("useWorkouts must be used within an WorkoutProvider")
    }
    return ctx
}