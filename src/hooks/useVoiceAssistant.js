import { useEffect } from "react";

function useVoiceAssistant(navigate) {

  useEffect(() => {

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

    recognition.continuous =
      false;

    recognition.lang =
      "en-US";

    recognition.interimResults =
      false;

    recognition.maxAlternatives =
      1;

    const speak = (text) => {

      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(
          text
        );

      utterance.lang =
        "en-US";

      utterance.rate = 1;

      window.speechSynthesis.speak(
        utterance
      );

    };

    // START
    setTimeout(() => {

      speak(
        "AI Assistant Activated"
      );

    }, 1000);

    // START LISTENING
    const startListening =
      () => {

        try {

          recognition.start();

          console.log(
            "Listening..."
          );

        } catch (err) {

          console.log(err);

        }

      };

    startListening();

    // RESULT
    recognition.onresult =
      (event) => {

        const transcript =

          event.results[0][0]
            .transcript
            .toLowerCase();

        console.log(
          "Detected:",
          transcript
        );

        // MAP
        if (
          transcript.includes(
            "map"
          )
        ) {

          speak(
            "Opening map"
          );

          navigate("/map");

        }

        // CHAT
        else if (
          transcript.includes(
            "chat"
          )
        ) {

          speak(
            "Opening chat"
          );

          navigate("/chat");

        }

        // AI
        else if (
          transcript.includes(
            "ai"
          )
        ) {

          speak(
            "Opening AI"
          );

          navigate("/ai");

        }

        // HOME
        else if (
          transcript.includes(
            "home"
          )
        ) {

          speak(
            "Going home"
          );

          navigate("/");

        }

        // CALL
        else if (
          transcript.includes(
            "call"
          )
        ) {

          speak(
            "Opening calls"
          );

          navigate("/calls");

        }

        // SOS
        else if (

          transcript.includes(
            "help"
          ) ||

          transcript.includes(
            "emergency"
          )

        ) {

          speak(
            "Emergency activated"
          );

          navigate("/familyos");

        }

        else {

          speak(
            "Command not recognized"
          );

        }

      };

    // AUTO RESTART
    recognition.onend =
      () => {

        console.log(
          "Restarting..."
        );

        setTimeout(() => {

          startListening();

        }, 1000);

      };

    recognition.onerror =
      (event) => {

        console.log(
          "Speech Error:",
          event.error
        );

      };

    return () => {

      recognition.stop();

    };

  }, [navigate]);

}

export default useVoiceAssistant;