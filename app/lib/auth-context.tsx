import { createContext, useContext, useEffect, useState } from "react"
import { ID, Models } from "react-native-appwrite"
import { account } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean;
    signUp: (email:string, password:string)=>Promise<string | null>;
    signIn: (email:string, password:string)=>Promise<string | null>;
    signOut: ()=>Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}: {children: React.ReactNode}){

const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

useEffect(()=>{
    getUser();
}, [])
const getUser = async ()=>{
    try {
        const session = await account.get()
        setUser(session)
    } catch (error) {
        setUser(null)
    } finally{
        setIsLoadingUser(false)
    }
}


    const signUp = async (email:string, password:string)=>{
        try {
            // Register User
await account.create(ID.unique(), email, password);
    await signIn(email, password);
    return null;
        } catch (error) {
            if(error instanceof Error){
                return error.message
            }

            return 'An error occurred during signup'
        }
    }

    const signIn = async (email:string, password:string)=>{
 try {
            // Sign In User
await account.createEmailPasswordSession( email, password);
const session = await account.get()
setUser(session)
    return null;
        } catch (error) {
            if(error instanceof Error){
                return error.message
            }

            return 'An error occurred during signin'
        }
    }

    const signOut =async ()=>{
        try {
            await account.deleteSession("current")
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }
    return <AuthContext.Provider value={{ isLoadingUser,signIn, signUp, user, signOut}}>{children}</AuthContext.Provider>
}


export function useAuth(){
    const context = useContext(AuthContext)

    if(context === undefined){
        throw new Error('useAuth must be in AuthProvider')
    }

    return context;
}