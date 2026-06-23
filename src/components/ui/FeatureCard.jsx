import { motion } from "framer-motion";

function FeatureCard({

  title,
  description,
  buttonText,
  bgColor,
  textColor,
  buttonColor,
  buttonTextColor,
  icon,
  onClick,

}) {

  return (

    <motion.div

      whileHover={{
        scale: 1.03,
        y: -5,
      }}

      transition={{
        duration: 0.3,
      }}

      className={`
        mt-6
        ${bgColor}
        ${textColor}
        rounded-[32px]
        p-6
        shadow-2xl
        relative
        overflow-hidden
      `}

    >

      {/* Glow */}
      <div
        className="
          absolute
          top-0
          right-0
          w-32
          h-32
          bg-white/10
          rounded-full
          blur-3xl
        "
      />

      <div className="relative z-10 flex items-center justify-between">

        <div>

          <motion.h2

            animate={{
              y: [0, -2, 0],
            }}

            transition={{
              duration: 2,
              repeat: Infinity,
            }}

            className="text-4xl font-black"

          >

            {icon}

          </motion.h2>

          <h3 className="text-3xl font-extrabold mt-2">
            {title}
          </h3>

          <p className="mt-3 text-sm opacity-90 leading-relaxed max-w-[220px]">
            {description}
          </p>

        </div>

        <motion.button

          whileTap={{
            scale: 0.95,
          }}

          onClick={onClick}

          className={`
            ${buttonColor}
            ${buttonTextColor}
            px-6
            py-4
            rounded-2xl
            font-bold
            shadow-xl
          `}

        >

          {buttonText}

        </motion.button>

      </div>

    </motion.div>

  );

}

export default FeatureCard;