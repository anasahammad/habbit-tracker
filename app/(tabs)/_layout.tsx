import { Stack, Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function TabsLayout() {
  return <Tabs screenOptions={{tabBarActiveTintColor: 'coral'}}>
    
   <Tabs.Screen
  name="index"
  options={{
    title: "Home",
    tabBarIcon: ({ color, focused }) =>
      focused ? (
        <FontAwesome name="home" size={24} color={color} />
      ) : (
        <AntDesign name="home" size={24} color="black" />
      ),
  }}
/>

    <Tabs.Screen name="login" options={{title: "Login", tabBarIcon: ({color})=><Entypo name="login" size={24} color={color} />}}/>
  </Tabs>;
}
