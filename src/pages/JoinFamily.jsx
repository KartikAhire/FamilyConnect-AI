import { useState, useEffect } from "react";
import socket from "../services/socket";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

import {
  db,
  auth
} from "../firebase";

function JoinFamily() {

  const [familyId, setFamilyId] = useState("");
  const [joined, setJoined] = useState(false);

  const [name, setName] = useState("");

  const [members, setMembers] = useState([]);

  // =======================
  // SOCKET
  // =======================

  useEffect(() => {

    socket.on(
      "family-members",
      (data) => {

        setMembers(data);

        localStorage.setItem(
          "familyMembers",
          JSON.stringify(data)
        );

      }
    );

    return () => {

      socket.off(
        "family-members"
      );

    };

  }, []);

  // =======================
  // CREATE FAMILY
  // =======================

  async function createFamily() {

    const id =
      "family" +
      Math.floor(
        1000 +
        Math.random() * 9000
      );

    try {

      await setDoc(
        doc(
          db,
          "families",
          id
        ),
        {
          ownerUid:
            auth.currentUser?.uid,

          ownerName:
            auth.currentUser?.displayName ||
            auth.currentUser?.email,

          createdAt:
            Date.now(),

          members: [
            auth.currentUser?.uid
          ]
        }
      );

      setFamilyId(id);

      navigator.clipboard.writeText(id);

      alert(
        "Family Created: " + id
      );

    } catch (err) {

      console.log(err);

      alert(
        "Create Family Failed"
      );

    }

  }

  // =======================
  // COPY ID
  // =======================

  function copyID() {

    navigator.clipboard.writeText(
      familyId
    );

    alert(
      "Family ID Copied"
    );

  }

  // =======================
  // JOIN FAMILY
  // =======================

  async function joinFamilyRoom() {

    if (!familyId.trim())
      return;

    try {

      const familyRef =
        doc(
          db,
          "families",
          familyId
        );

      const snap =
        await getDoc(
          familyRef
        );

      if (!snap.exists()) {

        alert(
          "Family Not Found"
        );

        return;

      }

      await updateDoc(
        familyRef,
        {
          members:
            arrayUnion(
              auth.currentUser?.uid
            )
        }
      );

      socket.emit(
        "join-room",
        familyId
      );

      socket.emit(
        "get-members",
        familyId
      );

      setJoined(true);

      alert(
        "Joined Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Join Failed"
      );

    }

  }

  // =======================
  // ADD MEMBER
  // =======================

  function addMember() {

    if (!joined) {

      alert(
        "Join Family First"
      );

      return;

    }

    if (!name.trim())
      return;

    const newMember = {

      id:
        Date.now().toString(),

      name:
        name,

      avatar:
        "👨",

      active:
        true,

      battery:
        Math.floor(
          Math.random() * 100
        ),

      distance:
        (
          Math.random() * 5
        ).toFixed(1)

    };

    socket.emit(
      "join-family",
      {
        familyId:
          familyId,

        member:
          newMember
      }
    );

    setName("");

  }

  // =======================
  // UI
  // =======================

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-violet-100
      via-pink-50
      to-blue-100
      flex
      justify-center
      items-start
      pt-10
      px-4
    "
    >

      <div
        className="
        w-full
        max-w-[390px]
        bg-white
        rounded-[35px]
        shadow-2xl
        p-7
        pb-28
      "
      >

        <h1
          className="
          text-5xl
          font-black
          whitespace-nowrap
          bg-gradient-to-r
          from-purple-700
          to-pink-500
          bg-clip-text
          text-transparent
        "
        >
          Family Hub
        </h1>

        <p
          className="
          text-gray-500
          mb-6
        "
        >
          Connect your family in real time
        </p>

        <button
          onClick={createFamily}
          className="
          w-full
          bg-green-500
          text-white
          rounded-3xl
          p-4
          font-bold
          mb-5
        "
        >
          ✨ Create Family
        </button>

        <div
          className="
          bg-gradient-to-r
          from-purple-600
          to-pink-500
          rounded-3xl
          p-5
          text-white
          mb-5
        "
        >

          <p>Family ID</p>

          <h2
            className="
            text-5xl
            font-black
          "
          >
            {familyId || "Not Created"}
          </h2>

          <button
            onClick={copyID}
            className="
            bg-white
            text-black
            rounded-xl
            px-4
            py-2
            mt-4
          "
          >
            📋 Copy
          </button>

        </div>

        <div
          className="
          flex
          gap-3
          mb-5
        "
        >

          <input
            value={familyId}
            onChange={(e) =>
              setFamilyId(
                e.target.value
              )
            }
            placeholder="Enter Family ID"
            className="
            flex-1
            bg-gray-100
            rounded-2xl
            p-4
            outline-none
          "
          />

          <button
            onClick={joinFamilyRoom}
            className="
            bg-green-500
            text-white
            px-6
            rounded-2xl
            font-bold
          "
          >
            Join
          </button>

        </div>

        <div
          className="
          flex
          gap-3
          mb-5
        "
        >

          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            placeholder="Add member"
            className="
            flex-1
            bg-gray-100
            rounded-2xl
            p-4
            outline-none
          "
          />

          <button
            disabled={!joined}
            onClick={addMember}
            className={`
              px-6
              rounded-2xl
              font-bold
              text-white
              ${
                joined
                  ? "bg-gradient-to-r from-purple-600 to-pink-500"
                  : "bg-gray-300"
              }
            `}
          >
            Add
          </button>

        </div>

        <div className="space-y-4">

          {members.map((m) => (

            <div
              key={m.id}
              className="
              bg-gray-50
              rounded-3xl
              p-5
              shadow
              flex
              justify-between
              items-center
            "
            >

              <div>

                <h2
                  className="
                  font-black
                  text-3xl
                "
                >
                  {m.name}
                </h2>

                <p>
                  🟢 Online
                </p>

                <p>
                  📍 {m.distance} KM
                </p>

                <p>
                  🔋 {m.battery}%
                </p>

              </div>

              <div
                className="
                text-6xl
              "
              >
                {m.avatar}
              </div>

            </div>

          ))}

        </div>

        <div
          className="
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          w-[340px]
          bg-white
          rounded-full
          shadow-xl
          p-4
          flex
          justify-around
        "
        >

          <button>🏠</button>
          <button>🗺️</button>
          <button>📞</button>
          <button>🚨</button>
          <button>👤</button>

        </div>

      </div>

    </div>

  );

}

export default JoinFamily;