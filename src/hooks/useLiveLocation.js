import { useEffect, useState } from "react";

function useLiveLocation() {

  const [location, setLocation] =
    useState({

      latitude: 19.9975,

      longitude: 73.7898,

    });

  useEffect(() => {

    if (
      !navigator.geolocation
    ) {

      console.log(
        "Geolocation not supported"
      );

      return;

    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLocation({

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

        });

      },

      (error) => {

        console.log(
          "Location Error:",
          error
        );

      },

      {

        enableHighAccuracy: true,

      }

    );

  }, []);

  return location;

}

export default useLiveLocation;