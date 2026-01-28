import { useEffect, useState } from 'react'

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
       <HomeView darkMode={darkMode} setDarkMode={setDarkMode} />

  )
}

export default App
