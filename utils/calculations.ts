export type Unit = "metric" | "imperial"

export function calculateBMI(weight: number, height: number, unit: Unit): number {
  if (unit === "metric") {
    return weight / (height / 100) ** 2
  } else {
    return (weight / height ** 2) * 703
  }
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female",
  unit: Unit,
): number {
  let bmr: number

  if (unit === "metric") {
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    }
  } else {
    // Convert imperial to metric for calculation
    const weightKg = weight * 0.453592
    const heightCm = height * 2.54

    if (gender === "male") {
      bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
    } else {
      bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age
    }
  }

  return Math.round(bmr)
}



export function calculateTodayWater(water: any[], unit: Unit) {
  return water.filter((d) => d.time.split("T")[0] == new Date().toISOString().split("T")[0]).reduce((acc, curr) => {
    if (unit == "imperial" && curr.unit == "metric") {
      return acc + curr.amount * 0.033814
    }
    else if (unit == "metric" && curr.unit == "imperial") {
      return acc + curr.amount * 29.5735
    }
    return acc + curr.amount
  }, 0)
}
