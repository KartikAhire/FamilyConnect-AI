import { motion } from "framer-motion";

function WeatherCard() {

  return (

    <motion.div

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.5 }}

      className="
        mt-6
        rounded-[30px]
        p-5
        bg-gradient-to-r
        from-blue-500
        via-cyan-500
        to-sky-400
        text-white
        shadow-xl
        overflow-hidden
        relative
      "
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

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              🌦 Weather Safety

            </h2>

            <p className="text-white/80 mt-1 text-sm">

              Nashik • Live Environment

            </p>

          </div>

          <div className="text-5xl">

            ☁️

          </div>

        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">

          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-lg">

            <p className="text-sm text-white/70">

              Temp

            </p>

            <h3 className="text-xl font-bold mt-1">

              32°C

            </h3>

          </div>

          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-lg">

            <p className="text-sm text-white/70">

              AQI

            </p>

            <h3 className="text-xl font-bold mt-1">

              Moderate

            </h3>

          </div>

          <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-lg">

            <p className="text-sm text-white/70">

              Alert

            </p>

            <h3 className="text-xl font-bold mt-1">

              Safe

            </h3>

          </div>

        </div>

      </div>

    </motion.div>

  );

}

export default WeatherCard;