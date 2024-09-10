"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

type Theme = "light" | "dark";

function ThemeSwithButton() {
  const [theme, setTheme] = useState<Theme>("light"); // def value is set to light
  console.log(theme);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Theme;
    if (localTheme) {
      setTheme(localTheme);
      if (localTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <button
      className="fixed bottom-8 right-20     
     bg-white w-[3rem] h-[3rem] flex justify-center items-center bg-opacity-80 backdrop-blur-[0.5rem]
     border border-white border-opacity-40 rounded-full shadow-2xl hover:scale-[1.15] active:scale-105
        transition-transform duration-200 ease-in-out z-50
      "
    >
      {theme === "light" ? (
        <BsSun className="text-2xl  text-red-500 " onClick={toggleTheme} />
      ) : (
        <BsMoon className="text-2xl text-gray-800" onClick={toggleTheme} />
      )}
    </button>
  );
}

export default ThemeSwithButton;
