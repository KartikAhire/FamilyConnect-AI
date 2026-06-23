import { motion } from "framer-motion";

function SmartPredictions() {

  const predictions = [

    {
      title: "Heavy rain detected nearby",
      level: "Medium Risk",
      icon: "🌧️",
      color: "#3b82f6"
    },

    {
      title: "Brother battery critical",
      level: "High Risk",
      icon: "🔋",
      color: "#ff3b3b"
    },

    {
      title: "Night safety recommended",
      level: "AI Suggestion",
      icon: "🌙",
      color: "#8b5cf6"
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

          Smart AI Predictions

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
            bg-purple-600
            text-white
            text-sm
            font-bold
          "

        >

          AI ACTIVE

        </motion.div>

      </div>

      {/* CARDS */}

      <div className="space-y-4 mt-5">

        {predictions.map(
          (
            item,
            index
          ) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                x: -30
              }}

              animate={{
                opacity: 1,
                x: 0
              }}

              transition={{
                delay: index * 0.2
              }}

              className="
                rounded-[30px]
                p-5
                text-white
                border
                border-white/20
                backdrop-blur-xl
              "

              style={{

                background:
                  "linear-gradient(135deg, rgba(20,20,35,0.95), rgba(40,40,70,0.85))",

                boxShadow:
                  `0 0 25px ${item.color}`

              }}

            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="text-4xl">

                    {item.icon}

                  </div>

                  <div>

                    <h3
                      className="
                        text-lg
                        font-black
                      "
                    >

                      {item.title}

                    </h3>

                    <p
                      className="
                        text-white/70
                        mt-1
                      "
                    >

                      {item.level}

                    </p>

                  </div>

                </div>

                <motion.div

                  animate={{
                    scale: [1, 1.4, 1]
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
                    background: item.color
                  }}

                />

              </div>

            </motion.div>

          )
        )}

      </div>

    </div>

  );

}

export default SmartPredictions;