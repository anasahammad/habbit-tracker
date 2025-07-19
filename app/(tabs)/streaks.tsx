import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Habit, HabitCompletions } from "../types/database.type";
import { useAuth } from "../lib/auth-context";
import { COMPLETING_COLLECTION_ID, DATABASE_ID, databases, HABIT_COLLECTION_ID } from "../lib/appwrite";
import { Query } from "react-native-appwrite";

export default function StreaksPage(){
  const [habits, setHabits] = useState<Habit[]>([])
    const [completedHabits, setCompletedHabits] = useState<HabitCompletions[]>([])
    const {user} = useAuth()
   
  
    useEffect(()=>{
    
     if(user){
      
  
        fetchHabits()
      fetchCompletions()
        
     }
    }, [user])
  
    const fetchHabits =async  ()=>{
      try {
         const response =  await databases.listDocuments(DATABASE_ID, HABIT_COLLECTION_ID, [Query.equal("user_id", user?.$id ?? '')])
  
         console.log('response', response)
         setHabits(response.documents as Habit[])
      } catch (error) {
        console.error(error)
      }
    }
    const fetchCompletions =async  ()=>{
      try {
    
         const response =  await databases.listDocuments(DATABASE_ID, COMPLETING_COLLECTION_ID, [Query.equal("user_id", user?.$id ?? '')])
  
         const completions = response.documents as HabitCompletions[]
         setCompletedHabits(completions)
      } catch (error) {
        console.error(error)
      }
    }


    interface StreakData {
      streak: number;
      bestStreak: number;
      total: number;

    }
    const getStreakData = (habitId: string): StreakData=>{
      const habitCompletions = completedHabits?.filter((c)=>c.habit_id === habitId).sort((a, b)=> new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime())

      if(habitCompletions?.length === 0){
        return {streak:0, bestStreak:0,
          total: 0
        }
      }

      let streak = 0;
      let bestStreak = 0;
      let total = habitCompletions.length;

      let lastDate: Date | null = null;

      let currentStreak = 0;

      habitCompletions?.forEach((c)=>{
        const date = new Date(c.completedAt)

        if(lastDate){
          const diff = (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

          if(diff <= 1.5){
            currentStreak += 1
          } else{
            currentStreak = 1
          }
        } else {
          if(currentStreak > bestStreak) bestStreak = currentStreak;

          streak = currentStreak;
          lastDate = date
        }
      })

       return {streak, bestStreak, total}

    }


    const habitStreak = habits.map((h)=>{
      const {streak, bestStreak, total} = getStreakData(h.$id)

      return {h, bestStreak, streak, total }
    })


    const rankedHabits = habitStreak.sort((a, b)=> a.bestStreak - b.bestStreak)
    return <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text>Streaks Page</Text>
    </View>
}