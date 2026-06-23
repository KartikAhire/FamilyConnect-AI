import { motion } from "framer-motion";
import { useState } from "react";

function DarkModeToggle() {

  const [darkMode, setDarkMode] =
    useState(false);

  return (

    <motion.button

      whileTap={{
        scale: 0.9
      }}

      onClick={() =>
        setDarkMode(!darkMode)
      }

      className="
        fixed
        top-6
        left-6
        z-50
        px-5
        py-3
        rounded-full
        text-white
        font-bold
        shadow-2xl
        backdrop-blur-xl
        border
        border-white/20
      "

      style={{

        background:
          darkMode

            ? "linear-gradient(135deg, #111827, #000000)"

            : "linear-gradient(135deg, #7c3aed, #3b82f6)"

      }}

    >

      {darkMode

        ? "🌙 Dark AI"

        : "☀️ Light AI"}

    </motion.button>

  );

}

export default DarkModeToggle;