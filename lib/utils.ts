import { WorkoutsData } from "@/components/providers/DataProvider"
import { UserInfoType } from "@/components/providers/UserProviders"
import { Unit } from "@/utils/calculations"
import { clsx, type ClassValue } from "clsx"
import { Dispatch, SetStateAction } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

// Tremor Raw focusInput [v0.0.1]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
]

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
]

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
]

export async function getDataFromLog(key?: string) : Promise<{data?: any[], error?: never}|{data?: never, error?: string}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/log${key ? `/${key}` : ""}`)
  if (res.status !== 200) {
    return {error: res.statusText, data: undefined}
  }
  return {data: await res.json(), error: undefined}
}
export async function SSgetDataFromLog(key?: string) : Promise<{data?: any[], error?: never}|{data?: never, error?: string}> {
  const res = await fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}/api/user/log${key ? `/${key}` : ""}`)
  if (res.status !== 200) {
    return {error: res.statusText, data: undefined}
  }
  return {data: await res.json(), error: undefined}
}


// export type NormalizeMeasurementsType = {
//   (measurements: "liquid", unit: Unit): number;
//   (measurements: "weight", unit: Unit): number;
//   (measurements: "length", unit: Unit): number;
//   (measurements: "temperature", unit: Unit): number;
// };

// export const Ratios = {
//   liquid: {
//     imperial: 33.814,
//     metric: 1,
//   },
//   weight: {
//     imperial: 2.20462,
//     metric: 1,
//   },
//   length: {
//     imperial: 0.393701,
//     metric: 1,
//   },
// };

// export function normalizeMeasurements(
//   measurement: keyof typeof Ratios,
//   unit: Unit
// ): number {
//   return Ratios[measurement]?.[unit] ?? 1;
// }

export async function getWorkoutData({setLoading, dataSetter}:{setLoading: Dispatch<SetStateAction<boolean>>, dataSetter: Dispatch<SetStateAction<WorkoutsData>>}){
  try {
    const response = await fetch("/api/workoutData")
    if (response.ok) {
        const data = await response.json()
        dataSetter(data)
        setLoading(false)
    } else {
        console.error("Failed to fetch user info")
    }
} catch (error) {
    console.error("Error fetching user info:", error)
}
}
export const last7Days = new Array(7).fill(0).map((_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - i)
  return date.toISOString().split("T")[0]
})
export async function getUserInfo({setLoading, dataSetter}:{setLoading?: Dispatch<SetStateAction<boolean>>, dataSetter?: Dispatch<SetStateAction<UserInfoType["userData"]>>}) {
  try {
      const response = await fetch("/api/userInfo")
      if (response.ok) {
          const data = await response.json()
          if (setLoading && dataSetter) {
            dataSetter(data)
            setLoading(false)
          }
          return {userData: data, loading: null}
      } else {
          console.error("Failed to fetch user info")
          return {userData: null, loading: null}
      }
  } catch (error) {
      console.error("Error fetching user info:", error)
  }
  return {userData: null, loading: null}
}
export async function SSgetUserInfo() : Promise<{userData?: UserInfoType["userData"], loading: null, error: string|null}> {
  try {
      const response = await fetch(process.env.__NEXT_PRIVATE_ORIGIN+"/api/userInfo")
      if (response.ok) {
          const userData = await response.json()
          return {userData, loading: null, error: null}
      } else {
          console.error("Failed to fetch user info")
          return {userData: null, loading: null, error: "Failed to fetch user info"}
      }
  } catch (error) {
      console.error("Error fetching user info:", error)
  }
  return {userData: null, loading: null, error: "Failed to fetch user info"}
}