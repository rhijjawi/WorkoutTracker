"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface AddWorkoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddWorkoutModal({ open, onOpenChange }: AddWorkoutModalProps) {
  const [workoutType, setWorkoutType] = useState(null)
  const [duration, setDuration] = useState<number>(0)
  const [date, setDate] = useState<Date>(new Date())
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Workout</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="workout-type">Workout Type</Label>
            <Select value={workoutType} onValueChange={setWorkoutType}>
              <SelectTrigger id="workout-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cycling">Cycling</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="swimming">Swimming</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input id="duration" type="number" min="1" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="calories">Calories Burned</Label>
            <Input id="calories" type="number" min="0" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={async()=>await submitForm()}>Save Workout</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

