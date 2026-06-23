import { useEffect, useRef, useState } from "react";

import {
  Flashlight,
  ShieldAlert,
  Siren,
  Phone,
  Volume2
} from "lucide-react";

import { motion } from "framer-motion";

function NightSafety() {

  const [blink, setBlink] =
    useState(false);

  const [sosMode, setSosMode] =
    useState(false);

  const audioRef =
    useRef(null);

  // RED EMERGENCY BLINK
  useEffect(() => {

    const interval =
      setInterval(() => {

        setBlink(
          (prev) => !prev
        );

      }, 600);

    return () =>
      clearInterval(interval);

  }, []);

  // FLASHLIGHT
  const startFlashlight =
    async () => {

      try {

        const stream =

          await navigator.mediaDevices.getUserMedia({

            video: {
              facingMode:
                "environment",
            },

          });

        const track =
          stream.getVideoTracks()[0];

        const capabilities =
          track.getCapabilities();

        if (
          capabilities.torch
        ) {

          await track.applyConstraints({

            advanced: [
              { torch: true },
            ],

          });

          alert(
            "🔦 Flashlight Enabled"
          );

        } else {

          alert(
            "Torch Not Supported"
          );

        }

      } catch (error) {

        console.log(error);

        alert(
          "Flashlight Access Failed"
        );

      }

    };

  // SOS MODE
  const activateSOS =
    () => {

      setSosMode(true);

      // VIBRATION
      if (
        navigator.vibrate
      ) {

        navigator.vibrate([
          500,
          300,
          500,
        ]);

      }

      // SOUND
      if (
        audioRef.current
      ) {

        audioRef.current.play();

      }

      // ALERT
      alert(
        "🚨 SOS MODE ACTIVATED"
      );

    };

  return (

    <div

      className={`
        min-h-screen
        flex
        items-center
        justify-center
        p-4
        transition-all
        duration-500
        ${
          blink
            ? "bg-red-600"
            : "bg-black"
        }
      `}

    >

      {/* ALARM AUDIO */}
      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      />

      {/* MOBILE CONTAINER */}
      <div
        className="
          w-[390px]
          h-[844px]
          rounded-[40px]
          overflow-hidden
          flex
          flex-col
          items-center
          justify-center
          text-white
          p-6
          relative
          border
          border-white/10
          backdrop-blur-xl
        "
      >

        {/* GLOW */}
        <div className="absolute top-[-100px] right-[-100px] w-72 h-72 bg-red-500/20 rounded-full blur-3xl" />

        <div className="absolute bottom-[-100px] left-[-100px] w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />

        {/* ICON */}
        <motion.div

          animate={{
            scale: [1, 1.1, 1],
          }}

          transition={{
            duration: 1,
            repeat: Infinity,
          }}

          className="
            text-8xl
            z-10
          "

        >

          🚨

        </motion.div>

        {/* TITLE */}
        <h1
          className="
            text-5xl
            font-black
            mt-8
            text-center
            z-10
          "
        >

          NIGHT SAFETY

        </h1>

        <p
          className="
            text-center
            text-gray-200
            mt-6
            leading-relaxed
            z-10
            max-w-[280px]
          "
        >

          Emergency visibility mode with
          flashing alerts, SOS system,
          loud alarm, flashlight,
          and emergency tools.

        </p>

        {/* BUTTONS */}
        <div className="w-full mt-10 space-y-4 z-10">

          {/* FLASHLIGHT */}
          <motion.button

            whileTap={{
              scale: 0.95,
            }}

            onClick={
              startFlashlight
            }

            className="
              w-full
              bg-white
              text-black
              py-5
              rounded-3xl
              text-xl
              font-black
              shadow-2xl
              flex
              items-center
              justify-center
              gap-3
            "

          >

            <Flashlight size={28} />

            START FLASHLIGHT

          </motion.button>

          {/* SOS */}
          <motion.button

            whileTap={{
              scale: 0.95,
            }}

            onClick={
              activateSOS
            }

            className={`
              w-full
              py-5
              rounded-3xl
              text-xl
              font-black
              shadow-2xl
              flex
              items-center
              justify-center
              gap-3
              ${
                sosMode
                  ? "bg-red-700"
                  : "bg-red-500"
              }
            `}

          >

            <ShieldAlert size={28} />

            {sosMode
              ? "SOS ACTIVE"
              : "ACTIVATE SOS"}

          </motion.button>

          {/* ALARM */}
          <motion.button

            whileTap={{
              scale: 0.95,
            }}

            onClick={() => {

              if (
                audioRef.current
              ) {

                audioRef.current.play();

              }

            }}

            className="
              w-full
              bg-yellow-400
              text-black
              py-5
              rounded-3xl
              text-xl
              font-black
              shadow-2xl
              flex
              items-center
              justify-center
              gap-3
            "

          >

            <Volume2 size={28} />

            PLAY ALARM

          </motion.button>

          {/* EMERGENCY CALL */}
          <motion.a

            whileTap={{
              scale: 0.95,
            }}

            href="tel:112"

            className="
              w-full
              bg-green-500
              text-white
              py-5
              rounded-3xl
              text-xl
              font-black
              shadow-2xl
              flex
              items-center
              justify-center
              gap-3
            "

          >

            <Phone size={28} />

            CALL EMERGENCY

          </motion.a>

        </div>

        {/* STATUS */}
        <div className="mt-8 text-sm text-white/70 z-10">

          🛡 AI Safety Protection Active

        </div>

      </div>

    </div>

  );

}

export default NightSafety;