import useLiveTime from "../../hooks/useLiveTime";
import useGreeting from "../../hooks/useGreeting";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function HeroCard() {

  const liveTime = useLiveTime();
  const greeting = useGreeting();

  const navigate = useNavigate();

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

      className="
        relative
        overflow-hidden
        rounded-[36px]
        p-7
        text-white
        shadow-[0_20px_60px_rgba(168,85,247,0.45)]
        border
        border-white/20
        backdrop-blur-2xl
        bg-gradient-to-br
        from-purple-600
        via-fuchsia-500
        to-pink-500
      "
    >

      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10">

        <p className="text-sm text-white/80 font-medium">
          {greeting} 👋
        </p>

        <p className="text-xs text-white/70 mt-1">
          {liveTime}
        </p>

        <div className="flex items-center gap-4 mt-5">

          <motion.div
            animate={{
              y: [0, -5, 0],
            }}

            transition={{
              duration: 2,
              repeat: Infinity,
            }}

            className="text-6xl"
          >

            👨‍👩‍👧‍👦

          </motion.div>

          <div>

            <h1 className="text-4xl font-black leading-tight">

              Family
              <br />
              Connected

            </h1>

            <p className="text-white/80 mt-2 text-sm">

              AI Guardian Active

            </p>

          </div>

        </div>

        <div className="flex gap-3 mt-7">

          <motion.button

            whileTap={{ scale: 0.95 }}

            whileHover={{ scale: 1.03 }}

            onClick={() => navigate("/map")}

            className="
              bg-white
              text-purple-700
              font-bold
              px-6
              py-3
              rounded-2xl
              shadow-xl
            "
          >

            📍 Live Map

          </motion.button>

          <motion.button

            whileTap={{ scale: 0.95 }}

            whileHover={{ scale: 1.03 }}

            onClick={() => navigate("/familyos")}

            className="
              border
              border-white/40
              bg-white/10
              backdrop-blur-lg
              px-6
              py-3
              rounded-2xl
              font-semibold
            "
          >

            🧠 AI OS

          </motion.button>

        </div>

      </div>

    </motion.div>

  );

}

export default HeroCard;