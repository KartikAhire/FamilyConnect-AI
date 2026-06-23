import { motion } from "framer-motion";

function LiveUsers() {

  const users = [

    {
      name: "Mom",
      status: "Online",
      battery: "92%",
      color: "#00ff99"
    },

    {
      name: "Brother",
      status: "Low Battery",
      battery: "18%",
      color: "#ffcc00"
    },

    {
      name: "Dad",
      status: "Offline",
      battery: "0%",
      color: "#ff3b3b"
    }

  ];

  return (

    <div className="mt-8">

      <div className="flex items-center justify-between">

        <h2
          className="
            text-2xl
            font-black
            text-gray-800
          "
        >

          Live Family Status

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
            bg-green-500
            text-white
            text-sm
            font-bold
          "

        >

          LIVE

        </motion.div>

      </div>

      <div className="space-y-4 mt-5">

        {users.map(
          (
            user,
            index
          ) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                delay: index * 0.2
              }}

              className="
                flex
                items-center
                justify-between
                p-5
                rounded-[28px]
                backdrop-blur-xl
                border
                border-white/20
              "

              style={{

                background:
                  "linear-gradient(135deg, rgba(20,20,35,0.95), rgba(40,40,70,0.85))",

                boxShadow:
                  `0 0 25px ${user.color}`

              }}

            >

              <div className="flex items-center gap-4">

                <motion.div

                  animate={{
                    scale: [1, 1.3, 1]
                  }}

                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}

                  className="
                    w-4
                    h-4
                    rounded-full
                  "

                  style={{
                    background: user.color
                  }}

                />

                <div>

                  <h3
                    className="
                      text-white
                      font-black
                    "
                  >

                    {user.name}

                  </h3>

                  <p
                    className="
                      text-white/70
                      text-sm
                      mt-1
                    "
                  >

                    {user.status}

                  </p>

                </div>

              </div>

              <div
                className="
                  text-white
                  font-black
                  text-lg
                "
              >

                {user.battery}

              </div>

            </motion.div>

          )
        )}

      </div>

    </div>

  );

}

export default LiveUsers;