import { useEffect, useState } from 'react'
import { ToastContainer } from "react-toastify";

import './App.css'
import HomeView from './view/HomeView'

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
 // Load saved theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  return (
    <>
       <HomeView darkMode={darkMode} setDarkMode={setDarkMode} />
         <ToastContainer position="top-right" autoClose={3000} 
          toastStyle={{
    background: darkMode ? "#1e293b" : "#e0f2fe",
    color: darkMode ? "#ffffff" : "#0f172a",
  }}/>
</>
  )
}

export default App
