import { Stack, Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import {MaterialCommunityIcons} from '@expo/vector-icons';
export default function TabsLayout() {
  return <Tabs screenOptions={{
  headerStyle: {backgroundColor: '#f5f5f5'},
  headerShadowVisible: false,
  tabBarStyle: {
    backgroundColor: '#f5f5f5',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0
  },
  tabBarActiveTintColor: '#6200ee',
  tabBarInactiveTintColor: '#666666'
  }}>
    
   <Tabs.Screen
  name="index"
  options={{
    title: "Today's Habits",
    tabBarIcon: ({ color, size }) =>
     (<MaterialCommunityIcons size={size} color={color} name="calendar-today"/>)
  }}
/>

<Tabs.Screen
  name="streaks"
  options={{
    title: "Streaks",
    tabBarIcon: ({ color, size }) =>
     (<MaterialCommunityIcons size={size} color={color} name="chart-line"/>)
  }}
/>
<Tabs.Screen
  name="add-habit"
  options={{
    title: "Add Habit",
    tabBarIcon: ({ color, size }) =>
     (<MaterialCommunityIcons size={size} color={color} name="plus-circle"/>)
  }}
/>
    {/* <Tabs.Screen name="login" options={{title: "Login", tabBarIcon: ({color})=><Entypo name="login" size={24} color={color} />}}/> */}
  </Tabs>;
}
