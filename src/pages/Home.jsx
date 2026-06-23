
import SmartPredictions from "../components/ui/SmartPredictions";
import LiveMapTracking from "../components/ui/LiveMapTracking";
import DarkModeToggle from "../components/ui/DarkModeToggle";
import AIChatScreen from "../components/ui/AIChatScreen";
import LiveUsers from "../components/ui/LiveUsers";
import EmergencyMode from "../components/ui/EmergencyMode";
import VoiceVisualizer from "../components/ui/VoiceVisualizer";
import FloatingAIOrb from "../components/ui/FloatingAIOrb";
import NotificationPopup from "../components/ui/NotificationPopup";
import WeatherCard from "../components/ui/WeatherCard";
import SearchBar from "../components/ui/SearchBar";
import QuickActions from "../components/ui/QuickActions";
import ActivityFeed from "../components/ui/ActivityFeed";

import useStatus from "../hooks/useStatus";

import StatsCard from "../components/ui/StatsCard";
import FeatureCard from "../components/ui/FeatureCard";
import HeroCard from "../components/ui/HeroCard";

import { motion } from "framer-motion";

import BottomNav from "../components/layout/BottomNav";

import { useNavigate } from "react-router-dom";

function Home() {

  const status = useStatus();

  const navigate = useNavigate();

  // AI ANALYTICS

  const safetyScore = 94;

  const dangerLevel = 12;

  const batteryHealth = 82;

  // SMART DASHBOARD CARDS

  const dashboardCards = [

    {
      title: "Family Members",
      value: "6 Online",
      icon: "👨‍👩‍👧‍👦",
      color: "#00d4ff"
    },

    {
      title: "Emergency Alerts",
      value: "2 Active",
      icon: "🚨",
      color: "#ff3b3b"
    },

    {
      title: "Live Locations",
      value: "Tracking Enabled",
      icon: "📍",
      color: "#00ff99"
    },

    {
      title: "AI Assistant",
      value: "Jarvis Active",
      icon: "🤖",
      color: "#8b5cf6"
    }

  ];

  return (

    <>

      <NotificationPopup />

      <FloatingAIOrb />

      <DarkModeToggle />

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        transition={{ duration: 0.8 }}

        className="
          bg-gradient-to-br
          from-purple-100
          via-pink-100
          to-blue-100
          min-h-screen
          flex
          items-center
          justify-center
          p-4
        "

      >

        {/* MOBILE CONTAINER */}

        <div
          className="
            w-[390px]
            h-[844px]
            backdrop-blur-xl
            bg-white/80
            rounded-[35px]
            shadow-2xl
            overflow-hidden
            border
            border-white/40
            flex
            flex-col
          "
        >

          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              px-5
              py-4
              border-b
              border-white/40
              backdrop-blur-md
            "
          >

            <div>

              <h1
                className="
                  text-3xl
                  font-extrabold
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-500
                  bg-clip-text
                  text-transparent
                "
              >

                FamilyConnect

              </h1>

              <p className="text-xs text-gray-500 mt-1">

                AI Family Protection

              </p>

            </div>

            <motion.div

              animate={{
                scale: [1, 1.05, 1],
              }}

              transition={{
                duration: 2,
                repeat: Infinity,
              }}

              className={`
                ${status.color}
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                shadow-lg
              `}

            >

              {status.emoji} {status.text}

            </motion.div>

          </div>

          {/* BODY */}

          <div className="flex-1 overflow-y-auto p-5">

            {/* HERO */}

            <HeroCard />

            {/* SEARCH */}

            <SearchBar />

            {/* WEATHER */}

            <WeatherCard />

            {/* AI DASHBOARD */}

            <motion.div

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              className="
                mt-6
                bg-gradient-to-br
                from-purple-600
                via-fuchsia-500
                to-pink-500
                rounded-[32px]
                p-6
                text-white
                shadow-[0_20px_60px_rgba(168,85,247,0.45)]
              "

            >

              {/* HEADER */}

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-black">

                    🧠 AI Safety Analytics

                  </h2>

                  <p className="text-white/80 mt-1 text-sm">

                    Smart family monitoring active

                  </p>

                </div>

                <motion.div

                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}

                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}

                  className="text-5xl"

                >

                  🤖

                </motion.div>

              </div>

              {/* SCORES */}

              <div className="mt-6 space-y-5">

                {/* SAFETY SCORE */}

                <div>

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">

                      Family Safety Score

                    </span>

                    <span className="font-black">

                      {safetyScore}%

                    </span>

                  </div>

                  <div className="w-full h-4 bg-white/20 rounded-full mt-2 overflow-hidden">

                    <motion.div

                      initial={{
                        width: 0,
                      }}

                      animate={{
                        width:
                          `${safetyScore}%`,
                      }}

                      transition={{
                        duration: 1,
                      }}

                      className="
                        h-full
                        bg-white
                        rounded-full
                      "

                    />

                  </div>

                </div>

                {/* DANGER */}

                <div>

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">

                      Danger Level

                    </span>

                    <span className="font-black">

                      {dangerLevel}%

                    </span>

                  </div>

                  <div className="w-full h-4 bg-white/20 rounded-full mt-2 overflow-hidden">

                    <motion.div

                      initial={{
                        width: 0,
                      }}

                      animate={{
                        width:
                          `${dangerLevel}%`,
                      }}

                      transition={{
                        duration: 1,
                      }}

                      className="
                        h-full
                        bg-red-400
                        rounded-full
                      "

                    />

                  </div>

                </div>

                {/* BATTERY */}

                <div>

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">

                      Family Battery Health

                    </span>

                    <span className="font-black">

                      {batteryHealth}%

                    </span>

                  </div>

                  <div className="w-full h-4 bg-white/20 rounded-full mt-2 overflow-hidden">

                    <motion.div

                      initial={{
                        width: 0,
                      }}

                      animate={{
                        width:
                          `${batteryHealth}%`,
                      }}

                      transition={{
                        duration: 1,
                      }}

                      className="
                        h-full
                        bg-green-400
                        rounded-full
                      "

                    />

                  </div>

                </div>

              </div>

              {/* INSIGHTS */}

              <div className="
                mt-6
                bg-white/15
                rounded-3xl
                p-4
                backdrop-blur-xl
              ">

                <h3 className="font-black text-lg">

                  📊 AI Insights

                </h3>

                <ul className="mt-3 text-sm space-y-2 text-white/90">

                  <li>
                    ✅ All family members safe
                  </li>

                  <li>
                    📍 GPS tracking active
                  </li>

                  <li>
                    🔋 Battery levels stable
                  </li>

                  <li>
                    🚨 No emergency alerts detected
                  </li>

                </ul>

              </div>

            </motion.div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-4 mt-6">

              <StatsCard
                icon="👨‍👩‍👧"
                value="3"
                label="Members"
              />

              <StatsCard
                icon="📍"
                value="2"
                label="Live"
              />

              <StatsCard
                icon="🏠"
                value="1"
                label="Groups"
              />

            </div>

            {/* SMART DASHBOARD */}

            <div
              className="
                grid
                grid-cols-2
                gap-4
                mt-6
              "
            >

              {dashboardCards.map(
                (
                  card,
                  index
                ) => (

                  <motion.div

                    key={index}

                    whileHover={{
                      scale: 1.05
                    }}

                    className="
                      rounded-[28px]
                      p-5
                      text-white
                      backdrop-blur-xl
                      border
                      border-white/20
                    "

                    style={{

                      background:
                        "linear-gradient(135deg, rgba(20,20,35,0.95), rgba(40,40,70,0.85))",

                      boxShadow:
                        `0 0 25px ${card.color}`

                    }}

                  >

                    <div className="text-5xl">

                      {card.icon}

                    </div>

                    <h2
                      className="
                        mt-4
                        text-lg
                        font-black
                        text-white
                      "
                    >

                      {card.title}

                    </h2>

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-white
                          opacity-90
                          font-semibold
                        "
                      >

                        {card.value}

                      </p>

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
                          shadow-lg
                        "

                      />

                    </div>

                  </motion.div>

                )
              )}

            </div>

            {/* QUICK ACTIONS */}

            <QuickActions />

            {/* ACTIVITY */}

            <ActivityFeed />

            <VoiceVisualizer />

            <EmergencyMode />

            <LiveUsers />

            <AIChatScreen />

            <LiveMapTracking />

            <SmartPredictions />

            

            {/* NIGHT SAFETY */}

            <FeatureCard
              title="Night Safety"
              description="Flashlight + emergency visibility mode."
              buttonText="Open"
              bgColor="bg-black"
              textColor="text-white"
              buttonColor="bg-white"
              buttonTextColor="text-black"
              icon="🌙"
              onClick={() => navigate("/night")}
            />

            {/* EMERGENCY */}

            <FeatureCard
              title="Emergency Help"
              description="Quickly contact trusted family members."
              buttonText="Open"
              bgColor="bg-red-500"
              textColor="text-white"
              buttonColor="bg-white"
              buttonTextColor="text-red-600"
              icon="🚨"
              onClick={() => navigate("/familyos")}
            />

            {/* AI */}

            <FeatureCard
              title="AI Safety Active"
              description="Smart monitoring enabled for your family."
              buttonText="Active"
              bgColor="bg-black"
              textColor="text-white"
              buttonColor="bg-white"
              buttonTextColor="text-black"
              icon="🤖"
              onClick={() => navigate("/ai")}
            />

          </div>

          {/* BOTTOM NAV */}

          <BottomNav />

        </div>

      </motion.div>

    </>

  );

}

export default Home;