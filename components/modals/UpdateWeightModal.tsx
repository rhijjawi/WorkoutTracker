"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BmiCalculator } from "./BMIModal"
import { UnitSwitcher } from "../UnitSwitcher"
import { getUserInfo } from "@/lib/utils"
import { UserInfo, useUserPrefs } from "../providers/UserProviders"
import { ActivityLevel } from "@/lib/types"
interface UpdateBodyCharacteristicsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpdateBodyCharacteristicsModal({ open, onOpenChange }: UpdateBodyCharacteristicsModalProps) {
  const {userData, loading} = useUserPrefs()
  const [formData, setFormData] = useState<UserInfoType>(userData)
  
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  useEffect(()=>{
    if (!loading){
      console.log(userData)
      setFormData(userData)
    }
  }, [loading])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  // useEffect(()=>{
  //   getUserInfo({dataSetter : setFormData})
  // }, [])
  const handleSubmit = async () => {
    try {
      let _formData = { ...formData }
      Object.keys(_formData).forEach((key) => {
        try {
          //@ts-ignore
          ["age", "height", "weight", "bodyFat"].includes(key) && (_formData[key] = parseFloat(_formData[key]))
        } catch (error) {
        }
      })
      const response = await fetch("/api/userInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_formData),
      })
      await fetch("/api/user/log", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key : "body",
          data: {
            weight: _formData.weight,
            height: _formData.height,
            unit: unit,
            bodyFat: _formData.bodyFat,
          }
        })
      })

      if (response.ok) {
        console.log("User info updated successfully")
        onOpenChange(false)
      } else {
        console.error("Failed to update user info")
      }
    } catch (error) {
      console.error("Error updating user info:", error)
    }
  }
  if (loading) return (<></>)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Bodily Characteristics</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" value={formData.age} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="height">Height ({unit == "metric" ? "cm" : "in"})</Label>
            <Input id="height" type="number" value={formData.height} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weight">Weight ({unit == "metric" ? "kg" : "lb"})</Label>
            <Input id="weight" type="number" value={formData.weight} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bodyFat">Body Fat (%)</Label>
            <Input id="bodyFat" type="number" value={formData.bodyFat} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="preferredActivityLevel">Preferred Activity Level</Label>
            <Select
              value={formData.preferredActivityLevel}
              onValueChange={(value : "light"|"moderate"|"active"|"very_active") => setFormData({ ...formData, preferredActivityLevel: value as ActivityLevel })}
            >
              <SelectTrigger id="preferredActivityLevel">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="very_active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="units">Unit</Label>
            <UnitSwitcher unit={unit} onUnitChange={()=>{
              setFormData({...formData, preferences: {unit: unit == "imperial" ? "metric" : "imperial"}})
              unit == "imperial" ? setUnit("metric") : setUnit("imperial")
            }} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bmi_r">BMI and BMR</Label>
            <BmiCalculator weight={formData.weight} unit={unit} height={formData.height} age={Number.parseInt(formData.age)} gender={formData.gender} />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

