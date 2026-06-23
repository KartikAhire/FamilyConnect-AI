import { motion } from "framer-motion";

function AIChatScreen() {

  const messages = [

    {
      sender: "AI",
      text: "Hello 👋 Family systems are active."
    },

    {
      sender: "USER",
      text: "Any safety alerts today?"
    },

    {
      sender: "AI",
      text: "No major alerts detected. All members are safe ✅"
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

          AI Assistant

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

          ACTIVE

        </motion.div>

      </div>

      {/* CHAT BOX */}

      <div
        className="
          mt-5
          p-5
          rounded-[32px]
          backdrop-blur-xl
          border
          border-white/20
          space-y-4
        "

        style={{

          background:
            "linear-gradient(135deg, rgba(20,20,35,0.95), rgba(40,40,70,0.85))"

        }}

      >

        {messages.map(
          (
            msg,
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
                delay: index * 0.3
              }}

              className={`
                flex
                ${msg.sender === "AI"
                  ? "justify-start"
                  : "justify-end"}
              `}

            >

              <div

                className={`
                  max-w-[80%]
                  px-5
                  py-4
                  rounded-3xl
                  text-white
                  shadow-xl

                  ${msg.sender === "AI"
                    ? "bg-purple-600"
                    : "bg-blue-500"}
                `}

              >

                <p className="font-semibold">

                  {msg.text}

                </p>

              </div>

            </motion.div>

          )
        )}

        {/* INPUT */}

        <div className="flex items-center gap-3 pt-4">

          <input

            type="text"

            placeholder="Ask AI anything..."

            className="
              flex-1
              bg-white/10
              border
              border-white/20
              rounded-2xl
              px-5
              py-4
              text-white
              outline-none
              placeholder:text-white/50
            "

          />

          <motion.button

            whileTap={{
              scale: 0.9
            }}

            className="
              w-14
              h-14
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              text-white
              text-2xl
              shadow-xl
            "

          >

            🚀

          </motion.button>

        </div>

      </div>

    </div>

  );

}

export default AIChatScreen;