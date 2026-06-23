import { motion } from "framer-motion";

function NotificationPopup() {

  const notifications = [

    {
      title: "Mom reached home",
      icon: "🏠",
      color: "#00ff99"
    },

    {
      title: "Battery low detected",
      icon: "🔋",
      color: "#ffcc00"
    },

    {
      title: "New family message",
      icon: "💬",
      color: "#00d4ff"
    }

  ];

  return (

    <div
      className="
        fixed
        top-5
        right-5
        z-50
        space-y-4
      "
    >

      {notifications.map(
        (
          item,
          index
        ) => (

          <motion.div

            key={index}

            initial={{
              opacity: 0,
              x: 100
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              delay: index * 0.4
            }}

            className="
              px-5
              py-4
              rounded-2xl
              text-white
              flex
              items-center
              gap-4
              backdrop-blur-xl
              border
              border-white/20
              shadow-2xl
            "

            style={{

              background:
                "linear-gradient(135deg, rgba(20,20,35,0.96), rgba(40,40,70,0.92))",

              boxShadow:
                `0 0 25px ${item.color}`

            }}

          >

            <div className="text-3xl">

              {item.icon}

            </div>

            <div>

              <h3 className="font-bold">

                {item.title}

              </h3>

              <p className="text-xs text-white/70">

                Live Notification

              </p>

            </div>

          </motion.div>

        )
      )}

    </div>

  );

}

export default NotificationPopup;