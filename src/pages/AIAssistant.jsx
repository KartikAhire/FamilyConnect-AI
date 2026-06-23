import {
  useState,
  useRef
} from "react";

import {
  motion
} from "framer-motion";

function AIAssistant() {

  const [message,
    setMessage] =
    useState("");

  const [response,
    setResponse] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const recognitionRef =
    useRef(null);

  // ASK AI
  const askAI =
    async (
      customMessage
    ) => {

      const finalMessage =
        customMessage ||
        message;

      if (!finalMessage)
        return;

      try {

        setLoading(true);

        const apiKey =

          import.meta.env
            .VITE_OPENROUTER_API_KEY;

        // SAFETY PROMPT
        const systemPrompt = `
You are an AI Family Safety Assistant.

Rules:
- Give short helpful replies.
- Help in emergencies.
- Give safety advice.
- Be calm and supportive.
- Keep replies modern and smart.
`;

        const res =
          await fetch(

            "https://openrouter.ai/api/v1/chat/completions",

            {

              method:
                "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${apiKey}`,

              },

              body: JSON.stringify({

                model:
                  "openai/gpt-3.5-turbo",

                messages: [

                  {
                    role:
                      "system",

                    content:
                      systemPrompt,
                  },

                  {
                    role:
                      "user",

                    content:
                      finalMessage,
                  },

                ],

              }),

            }

          );

        const data =
          await res.json();

        const aiText =

          data.choices?.[0]
            ?.message?.content ||

          "AI is not responding";

        setResponse(
          aiText
        );

      } catch (error) {

        console.log(
          error
        );

        setResponse(
          "❌ Failed To Connect AI"
        );

      }

      setLoading(false);

    };

  // VOICE INPUT
  const startVoice =
    () => {

      const SpeechRecognition =

        window
          .SpeechRecognition ||

        window
          .webkitSpeechRecognition;

      if (
        !SpeechRecognition
      ) {

        alert(
          "Voice recognition not supported"
        );

        return;

      }

      const recognition =
        new SpeechRecognition();

      recognition.lang =
        "en-US";

      recognition.start();

      recognition.onresult =
        (event) => {

          const text =

            event.results[0][0]
              .transcript;

          setMessage(text);

          askAI(text);

        };

      recognitionRef.current =
        recognition;

    };

  // ENTER KEY
  const handleKey =
    (e) => {

      if (
        e.key === "Enter"
      ) {

        askAI();

      }

    };

  // QUICK ACTIONS
  const quickPrompts = [

    "I feel unsafe",

    "Emergency help",

    "Track family safety",

    "Battery low help",

  ];

  return (

    <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 min-h-screen flex items-center justify-center p-4">

      {/* MOBILE */}
      <div className="w-[390px] h-[844px] bg-white/70 backdrop-blur-2xl rounded-[35px] shadow-2xl overflow-hidden flex flex-col border border-white/40">

        {/* HEADER */}
        <div className="p-5 border-b bg-white/40 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">

                AI Assistant

              </h1>

              <p className="text-gray-500 mt-1">

                Smart Family Protection

              </p>

            </div>

            <motion.div

              animate={{
                scale: [1, 1.1, 1],
              }}

              transition={{
                duration: 2,
                repeat: Infinity,
              }}

              className="
                bg-green-500
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

        {/* QUICK ACTIONS */}
        <div className="p-4 flex gap-3 overflow-x-auto">

          {quickPrompts.map(
            (prompt) => (

              <button

                key={prompt}

                onClick={() =>
                  askAI(prompt)
                }

                className="
                  whitespace-nowrap
                  bg-purple-100
                  text-purple-700
                  px-4
                  py-2
                  rounded-2xl
                  font-semibold
                "

              >

                {prompt}

              </button>

            )
          )}

        </div>

        {/* CHAT AREA */}
        <div className="flex-1 p-5 overflow-y-auto">

          {/* USER */}
          {message && (

            <motion.div

              initial={{
                opacity: 0,
                x: 20,
              }}

              animate={{
                opacity: 1,
                x: 0,
              }}

              className="
                flex
                justify-end
                mb-5
              "

            >

              <div className="
                bg-purple-600
                text-white
                px-5
                py-4
                rounded-[28px]
                max-w-[80%]
                shadow-xl
              ">

                {message}

              </div>

            </motion.div>

          )}

          {/* AI */}
          <motion.div

            initial={{
              opacity: 0,
              x: -20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            className="
              flex
              justify-start
            "

          >

            <div className="
              bg-white
              text-gray-800
              px-5
              py-4
              rounded-[28px]
              max-w-[85%]
              shadow-xl
              border
            ">

              {loading
                ? "🤖 Thinking..."
                : response ||
                  "👋 Ask anything about safety, emergency, family tracking or protection."
              }

            </div>

          </motion.div>

        </div>

        {/* INPUT */}
        <div className="p-4 border-t bg-white/40 backdrop-blur-xl flex gap-3">

          {/* INPUT */}
          <input

            type="text"

            placeholder="Ask AI..."

            value={message}

            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }

            onKeyDown={
              handleKey
            }

            className="
              flex-1
              bg-white
              rounded-2xl
              px-5
              py-3
              outline-none
              shadow
            "

          />

          {/* MIC */}
          <motion.button

            whileTap={{
              scale: 0.9,
            }}

            onClick={
              startVoice
            }

            className="
              bg-pink-500
              text-white
              px-4
              rounded-2xl
              shadow-lg
            "

          >

            🎤

          </motion.button>

          {/* SEND */}
          <motion.button

            whileTap={{
              scale: 0.9,
            }}

            onClick={
              askAI
            }

            className="
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              text-white
              px-5
              rounded-2xl
              font-bold
              shadow-lg
            "

          >

            Ask

          </motion.button>

        </div>

      </div>

    </div>

  );

}

export default AIAssistant;