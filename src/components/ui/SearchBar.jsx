import { Search } from "lucide-react";

import { motion } from "framer-motion";

function SearchBar() {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.4,
      }}

      className="
        mt-6
        bg-white/80
        backdrop-blur-xl
        border
        border-white/40
        rounded-3xl
        px-5
        py-4
        shadow-lg
        flex
        items-center
        gap-3
      "
    >

      <Search
        size={22}
        className="text-gray-400"
      />

      <input
        type="text"
        placeholder="Search family activity..."
        className="
          bg-transparent
          outline-none
          flex-1
          text-gray-700
          placeholder:text-gray-400
        "
      />

    </motion.div>

  );

}

export default SearchBar;