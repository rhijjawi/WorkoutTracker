"use client"
import { HumanBody, Water } from "@/lib/types";
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
    setWorkoutData: React.Dispatch<React.SetStateAction<Workout[]>>,
    body: HumanBody[],
    setBody: React.Dispatch<React.SetStateAction<HumanBody[]>>,
    calories: any[],
    setCalories: React.Dispatch<React.SetStateAction<any[]>>
}

const Workouts = createContext<DataType>({
    loading: true,
    workouts: null,
    setWorkoutData : () => [],
    setWater : () => [],
    setBody: () => [],
    calories: [],
    setCalories: () => [],
    body: [],
    water: []
})

export function WorkoutProvider({children}: Readonly<{children: React.ReactNode}>) {
    const [workoutData, setWorkoutData] = useState<Workout[]>([])
    const [water, setWater] = useState<Water[]>([])
    const [body, setBody] = useState<HumanBody[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [calories, setCalories] = useState<HumanBody[]>([])
    useEffect(()=>{
        async function _(){
            getWorkoutData({setLoading, dataSetter : setWorkoutData}).catch((e)=>{
                toast.error(e, {richColors : true, duration : 3000})
                setWorkoutData([])
            })
            getDataFromLog("water").then((data) => {
                if (data.data){
                    toast.success("Successfully fetched water intake data", {richColors : true, duration : 3000})
                    return setWater(data.data)
                }
                toast.error("Failed to fetch water intake data", {richColors : true, duration : 3000})
                setWater([])
            })
            getDataFromLog("body").then((data) => {
                if (data.data){
                    toast.success("Successfully fetched body data", {richColors : true, duration : 3000})
                    return setBody(data.data)
                }
                toast.error("Failed to fetch body data", {richColors : true, duration : 3000})
                setBody([])
            })
            getDataFromLog("calories").then((data) => {
                if (data.data){
                    toast.success("Successfully fetched calorie data", {richColors : true, duration : 3000})
                    return setCalories(data.data)
                }
                toast.error("Failed to fetch body data", {richColors : true, duration : 3000})
                setCalories([])
            })
        }
        _();
    }, [])
    return (
        <Workouts.Provider value={{workouts : workoutData, calories, setCalories, loading, water, setWater, setWorkoutData, body, setBody}}>
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