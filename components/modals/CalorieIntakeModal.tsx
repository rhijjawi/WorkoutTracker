"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useState } from "react"
import { useWorkouts } from "../providers/DataProvider"
import DatePicker from "../ui/date-picker"

interface CalorieIntakeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CalorieIntakeModal({ open, onOpenChange }: CalorieIntakeModalProps) {
  const [amount, setAmount] = useState<number|string>(0)
  const [time, setTime] = useState<Date|undefined>(new Date())
  const [date, setDate] = useState<Date>(new Date())
  const [mealType, setMealType] = useState<string>("")
  const {setCalories}  = useWorkouts()
  async function submitForm() {
    const response = await fetch("/api/user/log/water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({key: "calories", data: {
        amount: amount,
        direction: time,
        date: date
      }}),
    })
    if (response.ok) {
      toast.success("Food intake saved", {richColors : true, duration : 3000})
        setCalories((prev) => {
        return [...prev, {amount : Number(amount), time : time?.toISOString()!, date: new Date().toISOString()}] as any[]
      })
      onOpenChange(false)
    }
    else {
      toast.error("Failed to save food intake", {richColors : true, duration : 3000})
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Calorie Intake</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="meal-type">Meal Type</Label>
            <Select
              value={mealType}
              onValueChange={(value : string) => setMealType(value)}
            >
              <SelectTrigger id="meal-type">
                <SelectValue placeholder="Select meal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="calories">Calories</Label>
            <Input id="calories" type="number" min="0" />
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
          <Button onClick={()=>submitForm()}>Save Meal</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

