import Notify from "../components/ui/Notify";
import { useEffect, useRef, useState } from "react";

import {
  addDoc,
  collection,
  onSnapshot
} from "firebase/firestore";

import { db } from "../firebase";

import {
  motion
} from "framer-motion";

function FamilyOS() {

  const familyId =
    "family123";

  const sosCollection =
    collection(
      db,
      "families",
      familyId,
      "sosAlerts"
    );

  const [alerts,
    setAlerts] =
    useState([]);

  const [voiceText,
    setVoiceText] =
    useState("");

  const [sosActive,
    setSosActive] =
    useState(false);

  const [showNotify, setShowNotify] =
  useState(false);

  const audioRef =
    useRef(null);

  // SEND SOS
  const sendSOS =
    async () => {

      try {

        setSosActive(true);

        setShowNotify(true);

setTimeout(() => {

  setShowNotify(false);

}, 3000);

        // PLAY ALARM
        if (
          audioRef.current
        ) {

          audioRef.current.play();

        }

        // LOCATION
        navigator.geolocation.getCurrentPosition(

          async (
            position
          ) => {

            const newAlert = {

              message:
                "🚨 Emergency Alert!",

              sender:
                "Kartik",

              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude,

              createdAt:
                Date.now(),

            };

            // SAVE FIREBASE
            await addDoc(
              sosCollection,
              newAlert
            );

            // NOTIFICATION
            if (
              Notification.permission ===
              "granted"
            ) {

              new Notification(
                "🚨 Family Emergency Alert",
                {
                  body:
                    "Kartik triggered SOS!",
                }
              );

            }

          

          }

        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Send SOS"
        );

      }

    };

  // VOICE SOS
  const startVoiceSOS =
    async () => {

      try {

        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const SpeechRecognition =

          window.SpeechRecognition ||

          window.webkitSpeechRecognition;

        if (
          !SpeechRecognition
        ) {

          alert(
            "Voice Recognition Not Supported"
          );

          return;

        }

        const recognition =
          new SpeechRecognition();

        recognition.continuous =
          true;

        recognition.interimResults =
          false;

        recognition.lang =
          "en-US";

        recognition.start();

        alert(
          "🎤 Voice SOS Active"
        );

        recognition.onresult =
          (event) => {

            const transcript =

              event.results[
                event.results.length - 1
              ][0].transcript
                .toLowerCase();

            setVoiceText(
              transcript
            );

            console.log(
              transcript
            );

            // SOS WORDS
            if (

              transcript.includes(
                "help"
              ) ||

              transcript.includes(
                "emergency"
              ) ||

              transcript.includes(
                "save me"
              ) ||

              transcript.includes(
                "sos"
              )

            ) {

              sendSOS();

            }

          };

      } catch (error) {

        console.log(error);

        alert(
          "Microphone Permission Denied"
        );

      }

    };

  // REALTIME ALERTS
  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        sosCollection,

        (snapshot) => {

          const alertsData =

            snapshot.docs.map(
              (doc) => ({

                ...doc.data(),

                id: doc.id,

              })
            );

          setAlerts(
            alertsData
          );

        }

      );

    return () =>
      unsubscribe();

  }, []);

  return (

    <div className="bg-gradient-to-br from-red-100 via-black to-red-200 min-h-screen flex items-center justify-center p-4">
      {showNotify && (

  <Notify
    title="🚨 SOS ACTIVE"
    message="Emergency alert sent to family"
    type="danger"
  />

)}

      {/* ALARM */}
      <audio
        ref={audioRef}
        src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
      />

      {/* MOBILE */}
      <div className="w-[390px] h-[844px] bg-white/80 backdrop-blur-xl rounded-[35px] shadow-2xl overflow-hidden flex flex-col border border-white/30">

        {/* HEADER */}
        <div className="p-5 border-b border-white/30">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-black text-red-500">

                SOS Emergency

              </h1>

              <p className="text-gray-500 mt-1">

                AI Family Protection System

              </p>

            </div>

            <motion.div

              animate={{
                scale: [1, 1.1, 1],
              }}

              transition={{
                duration: 1,
                repeat: Infinity,
              }}

              className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded-full
                font-bold
                shadow-lg
              "

            >

              LIVE

            </motion.div>

          </div>

        </div>

        {/* BODY */}
        <div className="p-5">

          {/* SOS BUTTON */}
          <motion.button

            whileTap={{
              scale: 0.95,
            }}

            onClick={sendSOS}

            className={`
              w-full
              py-7
              rounded-[30px]
              text-3xl
              font-black
              shadow-2xl
              transition-all
              ${
                sosActive
                  ? "bg-black text-white"
                  : "bg-red-500 text-white"
              }
            `}

          >

            🚨 SEND SOS

          </motion.button>

          {/* VOICE SOS */}
          <button

            onClick={
              startVoiceSOS
            }

            className="
              w-full
              mt-4
              bg-black
              text-white
              py-5
              rounded-3xl
              text-xl
              font-bold
              shadow-lg
            "

          >

            🎤 START VOICE SOS

          </button>

          {/* HEARD TEXT */}
          <div className="mt-5 bg-black text-white rounded-3xl p-5 shadow-lg">

            <h2 className="font-bold text-lg">

              🎤 AI Listening

            </h2>

            <p className="mt-2 text-gray-300">

              {voiceText ||
                "Waiting for emergency voice..."}

            </p>

          </div>

        </div>

        {/* ALERTS */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-4">

          {alerts.length === 0 ? (

            <div className="text-center text-gray-400 mt-10">

              No Emergency Alerts Yet

            </div>

          ) : (

            alerts.map(
              (alert) => (

                <motion.div

                  initial={{
                    opacity: 0,
                    y: 20,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  key={alert.id}

                  className="
                    bg-red-50
                    border
                    border-red-200
                    rounded-3xl
                    p-5
                    shadow-lg
                  "

                >

                  <h2 className="font-black text-red-600 text-xl">

                    {alert.message}

                  </h2>

                  <p className="text-gray-600 mt-2">

                    👤 {alert.sender}

                  </p>

                  <p className="text-gray-500 text-sm mt-2">

                    📍 {alert.latitude?.toFixed(4)},
                    {" "}
                    {alert.longitude?.toFixed(4)}

                  </p>

                </motion.div>

              )
            )

          )}

        </div>

      </div>

    </div>

  );

}

export default FamilyOS;