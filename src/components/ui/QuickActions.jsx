import {

  MapPin,
  MessageCircle,
  Phone,
  Brain,
  ShieldAlert,
  Users,

} from "lucide-react";

import {

  useNavigate,

} from "react-router-dom";

import {

  motion,

} from "framer-motion";

function QuickActions() {

  const navigate =
    useNavigate();

  const actions = [

    {
      title: "Map",
      icon: <MapPin size={28} />,
      path: "/map",
      color: "from-blue-500 to-cyan-400",
    },

    {
      title: "Chat",
      icon: <MessageCircle size={28} />,
      path: "/chat",
      color: "from-purple-500 to-fuchsia-500",
    },

    {
      title: "Calls",
      icon: <Phone size={28} />,
      path: "/calls",
      color: "from-green-500 to-emerald-400",
    },

    {
      title: "AI",
      icon: <Brain size={28} />,
      path: "/ai",
      color: "from-pink-500 to-rose-500",
    },

    {
      title: "SOS",
      icon: <ShieldAlert size={28} />,
      path: "/familyos",
      color: "from-red-500 to-orange-400",
    },

    {
      title: "Family",
      icon: <Users size={28} />,
      path: "/family",
      color: "from-indigo-500 to-violet-500",
    },

  ];

  return (

    <div className="mt-6">

      <h2 className="text-2xl font-extrabold text-gray-800 mb-4">

        Quick Actions

      </h2>

      <div className="grid grid-cols-3 gap-4">

        {actions.map((item, index) => (

          <motion.button

            key={index}

            whileHover={{
              scale: 1.05,
              y: -5,
            }}

            whileTap={{
              scale: 0.95,
            }}

            onClick={() =>
              navigate(item.path)
            }

            className={`
              bg-gradient-to-br
              ${item.color}
              rounded-[28px]
              p-5
              text-white
              shadow-xl
              flex
              flex-col
              items-center
              justify-center
              gap-3
              min-h-[120px]
            `}
          >

            {item.icon}

            <span className="font-bold text-sm">

              {item.title}

            </span>

          </motion.button>

        ))}

      </div>

    </div>

  );

}

export default QuickActions;