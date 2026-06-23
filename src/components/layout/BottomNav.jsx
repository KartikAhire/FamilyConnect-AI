import {
  House,
  Map,
  MessageCircle,
  Phone,
  Brain,
  Users
} from "lucide-react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import { motion } from "framer-motion";

function BottomNav() {

  const navigate = useNavigate();

  const location = useLocation();

  const navItems = [

    {
      name: "Home",
      icon: <House size={22} />,
      path: "/home"
    },

    {
      name: "Map",
      icon: <Map size={22} />,
      path: "/map"
    },

    {
      name: "Chat",
      icon: <MessageCircle size={22} />,
      path: "/chat"
    },

    {
      name: "Calls",
      icon: <Phone size={22} />,
      path: "/calls"
    },

    {
      name: "AI",
      icon: <Brain size={22} />,
      path: "/ai"
    },

    {
      name: "Family",
      icon: <Users size={22} />,
      path: "/family"
    }

  ];

  return (

    <div
      className="
        border-t
        border-white/30
        bg-white/80
        backdrop-blur-2xl
        px-2
        py-3
        flex
        justify-around
        items-center
        shadow-[0_-10px_30px_rgba(0,0,0,0.08)]
      "
    >

      {navItems.map((item) => {

        const active =
          location.pathname === item.path;

        return (

          <motion.button

            whileTap={{
              scale: 0.9,
            }}

            whileHover={{
              y: -3,
            }}

            key={item.name}

            onClick={() =>
              navigate(item.path)
            }

            className={`
              relative
              flex
              flex-col
              items-center
              justify-center
              px-3
              py-2
              rounded-2xl
              transition-all
              duration-300
              ${
                active
                  ? `
                    text-purple-600
                    bg-purple-100
                    shadow-lg
                  `
                  : `
                    text-gray-500
                  `
              }
            `}

          >

            {/* Active Glow */}
            {active && (

              <motion.div

                layoutId="active-pill"

                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-purple-100
                  -z-10
                "

                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}

              />

            )}

            <motion.div

              animate={
                active
                  ? {
                      y: [0, -2, 0],
                    }
                  : {}
              }

              transition={{
                duration: 2,
                repeat: Infinity,
              }}

            >

              {item.icon}

            </motion.div>

            <span className="text-[11px] mt-1 font-medium">

              {item.name}

            </span>

          </motion.button>

        );

      })}

    </div>

  );

}

export default BottomNav;