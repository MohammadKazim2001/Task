import { useState, useEffect } from "react";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import "./styles/global.scss";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // بررسی وجود کاربر در localStorage
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (data) => {
    setUserData(data);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <>
      <ThemeToggle />
      {isLoggedIn ? (
        <Profile userData={userData} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
