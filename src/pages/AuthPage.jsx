import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

import { motion } from "framer-motion";

function AuthPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLogin, setIsLogin] =
    useState(true);

  const handleAuth = async () => {

    try {

      if (isLogin) {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Login Successful 🚀");

      } else {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert("Account Created 🔥");

      }

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-purple-900
        via-black
        to-blue-900
        p-6
      "
    >

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.8
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        className="
          w-full
          max-w-md
          rounded-[35px]
          p-8
          backdrop-blur-xl
          border
          border-white/20
          shadow-2xl
        "

        style={{

          background:
            "rgba(255,255,255,0.08)"

        }}

      >

        <h1
          className="
            text-4xl
            font-black
            text-center
            text-white
          "
        >

          {isLogin
            ? "Welcome Back"
            : "Create Account"}

        </h1>

        <p
          className="
            text-center
            text-white/60
            mt-3
          "
        >

          AI Family Protection System

        </p>

        <div className="space-y-5 mt-8">

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="
              w-full
              p-4
              rounded-2xl
              bg-white/10
              border
              border-white/20
              text-white
              outline-none
            "

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="
              w-full
              p-4
              rounded-2xl
              bg-white/10
              border
              border-white/20
              text-white
              outline-none
            "

          />

          <motion.button

            whileTap={{
              scale: 0.95
            }}

            onClick={handleAuth}

            className="
              w-full
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-blue-500
              text-white
              font-black
              text-lg
              shadow-2xl
            "

          >

            {isLogin
              ? "Login"
              : "Create Account"}

          </motion.button>

        </div>

        <button

          onClick={() =>
            setIsLogin(!isLogin)
          }

          className="
            mt-6
            text-white/70
            w-full
          "

        >

          {isLogin
            ? "Create new account"
            : "Already have account?"}

        </button>

      </motion.div>

    </div>

  );

}

export default AuthPage;