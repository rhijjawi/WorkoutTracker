"use client"
import { ActivityLevel, Gender } from "@/lib/types";
import { getUserInfo } from "@/lib/utils";
import { Unit } from "@/utils/calculations";
import { createContext, useContext, useEffect, useState } from "react";

export type UserInfoType = {
    userData: {
        "name": string,
        "age": number,
        "height": number,
        "weight": number,
        "bodyFat": number,
        "gender": Gender,
        "preferredActivityLevel": ActivityLevel,
        "preferences": {
            "unit": Unit
        }
    } | null,
    "loading": boolean
}

const UserPrefs = createContext<UserInfoType>({
    loading: true,
    userData: null
})

export function UserPrefsProvider({children}: Readonly<{children: React.ReactNode}>) {
    const [userData, setUserData] = useState<UserInfoType["userData"]>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        getUserInfo({setLoading, dataSetter: setUserData})
    }, [])
    return (
        <UserPrefs.Provider value={{userData: userData, loading: loading}}>
            {loading ? <></> : children}
        </UserPrefs.Provider>
    )
}

export function useUserPrefs() {
    const ctx = useContext(UserPrefs)
    if (!ctx) {
        throw new Error("useUserPrefs must be used within an UserPrefsProvider")
    }
    return ctx
}