import { useEffect, useState } from "react";
import SplashScreen from "./components/common/SplashScreen";
import Login from "./pages/Login";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 detik splash
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <Login />; 
}
