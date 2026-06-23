function useStatus() {

  const hour = new Date().getHours();

  if (hour >= 23 || hour <= 5) {

    return {
      text: "Sleeping",
      color: "bg-blue-100 text-blue-700",
      emoji: "🌙",
    };

  }

  if (hour >= 18) {

    return {
      text: "Safe",
      color: "bg-green-100 text-green-700",
      emoji: "🟢",
    };

  }

  return {
    text: "Active",
    color: "bg-orange-100 text-orange-700",
    emoji: "⚡",
  };

}

export default useStatus;