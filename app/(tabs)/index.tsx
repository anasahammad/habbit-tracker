import { Link } from "expo-router";
import { StyleSheet,  View } from "react-native";
import { Button, Text, } from "react-native-paper";
import { useAuth } from "../lib/auth-context";
import { DATABASE_ID, databases, HABIT_COLLECTION_ID } from "../lib/appwrite";
import { Query } from "react-native-appwrite";
import { useEffect, useState } from "react";
import { Habit } from "../types/database.type";

export default function Index() {
  const {signOut, user} = useAuth()
  const [habits, setHabits] = useState<Habit[]>()

  useEffect(()=>{
    fetchHabits()
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
  return (
    <View
      style={styles.view}
    >
      <View>
        <Text variant="headlineSmall">Today's Habits</Text>
        <Button mode="text" icon="logout" onPress={signOut}>Sign Out</Button>
      </View>
      {/* <Link href="/login" style={styles.link}>Login</Link> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      link: {
        width:100,
        height:20,
        textAlign:"center",
        borderRadius:4,
        cursor: 'pointer',
        backgroundColor:'coral'
      }
})
