import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polyline,
  useMap
} from "react-leaflet";

import useLiveLocation from "../hooks/useLiveLocation";

import {
  useEffect,
  useState,
  useCallback
} from "react";

import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";


function AutoFit({ members }) {
  const map = useMap();

  useEffect(() => {
    const valid = members.filter(m => m.lat && m.lng);

    if (valid.length > 1) {
      map.fitBounds(
        valid.map(m => [Number(m.lat), Number(m.lng)]),
        { padding: [50, 50], maxZoom: 13 }
      );
    }
  }, [members, map]);

  return null;
}


function FamilyMap() {
  const navigate = useNavigate();
  const liveLocation = useLiveLocation();
  const familyId = localStorage.getItem("familyCode") || "defaultFamily";
  const memberName = localStorage.getItem("memberName") || "Unknown";
  const [allMembers, setAllMembers] = useState([]);
  const [spokenAlerts, setSpokenAlerts] = useState({});
  const [mapType, setMapType] = useState("normal");
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeSOS, setActiveSOS] = useState(null);

  const speak = useCallback((text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  }, []);

  const safeZone = {
    latitude: 19.955712,
    longitude: 73.8295808,
    radius: 3000
  };

  const isOutsideSafeZone = useCallback((lat, lng) => {
    const R = 6371;
    const dLat = (lat - safeZone.latitude) * Math.PI / 180;
    const dLon = (lng - safeZone.longitude) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(safeZone.latitude * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance > (safeZone.radius / 1000);
  }, [safeZone.latitude, safeZone.longitude, safeZone.radius]);

  const getStatus = (time) => {
    if (!time) return "Offline";

    const diff = (Date.now() - time) / 1000;

    if (diff < 20) return "Online";
    if (diff < 60) return `Last seen ${Math.floor(diff)}s ago`;

    return `Last seen ${Math.floor(diff / 60)}m ago`;
  };

  useEffect(() => {
    if (!liveLocation.latitude || !liveLocation.longitude) return;

    const updateMyLocation = async () => {
      try {
        const membersRef = collection(db, "families", familyId, "members");
        const snapshot = await getDocs(membersRef);

        const updatePromises = [];
        snapshot.forEach((memberDoc) => {
          const data = memberDoc.data();
          if (data.name === memberName) {
            updatePromises.push(
              updateDoc(doc(db, "families", familyId, "members", memberDoc.id), {
                lat: liveLocation.latitude,
                lng: liveLocation.longitude,
                online: true,
                updatedAt: Date.now(),
                battery: data.battery || Math.floor(Math.random() * 20) + 80
              })
            );
          }
        });

        await Promise.all(updatePromises);
      } catch (error) {
        console.error("Error updating location:", error);
      }
    };

    updateMyLocation();
  }, [liveLocation, familyId, memberName]);

  useEffect(() => {
    const membersRef = collection(db, "families", familyId, "members");

    const unsubscribe = onSnapshot(membersRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAllMembers(data);

      const sosMember = data.find(m => m.sos === true);




      if (
  sosMember &&
  !spokenAlerts[`sos-${sosMember.id}`]
) {

  setActiveSOS(sosMember);

  speak(
    `${sosMember.name} needs help`
  );

  setSpokenAlerts(prev => ({
    ...prev,
    [`sos-${sosMember.id}`]: true
  }));

}
else if (!sosMember) {

  setActiveSOS(null);

}

      








    }, (error) => {
      console.error("Error listening to members:", error);
    });

    return () => unsubscribe();
  }, [familyId, speak]);

  useEffect(() => {
    allMembers.forEach(member => {
      if (
        member.lat &&
        member.lng &&
        isOutsideSafeZone(Number(member.lat), Number(member.lng)) &&
        !spokenAlerts[member.id]
      ) {
        speak(`${member.name} is outside safe zone`);
        setSpokenAlerts(prev => ({
          ...prev,
          [member.id]: true
        }));
      }
    });
  }, [allMembers, isOutsideSafeZone, speak, spokenAlerts]);

  return (
    <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-[390px] h-[844px] bg-white/70 backdrop-blur-2xl rounded-[35px] overflow-hidden shadow-2xl relative">
        <div className="p-5 bg-white/50 border-b">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Family GPS
              </h1>
              <p className="text-gray-500">Live AI Tracking</p>
            </div>

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-green-500 text-white px-4 py-2 rounded-full font-bold"
            >
              LIVE
            </motion.div>
          </div>
        </div>

        <div className="absolute z-[1000] ml-4 mt-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-xl">
          🟢 Realtime • {allMembers.length} live
        </div>

        <button
          onClick={() => setMapType(mapType === "normal" ? "satellite" : "normal")}
          className="absolute right-8 top-[120px] z-[1000] bg-white rounded-full p-4 shadow-xl"
        >
          <Layers />
        </button>

        <div className="flex-1 h-full relative">
          <MapContainer
            center={[
              liveLocation.latitude || 19.95,
              liveLocation.longitude || 73.82
            ]}
            zoom={16}
            style={{
              height: "100%",
              width: "100%",
              zIndex: 1
            }}
          >
            {mapType === "normal" ? (
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="OpenStreetMap"
              />
            ) : (
              <>
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Esri"
                />
                <TileLayer
                  url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                  attribution="Esri Labels"
                />
              </>
            )}

            <AutoFit members={allMembers} />

            <Circle
              center={[safeZone.latitude, safeZone.longitude]}
              radius={safeZone.radius}
              pathOptions={{
                color: "green",
                fillColor: "green",
                fillOpacity: 0.2
              }}
            />

            {allMembers.filter(m => m.lat && m.lng).length > 1 && (
              <Polyline
                positions={allMembers
                  .filter(m => m.lat && m.lng)
                  .map(m => [Number(m.lat), Number(m.lng)])}
                pathOptions={{
                  color: "#9333ea",
                  weight: 6,
                  opacity: 0.8
                }}
              />
            )}

            {allMembers.map(member => {
              if (!member.lat || !member.lng) return null;

              const customIcon = L.divIcon({
                html: `
                  <div style="
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #9333ea, #ec4899);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    border: 4px solid white;
                    box-shadow: 0 0 25px rgba(168, 85, 247, 0.8);
                  ">
                    👨‍👩‍👧
                  </div>
                `,
                className: "",
                iconSize: [60, 60]
              });

              return (
                <Marker
                  key={member.id}
                  position={[Number(member.lat), Number(member.lng)]}
                  icon={customIcon}
                  eventHandlers={{
                    click: (e) => {
                      e.originalEvent.stopPropagation();
                      setSelectedMember(member);
                    }
                  }}
                />
              );
            })}
          </MapContainer>

          {activeSOS && (
            <div className="absolute top-[140px] left-3 right-3 bg-red-500 text-white p-4 rounded-3xl font-black animate-bounce z-[999999]">
              🚨 {activeSOS.name} NEEDS HELP
            </div>
          )}

          {selectedMember && (
            <div className="absolute bottom-[180px] left-3 right-3 bg-white rounded-[35px] shadow-2xl z-[999999] pointer-events-auto border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedMember.profile || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMember.name}`}
                    className="w-[70px] h-[70px] rounded-3xl bg-green-500"
                    alt={selectedMember.name}
                  />
                  <div>
                    <h2 className="text-4xl font-black">{selectedMember.name}</h2>
                    <p className="text-gray-400 font-semibold">
                      {getStatus(selectedMember.updatedAt) === "Online"
                        ? "🟢 Online"
                        : `⚫ ${getStatus(selectedMember.updatedAt)}`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedMember(null);
                  }}
                  className="bg-gray-100 rounded-full w-10 h-10"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 rounded-3xl p-4 text-center">
                  🔋
                  <div className="font-black text-2xl">
                    {Math.floor(selectedMember.battery || 100)}%
                  </div>
                  <p className="text-xs">Battery</p>
                </div>

                <div className="bg-pink-50 rounded-3xl p-4 text-center">
                  📍 GPS ON
                  <p className="text-xs mt-2">Sharing</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    window.open("tel:1234567890");
                  }}
                  className="bg-green-100 rounded-3xl p-4 font-bold"
                >
                  📞 Call
                </button>

                <button
                  onClick={() => {
                    console.log("chat");
                    navigate("/chat");
                  }}
                  className="bg-pink-100 rounded-3xl p-4 font-bold"
                >
                  💬 Chat
                </button>

                <button
                  onClick={() => {
                    console.log("track");

                    if (
                      liveLocation?.latitude &&
                      liveLocation?.longitude &&
                      selectedMember?.lat &&
                      selectedMember?.lng
                    ) {
                      window.open(
                        `https://www.google.com/maps/dir/${liveLocation.latitude},${liveLocation.longitude}/${selectedMember.lat},${selectedMember.lng}`,
                        "_blank"
                      );
                    }
                  }}
                  className="bg-blue-100 rounded-3xl p-4 font-bold"
                >
                  🎯 Track
                </button>
              </div>

              <button
                onClick={async () => {
                  await updateDoc(
                    doc(
                      db,
                      "families",
                      familyId,
                      "members",
                      selectedMember.id
                    ),
                    {
                      sos: true,
                      sosTime: Date.now(),
                      reason: "Emergency"
                    }
                  );
                }}
                className="w-full bg-red-500 text-white rounded-3xl p-4 font-black mt-4"
              >
                🚨 SOS
              </button>

              <button
                onClick={async () => {
                  await updateDoc(
                    doc(
                      db,
                      "families",
                      familyId,
                      "members",
                      selectedMember.id
                    ),
                    {
                      sos: false
                    }
                  );
                }}
                className="w-full bg-gray-800 text-white rounded-3xl p-3 font-bold mt-2"
              >
                ❌ Stop SOS
              </button>
            </div>
          )}

          {!selectedMember && (
            <div className="absolute bottom-[180px] left-0 right-0 px-3 z-[9999] overflow-x-auto">
              <div className="flex gap-3 w-max">
                {allMembers.map(member => (
                  <div
                    key={member.id}
                    onClick={() => {
                      setSelectedMember(member);
                    }}
                    className="bg-white min-w-[110px] rounded-3xl p-3 shadow-xl cursor-pointer hover:scale-105 transition text-center"
                  >
                    <img
                      src={member.profile || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                      className="w-14 h-14 rounded-full mx-auto bg-green-500"
                      alt={member.name}
                    />
                    <p className="font-bold mt-2 truncate">{member.name}</p>
                    <p className="text-xs text-green-500">🟢 Active</p>
                    <p className="text-xs text-gray-500">
                      🔋 {Math.floor(member.battery || 100)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* <BottomNav /> */}
        </div>
      </div>
    </div>
  );
}

export default FamilyMap;
