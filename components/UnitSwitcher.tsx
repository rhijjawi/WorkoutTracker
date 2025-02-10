import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { Unit } from "@/utils/calculations"

interface UnitSwitcherProps {
  unit: Unit
  onUnitChange: (unit: Unit) => void
}

export function UnitSwitcher({ unit, onUnitChange }: UnitSwitcherProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="unit-switch"
        checked={unit === "imperial"}
        onCheckedChange={(checked) => onUnitChange(checked ? "imperial" : "metric")}
      />
      <Label htmlFor="unit-switch">{unit === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/in)"}</Label>
    </div>
  )
}

