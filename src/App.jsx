import JoinFamily from "./pages/JoinFamily";
import VoiceCall from "./pages/VoiceCall";
// import VideoCall from "./pages/VideoCall";
import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import Home from "./pages/Home";

import FamilyMap from "./pages/FamilyMap";

import FamilyChat from "./pages/FamilyChat";

import FamilyCalls from "./pages/FamilyCalls";

import FamilyOS from "./pages/FamilyOS";

import FamilyMembers from "./pages/FamilyMembers";

import Login from "./pages/Login";

import AIAssistant from "./pages/AIAssistant";

import NightSafety from "./pages/NightSafety";

import EmergencyContacts from "./pages/EmergencyContacts";



function App() {

  const navigate =
    useNavigate();

  const recognitionRef =
    useRef(null);

  const startedRef =
    useRef(false);

  const cooldownRef =
    useRef(false);

  const lastCommandRef =
    useRef("");

  const [orbActive,
    setOrbActive] =
    useState(false);

  // =========================
  // SPEAK FUNCTION
  // =========================

  const speak =
    (text) => {

      if (!text) return;

      // STOP OLD SPEECH

      window.speechSynthesis.cancel();

      const utterance =

        new SpeechSynthesisUtterance(
          text
        );

      utterance.lang =
        "en-US";

      utterance.rate =
        1;

      utterance.pitch =
        1;

      utterance.volume =
        1;

      utterance.onstart =
        () => {

          setOrbActive(true);

        };

      utterance.onend =
        () => {

          setOrbActive(false);

        };

      window.speechSynthesis.speak(
        utterance
      );

    };

  // =========================
  // SIMPLE AI
  // =========================

  const askJarvis =
    async (message) => {

      // ONLY ANSWER REAL QUESTIONS

      if (
        message.includes(
          "motivation"
        )
      ) {

        speak(
          "Stay consistent and improve every day."
        );

      }

      else if (
        message.includes(
          "coding"
        )
      ) {

        speak(
          "Practice DSA daily and build projects."
        );

      }

      else if (
        message.includes(
          "future"
        )
      ) {

        speak(
          "You can add offline AI and face recognition."
        );

      }

      else if (
        message.includes(
          "life"
        )
      ) {

        speak(
          "Focus on discipline and consistency."
        );

      }

      else if (
        message.includes(
          "app"
        )
      ) {

        speak(
          "This app is an AI powered family safety assistant."
        );

      }

    };

  // =========================
  // MAIN EFFECT
  // =========================

  useEffect(() => {

    if (
      startedRef.current
    )
      return;

    startedRef.current =
      true;

    const SpeechRecognition =

      window.SpeechRecognition ||

      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition Not Supported"
      );

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognitionRef.current =
      recognition;

    recognition.continuous =
      true;

    recognition.interimResults =
      false;

    recognition.continuous =
  false;

    recognition.lang =
      "en-US";

    recognition.maxAlternatives =
      1;

    // =========================
    // NAVIGATION
    // =========================

    const navigateVoice =
      (
        path,
        voice
      ) => {

        if (
          cooldownRef.current
        )
          return;

        cooldownRef.current =
          true;

        navigate(path);

        speak(voice);

        setTimeout(() => {

          cooldownRef.current =
            false;

        }, 2000);

      };

    // =========================
    // COMMAND HANDLER
    // =========================

    const handleCommand =
      async (
        transcript
      ) => {

        transcript =
          transcript
            .toLowerCase()
            .trim();

        console.log(
          "Voice:",
          transcript
        );

        // REMOVE JARVIS WORD

        if (
          transcript.startsWith(
            "jarvis"
          )
        ) {

          transcript =
            transcript.replace(
              "jarvis",
              ""
            ).trim();

        }

        // EMPTY CHECK

        if (
          !transcript ||
          transcript.length < 2
        ) {

          return;

        }

        // BLOCK SAME COMMAND

        if (
          transcript ===
          lastCommandRef.current
        ) {

          return;

        }

        lastCommandRef.current =
          transcript;

        setTimeout(() => {

          lastCommandRef.current =
            "";

        }, 4000);

        // =========================
        // MAP
        // =========================

        if (

          transcript.includes(
            "open map"
          ) ||

          transcript ===
            "map"

        ) {

          navigateVoice(
            "/map",
            "Opening Map"
          );

          return;

        }

        // =========================
        // CHAT
        // =========================

        if (

          transcript.includes(
            "open chat"
          ) ||

          transcript ===
            "chat"

        ) {

          navigateVoice(
            "/chat",
            "Opening Chat"
          );

          return;

        }

        // =========================
        // HOME
        // =========================

        if (

          transcript.includes(
            "open home"
          ) ||

          transcript ===
            "home"

        ) {

          navigateVoice(
            "/home",
            "Opening Home"
          );

          return;

        }

        // =========================
        // CALLS
        // =========================

        if (

          transcript.includes(
            "open calls"
          ) ||

          transcript.includes(
            "call"
          )

        ) {

          navigateVoice(
            "/calls",
            "Opening Calls"
          );

          return;

        }

        // =========================
        // FAMILY
        // =========================

        if (

          transcript.includes(
            "family"
          ) ||

          transcript.includes(
            "members"
          )

        ) {

          navigateVoice(
            "/family",
            "Opening Family Members"
          );

          return;

        }

        // =========================
        // NIGHT
        // =========================

        if (

          transcript.includes(
            "night"
          ) ||

          transcript.includes(
            "safety"
          )

        ) {

          navigateVoice(
            "/night",
            "Opening Night Safety"
          );

          return;

        }

        // =========================
        // SOS
        // =========================

        if (

          transcript.includes(
            "sos"
          ) ||

          transcript.includes(
            "emergency"
          ) ||

          transcript.includes(
            "help"
          )

        ) {

          navigateVoice(
            "/familyos",
            "Emergency Activated"
          );

          return;

        }

        // =========================
        // AI QUESTIONS
        // =========================

        await askJarvis(
          transcript
        );

      };

    // =========================
    // RESULT
    // =========================

    recognition.onresult =
      async (event) => {

        const transcript =

          event.results[
            event.results.length - 1
          ][0].transcript;

        await handleCommand(
          transcript
        );

      };

    // =========================
    // ERROR
    // =========================

    recognition.onerror =
      (event) => {

        console.log(
          "Voice Error:",
          event.error
        );

      };

    // =========================
    // AUTO RESTART
    // =========================

    recognition.onend = () => {

console.log(
"Voice stopped"
);

};

    // =========================
    // START
    // =========================

    console.log(
"Jarvis Ready"
);

    // CLEANUP

    return () => {

      try {

        recognition.stop();

      } catch (err) {}

    };

  }, [navigate]);

  // =========================
  // UI
  // =========================

  return (

    <>

      <div
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          width: "75px",
          height: "75px",
          borderRadius: "50%",
          background: orbActive
            ? "cyan"
            : "#007bff",
          boxShadow: orbActive
            ? "0 0 40px cyan"
            : "0 0 20px #007bff",
          animation:
            "pulse 1.2s infinite",
          zIndex: 9999,
          transition: "0.3s"
        }}
      />

      <style>

        {`

          @keyframes pulse {

            0% {

              transform: scale(1);

            }

            50% {

              transform: scale(1.1);

            }

            100% {

              transform: scale(1);

            }

          }

        `}

      </style>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/map"
          element={<FamilyMap />}
        />

        <Route
          path="/chat"
          element={<FamilyChat />}
        />

        

        {/* <Route
  path="/video-call"
  element={<VideoCall />}
/> */}

        <Route
path="/calls"
element={<FamilyCalls/>}

/>

        <Route
  path="/family"
  element={<JoinFamily />}
/>

        <Route
          path="/ai"
          element={<AIAssistant />}
        />

        <Route
          path="/familyos"
          element={<FamilyOS />}
        />

        <Route
          path="/emergency"
          element={<EmergencyContacts />}
        />

        <Route
          path="/night"
          element={<NightSafety />}
        />

        <Route
path="/voicecall/:id"
element={<VoiceCall/>}
/>

{/* <Route
path="/videocall/:id"
element={<VideoCall/>}
/> */}

      </Routes>

      

    </>

  );

}

export default App;








