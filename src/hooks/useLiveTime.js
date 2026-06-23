import { useEffect, useState } from "react";

function useLiveTime() {

  const [time, setTime] = useState(
    new Date()
  );

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

}

export default useLiveTime;