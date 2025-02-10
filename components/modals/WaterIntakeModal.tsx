"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import DatePicker from "@/components/ui/date-picker"
import { set } from "date-fns"
import { useUserPrefs } from "../providers/UserProviders"
import { toast } from "sonner"

interface WaterIntakeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void,
}

export function WaterIntakeModal({ open, onOpenChange }: WaterIntakeModalProps) {
  const [amount, setAmount] = useState<number|string>(0)
  const [time, setTime] = useState<Date|undefined>(new Date())
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(e.target.value))){
      const nums = e.target.value.match(/\d+/g)
      if (nums){
        if (nums.length > 0){
          return setAmount(Number(e.target.value.match(/\d+/g)?.join('')))
        } else {
          return setAmount(0)
        }
      }
      return setAmount("")
    }
    return setAmount(Number(e.target.value))
  }
  async function submitForm() {
    const response = await fetch("/api/user/log/water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({key: "water", data: {
        amount: amount,
        time: time,
        unit: userData?.preferences.unit
      }}),
    })
    if (response.ok) {
      toast.success("Water intake saved", {richColors : true, duration : 3000})
      onOpenChange(false)
    }
    else {
      toast.error("Failed to save water intake", {richColors : true, duration : 3000})
    }
  }
  const {userData, loading} = useUserPrefs()
  useEffect(()=>{
    if (!loading) return
  }, [loading])
  if (loading) return (<></>)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Water Intake</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount ({userData?.preferences.unit == "imperial" ? "fl. oz" : "ml"})</Label>
            <Input id="amount" value={amount} onChange={handleInputChange} type="number" min="0" step={userData?.preferences.unit == "metric" ? "50" : "8"} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <DatePicker date={time} setDate={setTime} />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={()=>submitForm()}>Save Water Intake</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

