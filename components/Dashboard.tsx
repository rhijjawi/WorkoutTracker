import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, BarChart } from "@tremor/react"
import { CalendarDays, Flame, Dumbbell, Target, GlassWater, ArrowDown01, ArrowDown, HamIcon } from "lucide-react"
import { AddButton } from "./AddButton"
import { WaterChart } from "./charts/Water"
import { getWorkoutData, last7Days, minimumsSecondsForActivityLevel, SSgetDataFromLog, SSgetUserInfo } from "@/lib/utils"
import { calculateTodayWater } from "@/utils/calculations"
import Table from "./charts/Table"
import WeightChart from "./charts/Weight"
import { WaterCard } from "./WaterCard"
import { CaloriesIn, CaloriesOut } from "./CalorieCard"
import { UserInfo, UserInfoType } from "@/lib/types"
import { UnitSwitcher, UnitSwitcherUser } from "./UnitSwitcher"

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

const __workoutData = [
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
  const {userData} = await SSgetUserInfo() as {userData: UserInfoType, loading: null, error: string|null}
  const {unit} = userData?.preferences
  const {data: workoutData, error} = await getWorkoutData()
  console.log(workoutData)
  if (error) {
    return (<>
    {error}
    </>)
  }
  const [past7daySumWorkouts, daysActive] = [last7Days.map((date) => {
    const todayExercises = workoutData?.workouts.filter((d) => {
      return d.date.split("T")[0] == date
    });
    return todayExercises?.length ?? 0
  }).reduce((acc, curr)=>acc + curr, 0), last7Days.map((date) => {
    const todayExercises = workoutData?.workouts.filter((d) => {
      return d.date.split("T")[0] == date
    })
    return todayExercises?.reduce((acc, curr) => {
      return curr.duration + acc
    }, 0)
  })]

  return (
    <div className="p-6 bg-background text-foreground">
      <div className="flex flex-row justify-between items-center mb-6">
        <AddButton />
        <UnitSwitcherUser />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calorie Intake (Today)</CardTitle>
            <HamIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <CaloriesIn/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calories Burned (Today)</CardTitle>
            <Flame className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <CaloriesOut />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water In (Today)</CardTitle>
            <GlassWater className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <WaterCard unit={unit} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sufficiently Active Days</CardTitle>
            <CalendarDays className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysActive.filter((e)=>e! > minimumsSecondsForActivityLevel[userData.preferredActivityLevel]).length}/7</div>
            <div className="flex flex-row justify-between">
              {daysActive.map((_, i, arr)=>{
                return (<div key={"activity_"+i} className={`aspect-square w-[10%] rounded-md outline outline-black ${_! > minimumsSecondsForActivityLevel[userData.preferredActivityLevel] ? "bg-green-500/50" : "bg-red-500/50"} outline-1 ${i == arr.length-1 ? "animate-pulse" : ""} `}></div>)
              })}
            </div>
          </CardContent>
        </Card>

        {/* Workouts Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
            <Dumbbell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{past7daySumWorkouts}</div>
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
            <CardTitle>Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent className="h-full overflow-y-auto">
            <Table
              data={workoutData?.workouts || []}
            />
          </CardContent>
        </Card>
        {/* Calories Chart */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Daily Water Intake</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <WaterChart />
          </CardContent>
        </Card>

        {/* Workout Distribution */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Historical Weight Data ({unit == "metric" ? "kg" : "lbs"})</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <WeightChart/>
          </CardContent>
        </Card>
        
      </div>
    </div>
  )
}
