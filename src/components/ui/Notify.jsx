import { motion } from "framer-motion";

function Notify({

  title,

  message,

  type = "info",

}) {

  const colors = {

    success:
      "from-green-500 to-emerald-500",

    danger:
      "from-red-500 to-pink-500",

    warning:
      "from-yellow-500 to-orange-500",

    info:
      "from-purple-500 to-indigo-500",

  };

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: -30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: -30,
      }}

      className={`
        fixed
        top-5
        left-1/2
        -translate-x-1/2
        z-[9999]
        px-6
        py-4
        rounded-3xl
        shadow-2xl
        text-white
        bg-gradient-to-r
        ${colors[type]}
        backdrop-blur-xl
      `}
    >

      <h2 className="font-black text-lg">

        {title}

      </h2>

      <p className="text-sm mt-1 opacity-90">

        {message}

      </p>

    </motion.div>

  );

}

export default Notify;