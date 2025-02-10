"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddWorkoutModal } from "./modals/AddWorkoutModal"
import { UpdateBodyCharacteristicsModal as UpdateWeightModal } from "./modals/UpdateWeightModal"
import { WaterIntakeModal } from "./modals/WaterIntakeModal"
import { CalorieIntakeModal } from "./modals/CalorieIntakeModal"

export function AddButton() {
  const [openModal, setOpenModal] = useState<string | null>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenModal("workout")}>Add Workout</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal("weight")}>Update Bodily Characteristics</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal("water")}>Add Water Intake</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal("calories")}>Add Calorie Intake</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddWorkoutModal open={openModal === "workout"} onOpenChange={(open) => setOpenModal(open ? "workout" : null)} />
      <UpdateWeightModal open={openModal === "weight"} onOpenChange={(open) => setOpenModal(open ? "weight" : null)} />
      <WaterIntakeModal open={openModal === "water"} onOpenChange={(open) => setOpenModal(open ? "water" : null)} />
      <CalorieIntakeModal
        open={openModal === "calories"}
        onOpenChange={(open) => setOpenModal(open ? "calories" : null)}
      />
    </>
  )
}

