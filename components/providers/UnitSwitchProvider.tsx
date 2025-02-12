"use client"

import { UnitSwitcherProviderProps } from "@/lib/types"
import { Unit } from "@/utils/calculations"
import { createContext, useContext, useEffect, useRef, useState } from "react"



const useUnits = createContext<UnitSwitcherProviderProps>({
    unit: null,
    hasBeenModified: false,
    setUnit: () => {},
    loading: true,
})

export function UnitProvider({children}: Readonly<{children: React.ReactNode}>) {
    const [unit, setUnit] = useState<Unit|null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [hasBeenModified, setHasBeenModified] = useState<boolean>(false)
    const prevState = useRef<null|Unit>(null)
    useEffect(()=>{
        async function _(){
            setLoading(true)
            const r = await fetch("/api/user/unit", {
                method : "GET",
            })
            const {unit: _unit} = await r.json()
            setUnit(_unit)
            setLoading(false)
        }
        _();
    }, [])
    useEffect(()=>{
        async function _(){
            setLoading(true)
            const r = await fetch("/api/user/unit", {
                method : "POST",
                body: JSON.stringify({unit}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const {unit: _unit} = await r.json()
            setHasBeenModified(true)
            setLoading(false)
        }
        _();
    }, [unit])
    return (
        <useUnits.Provider value={{unit, setUnit, loading: loading, hasBeenModified}}>
            {loading ? <></> : children}
        </useUnits.Provider>
    )
}

export function useUnit() {
    const ctx = useContext(useUnits)
    if (!ctx) {
        throw new Error("useUnit must be used within an useUnitProvider")
    }
    return ctx
}