import { motion } from "framer-motion";

function StatsCard({

  icon,
  value,
  label,

}) {

  return (

    <motion.div

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      whileHover={{
        scale: 1.05,
      }}

      className="
        bg-white/70
        backdrop-blur-lg
        border
        border-white/40
        rounded-3xl
        p-4
        text-center
        shadow-lg
      "
    >

      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="text-3xl font-extrabold text-purple-600 mt-2">
        {value}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {label}
      </p>

    </motion.div>

  );

}

export default StatsCard;