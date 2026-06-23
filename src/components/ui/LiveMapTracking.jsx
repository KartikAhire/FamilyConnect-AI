import { motion } from "framer-motion";

function LiveMapTracking() {

  const members = [

    {
      name: "Mom",
      top: "25%",
      left: "30%",
      color: "#00ff99"
    },

    {
      name: "Brother",
      top: "55%",
      left: "65%",
      color: "#3b82f6"
    },

    {
      name: "Dad",
      top: "70%",
      left: "40%",
      color: "#ff3b3b"
    }

  ];

  return (

    <div className="mt-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <h2
          className="
            text-2xl
            font-black
            text-gray-800
          "
        >

          Live Tracking

        </h2>

        <motion.div

          animate={{
            scale: [1, 1.2, 1]
          }}

          transition={{
            duration: 1.5,
            repeat: Infinity
          }}

          className="
            px-4
            py-2
            rounded-full
            bg-blue-500
            text-white
            text-sm
            font-bold
          "

        >

          GPS LIVE

        </motion.div>

      </div>

      {/* MAP */}

      <div
        className="
          relative
          mt-5
          h-[350px]
          rounded-[32px]
          overflow-hidden
          border
          border-white/20
          backdrop-blur-xl
        "

        style={{

          background:
            "linear-gradient(135deg, rgba(20,20,35,0.95), rgba(40,40,70,0.85))"

        }}

      >

        {/* GRID EFFECT */}

        <div
          className="
            absolute
            inset-0
            opacity-20
          "
          style={{

            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",

            backgroundSize:
              "40px 40px"

          }}
        />

        {/* MEMBERS */}

        {members.map(
          (
            member,
            index
          ) => (

            <motion.div

              key={index}

              animate={{
                scale: [1, 1.3, 1]
              }}

              transition={{
                duration: 2,
                repeat: Infinity
              }}

              className="
                absolute
                flex
                flex-col
                items-center
              "

              style={{
                top: member.top,
                left: member.left
              }}

            >

              <motion.div

                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0.1, 0.5]
                }}

                transition={{
                  duration: 2,
                  repeat: Infinity
                }}

                className="
                  absolute
                  w-14
                  h-14
                  rounded-full
                "

                style={{
                  background: member.color
                }}

              />

              <div
                className="
                  relative
                  z-10
                  w-6
                  h-6
                  rounded-full
                  border-4
                  border-white
                "

                style={{
                  background: member.color
                }}

              />

              <p
                className="
                  text-white
                  text-sm
                  mt-2
                  font-bold
                "
              >

                {member.name}

              </p>

            </motion.div>

          )
        )}

      </div>

    </div>

  );

}

export default LiveMapTracking;