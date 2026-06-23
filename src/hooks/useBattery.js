import { useEffect, useState } from "react";

function useBattery() {

  const [battery, setBattery] = useState({
    level: 100,
    charging: false,
  });

  useEffect(() => {

    async function getBatteryInfo() {

      if (!navigator.getBattery) return;

      const batteryManager =
        await navigator.getBattery();

      function updateBattery() {

        setBattery({
          level: Math.floor(
            batteryManager.level * 100
          ),
          charging: batteryManager.charging,
        });

      }

      updateBattery();

      batteryManager.addEventListener(
        "levelchange",
        updateBattery
      );

      batteryManager.addEventListener(
        "chargingchange",
        updateBattery
      );

    }

    getBatteryInfo();

  }, []);

  return battery;

}

export default useBattery;