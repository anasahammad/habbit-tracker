import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useAuthGuard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Your authentication check logic here
        // const token = await getAuthToken();
        const isAuthenticated = false; // Replace with actual check
        
        setIsAuth(isAuthenticated);
        
        if (!isAuthenticated) {
          router.replace("/auth");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuth(false);
        router.replace("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { isAuth, isLoading };
}