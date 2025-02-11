"use client"
import { Water } from "@/lib/types";
import { getDataFromLog, getWorkoutData } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type GeoJSON = {
    points: [number, number][];
    type: "LineString" | "Point" | "MultiPoint" | "MultiLineString" | "Polygon" | "MultiPolygon" | "GeometryCollection" | "Feature" | "FeatureCollection";
};

export interface Workout {
    type: "running" | "swimming" | "cycling";
    distance_metric: number;
    duration: number;
    date: string;
    geojson: GeoJSON | null;
}


export type DataType = {
    workouts: Workout[]|null,
    loading: boolean,
    water: Water[],
    setWater: React.Dispatch<React.SetStateAction<Water[]>>,
    setWorkoutData: React.Dispatch<React.SetStateAction<Workout[]|null>>
}

const Workouts = createContext<DataType>({
    loading: true,
    workouts: null,
    setWater : () => [],
    setWorkoutData : () => [],
    water: []
})

export function WorkoutProvider({children}: Readonly<{children: React.ReactNode}>) {
    const [workoutData, setWorkoutData] = useState<DataType["workouts"]>(null)
    const [water, setWater] = useState<Water[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        async function _(){
            getWorkoutData({setLoading, dataSetter : setWorkoutData}).catch((e)=>{
                toast.error(e, {richColors : true, duration : 3000})
                setWorkoutData(null)
            })
            getDataFromLog("water").then((data) => {
                if (data.data){
                    toast.success("Successfully fetched water intake data", {richColors : true, duration : 3000})
                    return setWater(data.data)
                }
                toast.error("Failed to fetch water intake data", {richColors : true, duration : 3000})
                setWater([])
            })
        }
        _();
    }, [])
    return (
        <Workouts.Provider value={{workouts : workoutData, loading, water, setWater, setWorkoutData}}>
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