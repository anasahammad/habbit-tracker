import { Models } from "react-native-appwrite";


export interface Habit extends Models.Document{
    user_id: string;
    title: string;
    description: string;
    frequency: string;
    streak_count: number;
    last_completed: string;
    created_at: string;
}

export interface HabitCompletions  extends Models.Document{
    user_id: string;
    habit_it: string;
    completedAt: string;
}