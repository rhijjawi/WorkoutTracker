import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, BarChart } from "@tremor/react"
import { CalendarDays, Flame, Dumbbell, Target, GlassWater, ArrowDown01, ArrowDown } from "lucide-react"
import { AddButton } from "./AddButton"
import { WaterChart } from "./charts/Water"
import { last7Days, SSgetDataFromLog, SSgetUserInfo } from "@/lib/utils"
import { calculateTodayWater } from "@/utils/calculations"

// Sample data - in a real app, this would come from your database
const calorieData = [
  {
    date: "Mon",
    "Calories Burned": 350,
    "Target Calories": 400,
  },
  {
    date: "Tue",
    "Calories Burned": 420,
    "Target Calories": 400,
  },
  {
    date: "Wed",
    "Calories Burned": 380,
    "Target Calories": 400,
  },
  {
    date: "Thu",
    "Calories Burned": 450,
    "Target Calories": 400,
  },
  {
    date: "Fri",
    "Calories Burned": 400,
    "Target Calories": 400,
  },
  {
    date: "Sat",
    "Calories Burned": 300,
    "Target Calories": 400,
  },
  {
    date: "Sun",
    "Calories Burned": 390,
    "Target Calories": 400,
  },
]

const workoutData = [
  {
    name: "Cardio",
    minutes: 45,
  },
  {
    name: "Strength",
    minutes: 30,
  },
  {
    name: "Flexibility",
    minutes: 15,
  },
]

async function getWaterData(){
  const __ = await SSgetDataFromLog("water")
  if (__.data) {
    return {water: __.data, error: null}
  }
  else {
    return {water: null, error: __.error}
  }

}

export async function Dashboard() {
  const {userData} = await SSgetUserInfo()
  const {unit} = userData?.preferences || {unit: "metric"}
  const {water} = await getWaterData()
  if (!water) return (<></>)
  const [todayWater] = [calculateTodayWater(water, unit)]
  const totalCalories = calorieData.reduce((sum, day) => sum + day["Calories Burned"], 0)
  return (
    <div className="p-6 bg-background text-foreground">
      <div className="mb-6">
        <AddButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calorie Intake (Today)</CardTitle>
            <ArrowDown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{totalCalories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calories Burned (Today)</CardTitle>
            <Flame className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{totalCalories}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water In (Today)</CardTitle>
            <GlassWater className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl"><span className="font-bold text-blue-500">{todayWater.toFixed(2).endsWith(".00") ? todayWater : todayWater.toFixed(2).endsWith(".00")}</span> <span className="font-bold">{unit == "metric" ? "ml" : "fl.oz"}</span></div>
          </CardContent>
        </Card>
        {/* Total Calories Card */}

        {/* Active Days Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Days</CardTitle>
            <CalendarDays className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/7</div>
          </CardContent>
        </Card>

        {/* Workouts Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        {/* Goal Progress Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
          </CardContent>
        </Card>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 grid-rows-[repeat(2,500px)] lg:grid-cols-2 gap-6 mt-6">
        {/* Calories Chart */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Weekly Calories Burned</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <AreaChart
              className="h-full"
              data={calorieData}
              index="date"
              categories={["Calories Burned", "Target Calories"]}
              colors={["red", "blue"]}
              yAxisWidth={40}
              showLegend={true}
            />
          </CardContent>
        </Card>

        {/* Workout Distribution */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Workout Distribution (minutes)</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <BarChart
              className="h-full"
              data={workoutData}
              index="name"
              colors={["orange"]}
              categories={["minutes"]}
              yAxisWidth={40}
              showLegend={false}
            />
          </CardContent>
        </Card>
        {/* Calories Chart */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Daily Water Intake</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <WaterChart unit={unit} />
          </CardContent>
        </Card>

        {/* Workout Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Workout Distribution (minutes)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              className="h-72"
              data={workoutData}
              index="name"
              colors={["orange"]}
              categories={["minutes"]}
              yAxisWidth={40}
              showLegend={false}
            />
          </CardContent>
        </Card>
        
      </div>
    </div>
  )
}
