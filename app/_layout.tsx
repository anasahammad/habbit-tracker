import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./lib/auth-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import {GestureHandlerRootView} from "react-native-gesture-handler"
function RouteGourd({children} : {children: React.ReactNode}){
  const router = useRouter()
 const {user, isLoadingUser} = useAuth()
  const segments = useSegments()
 useEffect(()=>{
  const isAuthGroup = segments[0] === 'auth'
   if(!user && !isAuthGroup && !isLoadingUser){
    setTimeout(()=>{
      router.replace("/auth")
    }, 0)
  } else if(user && isAuthGroup  && !isLoadingUser){
    router.replace("/")
  }
 }, [user, segments])

 return <>{children}</>
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <AuthProvider>
      <PaperProvider>
      <SafeAreaProvider>
  <RouteGourd>
    <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    
  </Stack>
  </RouteGourd>
  </SafeAreaProvider>
  </PaperProvider>
  </AuthProvider>

  </GestureHandlerRootView>
  );
}
