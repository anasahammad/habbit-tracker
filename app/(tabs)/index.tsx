import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../lib/auth-context";

export default function Index() {
  const {signOut} = useAuth()
  return (
    <View
      style={styles.view}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {/* <Link href="/login" style={styles.link}>Login</Link> */}
      <Button mode="text" icon="logout" onPress={signOut}>Sign Out</Button>
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
