import { motion } from "framer-motion";

function ActivityFeed() {

  const activities = [

    {
      icon: "📍",
      title: "Mom reached home",
      time: "2 min ago",
      color: "#00ff99"
    },

    {
      icon: "🔋",
      title: "Brother battery low",
      time: "5 min ago",
      color: "#ffcc00"
    },

    {
      icon: "💬",
      title: "Family chat active",
      time: "8 min ago",
      color: "#00d4ff"
    },

    {
      icon: "🚨",
      title: "Emergency system ready",
      time: "10 min ago",
      color: "#ff3b3b"
    }

  ];

  return (

    <div className="mt-8">

      <h2
        className="
          text-2xl
          font-black
          text-gray-800
          mb-4
        "
      >

        Live Activity

      </h2>

      <div className="space-y-4">

        {activities.map(
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
                flex
                items-center
                justify-between
                p-4
                rounded-[24px]
                backdrop-blur-xl
                border
                border-white/20
              "

              style={{

                background:
                  "linear-gradient(135deg, rgba(20,20,35,0.92), rgba(40,40,70,0.85))",

                boxShadow:
                  `0 0 20px ${item.color}`

              }}

            >

              <div className="flex items-center gap-4">

                <div className="text-3xl">

                  {item.icon}

                </div>

                <div>

                  <h3
                    className="
                      text-white
                      font-bold
                    "
                  >

                    {item.title}

                  </h3>

                  <p
                    className="
                      text-white/70
                      text-sm
                      mt-1
                    "
                  >

                    {item.time}

                  </p>

                </div>

              </div>

              <motion.div

                animate={{
                  scale: [1, 1.3, 1]
                }}

                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}

                className="
                  w-3
                  h-3
                  rounded-full
                  bg-green-400
                "

              />

            </motion.div>

          )
        )}

      </div>

    </div>

  );

}

export default ActivityFeed;