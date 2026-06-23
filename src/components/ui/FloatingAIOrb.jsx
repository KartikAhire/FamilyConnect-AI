import { motion } from "framer-motion";

function FloatingAIOrb() {

  return (

    <motion.div

      initial={{
        scale: 0
      }}

      animate={{

        scale: 1,

        y: [0, -10, 0],

        boxShadow: [

          "0 0 20px #3b82f6",

          "0 0 50px #8b5cf6",

          "0 0 20px #3b82f6"

        ]

      }}

      transition={{

        duration: 3,

        repeat: Infinity

      }}

      whileTap={{
        scale: 0.9
      }}

      className="
        fixed
        bottom-8
        right-8
        w-20
        h-20
        rounded-full
        z-50
        flex
        items-center
        justify-center
        cursor-pointer
        backdrop-blur-xl
        border
        border-white/30
      "

      style={{

        background:
          "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(139,92,246,0.95))"

      }}

    >

      <motion.div

        animate={{
          rotate: 360
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}

        className="
          absolute
          inset-2
          rounded-full
          border-2
          border-dashed
          border-white/40
        "
      />

      <div className="text-4xl">

        🤖

      </div>

    </motion.div>

  );

}

export default FloatingAIOrb;