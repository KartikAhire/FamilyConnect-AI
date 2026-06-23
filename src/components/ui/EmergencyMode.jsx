import { motion } from "framer-motion";

function EmergencyMode() {

  return (

    <motion.div

      animate={{
        boxShadow: [

          "0 0 20px rgba(255,0,0,0.5)",

          "0 0 80px rgba(255,0,0,1)",

          "0 0 20px rgba(255,0,0,0.5)"

        ]

      }}

      transition={{
        duration: 1.5,
        repeat: Infinity
      }}

      className="
        mt-8
        rounded-[32px]
        p-6
        text-white
        overflow-hidden
        relative
      "

      style={{

        background:
          "linear-gradient(135deg, rgba(120,0,0,0.95), rgba(255,0,0,0.8))"

      }}

    >

      {/* ALERT GLOW */}

      <motion.div

        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.4, 0.9, 0.4]
        }}

        transition={{
          duration: 2,
          repeat: Infinity
        }}

        className="
          absolute
          inset-0
          bg-red-500
          rounded-[32px]
        "

      />

      {/* CONTENT */}

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <h2
              className="
                text-3xl
                font-black
              "
            >

              🚨 Emergency Mode

            </h2>

            <p className="mt-2 text-white/80">

              Instant family emergency system ready

            </p>

          </div>

          <motion.div

            animate={{
              rotate: [0, 10, -10, 0]
            }}

            transition={{
              duration: 0.5,
              repeat: Infinity
            }}

            className="text-6xl"

          >

            🚨

          </motion.div>

        </div>

        {/* BUTTONS */}

        <div className="grid grid-cols-2 gap-4 mt-6">

          <button
            className="
              bg-white
              text-red-600
              py-4
              rounded-2xl
              font-black
              shadow-xl
            "
          >

            Call Family

          </button>

          <button
            className="
              bg-black/30
              border
              border-white/30
              text-white
              py-4
              rounded-2xl
              font-black
            "
          >

            Send SOS

          </button>

        </div>

      </div>

    </motion.div>

  );

}

export default EmergencyMode;