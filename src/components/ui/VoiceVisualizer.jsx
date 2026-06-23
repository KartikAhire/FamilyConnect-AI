import { motion } from "framer-motion";

function VoiceVisualizer() {

  const bars = [1, 2, 3, 4, 5, 6, 7];

  return (

    <div
      className="
        flex
        items-end
        justify-center
        gap-2
        mt-6
      "
    >

      {bars.map((bar, index) => (

        <motion.div

          key={index}

          animate={{

            height: [

              20,

              60,

              30,

              80,

              40,

              20

            ]

          }}

          transition={{

            duration: 1,

            repeat: Infinity,

            delay: index * 0.1

          }}

          className="
            w-3
            rounded-full
            bg-gradient-to-t
            from-blue-500
            to-purple-500
            shadow-lg
          "

        />

      ))}

    </div>

  );

}

export default VoiceVisualizer;