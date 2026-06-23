export default function useEmergencyAI(message) {

  if (!message) return false;

  const text = message.toLowerCase();

  const emergencyWords = [

    "help",
    "danger",
    "emergency",
    "save me",
    "attack",
    "blood",
    "accident",
    "sos"

  ];

  return emergencyWords.some((word) =>
    text.includes(word)
  );

}