"use client"
import { ActivityLevel, Gender, UserInfo, UserInfoType } from "@/lib/types";
import { getUserInfo } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";


const UserPrefs = createContext<UserInfo>({
    loading: true,
    userData: null
})

export function UserPrefsProvider({children}: Readonly<{children: React.ReactNode}>) {
    const [userData, setUserData] = useState<UserInfo["userData"]>(null)
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