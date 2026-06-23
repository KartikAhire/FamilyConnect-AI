import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

function FamilyMembers() {

  const [
    familyCode,
    setFamilyCode,
  ] = useState("");

  const [
    memberName,
    setMemberName,
  ] = useState("");

  const [
    members,
    setMembers,
  ] = useState([]);

  const [
    sosAlert,
    setSosAlert,
  ] = useState(null);

  // =========================
  // CREATE FAMILY
  // =========================

  const createFamily =
    async () => {

      try {

        const newFamilyCode =
          "family" +
          Math.floor(
            1000 +
            Math.random() * 9000
          );

        await setDoc(

          doc(
            db,
            "families",
            newFamilyCode
          ),

          {
            createdAt:
              Date.now(),
          }

        );

        setFamilyCode(
          newFamilyCode
        );

        localStorage.setItem(
          "familyCode",
          newFamilyCode
        );

        alert(
          "✅ Family Created"
        );

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // JOIN FAMILY
  // =========================

  const joinFamily = () => {

    if (!familyCode) {

      alert(
        "Enter Family Code"
      );

      return;

    }

    localStorage.setItem(
      "familyCode",
      familyCode
    );

    alert(
      "✅ Joined Family"
    );

  };

  // =========================
  // ADD MEMBER
  // =========================

  const addMember =
    async () => {

      try {

        const savedFamily =
          localStorage.getItem(
            "familyCode"
          );

        const finalFamilyCode =
          familyCode ||
          savedFamily;

        if (!memberName) {

          alert(
            "Enter member name"
          );

          return;

        }

        if (!finalFamilyCode) {

          alert(
            "Create family first"
          );

          return;

        }

        const memberData = {

          name: memberName,
          profile:
`https://api.dicebear.com/7.x/avataaars/svg?seed=${memberName}`,

          online: true,

          battery:
            Math.floor(
              70 +
              Math.random() * 30
            ),

          lat:
            19.9975 +
            Math.random() * 0.2,

          lng:
            73.7898 +
            Math.random() * 0.2,

          createdAt:
            Date.now(),

          updatedAt:
            Date.now(),

          sos: false,

        };

        const docRef =
          await addDoc(

            collection(
              db,
              "families",
              finalFamilyCode,
              "members"
            ),

            memberData

          );

        localStorage.setItem(
          "memberName",
          memberName
        );

        localStorage.setItem(
          "memberId",
          docRef.id
        );

        alert(
          "✅ Member Added"
        );

        setMemberName("");

      } catch (error) {

        console.log(error);

      }

    };

  // =========================
  // REALTIME MEMBERS
  // =========================

  useEffect(() => {

    const savedFamily =
      familyCode ||
      localStorage.getItem(
        "familyCode"
      );

    if (!savedFamily)
      return;

    setFamilyCode(
      savedFamily
    );

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "families",
          savedFamily,
          "members"
        ),

        (snapshot) => {

          const data =
            snapshot.docs.map(
              (doc) => ({

                id: doc.id,

                ...doc.data(),

              })
            );

          setMembers(data);

          const sosMember =
            data.find(
              (m) => m.sos
            );

          if (sosMember) {

            setSosAlert(
              sosMember.name
            );

          } else {

            setSosAlert(null);

          }

        }

      );

    return () =>
      unsubscribe();

  }, [familyCode]);

  // =========================
  // LIVE MOVEMENT
  // =========================

  useEffect(() => {

    const savedFamily =
      localStorage.getItem(
        "familyCode"
      );

    const savedMemberId =
      localStorage.getItem(
        "memberId"
      );

    if (
      !savedFamily ||
      !savedMemberId
    ) return;

    const interval =
      setInterval(
        async () => {

          const member =
            members.find(
              (m) =>
                m.id ===
                savedMemberId
            );

          if (!member)
            return;

          try {

            const randomLat =
              member.lat +
              (
                Math.random() -
                0.5
              ) *
                0.0015;

            const randomLng =
              member.lng +
              (
                Math.random() -
                0.5
              ) *
                0.0015;

            await updateDoc(

              doc(
                db,
                "families",
                savedFamily,
                "members",
                savedMemberId
              ),

              {

                lat: randomLat,

                lng: randomLng,

                battery:
                  Math.max(
                    1,
                    member.battery -
                      Math.random() * 2
                  ),

                updatedAt:
                  Date.now(),

                online: true,

              }

            );

          } catch (error) {

            console.log(error);

          }

        },

        5000
      );

    return () =>
      clearInterval(interval);

  }, [members]);

  // =========================
  // SOS ALERT
  // =========================

  const sendSOS =
    async () => {

      const savedFamily =
        localStorage.getItem(
          "familyCode"
        );

      const savedMemberId =
        localStorage.getItem(
          "memberId"
        );

      if (
        !savedFamily ||
        !savedMemberId
      ) return;

      await updateDoc(

        doc(
          db,
          "families",
          savedFamily,
          "members",
          savedMemberId
        ),

        {
          sos: true,
        }

      );

      alert(
        "🚨 SOS SENT"
      );

    };

  // =========================
  // LAST ACTIVE
  // =========================

  const getLastSeen =
    (timestamp) => {

      if (!timestamp)
        return "Unknown";

      const diff =
        Math.floor(
          (
            Date.now() -
            timestamp
          ) / 1000
        );

      if (diff < 60)
        return `${diff}s ago`;

      if (diff < 3600)
        return `${Math.floor(
          diff / 60
        )} min ago`;

      return `${Math.floor(
        diff / 3600
      )} hr ago`;

    };

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-pink-100
      via-purple-100
      to-blue-100
      flex
      items-center
      justify-center
      p-4
    ">

      <div className="
        w-[390px]
        bg-white/80
        backdrop-blur-2xl
        rounded-[35px]
        shadow-2xl
        overflow-hidden
      ">

        <div className="
          p-6
          border-b
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <div>

              <h1 className="
                text-4xl
                font-black
                bg-gradient-to-r
                from-purple-600
                to-pink-500
                bg-clip-text
                text-transparent
              ">

                Family Members

              </h1>

              <p className="
                text-gray-500
                mt-2
              ">

                AI Connected Family

              </p>

            </div>

            <div className="
              bg-green-500
              text-white
              px-5
              py-3
              rounded-full
              font-black
            ">

              LIVE

            </div>

          </div>

        </div>

        {sosAlert && (

          <div className="
            bg-red-500
            text-white
            p-4
            text-center
            font-black
            animate-pulse
          ">

            🚨 SOS ALERT FROM
            {" "}
            {sosAlert}

          </div>

        )}

        <div className="p-5">

          <button

            onClick={
              createFamily
            }

            className="
              w-full
              bg-green-500
              text-white
              py-4
              rounded-2xl
              font-black
              text-lg
            "

          >

            🚀 Create New Family

          </button>

          <div className="
            mt-5
            p-5
            rounded-3xl
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            text-white
          ">

            <h2 className="
              text-2xl
              font-black
            ">

              Invite Family

            </h2>

            <div className="
              bg-white
              text-purple-700
              rounded-2xl
              py-5
              mt-4
              text-center
              text-4xl
              font-black
            ">

              {familyCode ||
                "family123"}

            </div>

          </div>

          <div className="
            mt-5
            bg-white/70
            rounded-3xl
            p-5
          ">

            <h2 className="
              text-3xl
              font-black
              text-purple-600
            ">

              Join Family

            </h2>

            <div className="
              flex
              gap-3
              mt-5
            ">

              <input

                value={familyCode}

                onChange={(e) =>
                  setFamilyCode(
                    e.target.value
                  )
                }

                placeholder="
                Enter Family Code
                "

                className="
                  flex-1
                  p-4
                  rounded-2xl
                  border
                "

              />

              <button

                onClick={
                  joinFamily
                }

                className="
                  bg-gradient-to-r
                  from-purple-500
                  to-pink-500
                  text-white
                  px-6
                  rounded-2xl
                  font-black
                "

              >

                Join

              </button>

            </div>

          </div>

          <div className="
            flex
            gap-3
            mt-5
          ">

            <input

              value={memberName}

              onChange={(e) =>
                setMemberName(
                  e.target.value
                )
              }

              placeholder="
              Add member name
              "

              className="
                flex-1
                p-4
                rounded-2xl
                border
              "

            />

            <button

              onClick={
                addMember
              }

              className="
                bg-gradient-to-r
                from-purple-500
                to-pink-500
                text-white
                px-6
                rounded-2xl
                font-black
              "

            >

              Add

            </button>

          </div>

          <button

            onClick={sendSOS}

            className="
              w-full
              mt-5
              bg-red-500
              text-white
              py-4
              rounded-2xl
              font-black
              text-lg
              animate-pulse
            "

          >

            🚨 SEND SOS

          </button>

          <div className="mt-8">

            {members.map(
              (member) => {

                const distance =
                  (
                    Math.random() * 5
                  ).toFixed(1);

                const isDanger =
                  member.battery < 15;

                return (

                  <div

                    key={member.id}

                    className={`
                      rounded-3xl
                      p-5
                      shadow-lg
                      mb-4
                      transition-all
                      duration-500
                      ${
                        isDanger
                          ? "bg-red-100 border-2 border-red-400"
                          : "bg-white"
                      }
                    `}

                  >

                    <div className="
                      flex
                      justify-between
                      items-center
                    ">

                      <div>

                        <h2 className="
                          text-3xl
                          font-black
                        ">

                          {member.name}

                        </h2>

                        <p className="
                          text-gray-500
                          mt-2
                        ">

                          {member.online
                            ? "🟢 Online"
                            : "⚫ Offline"}

                        </p>

                        <p className="
                          text-sm
                          text-gray-500
                          mt-1
                        ">

                          📍
                          {" "}
                          {distance}
                          {" "}
                          KM Away

                        </p>

                        <p className="
                          text-sm
                          text-gray-500
                        ">

                          ⏱️ Seen
                          {" "}
                          {getLastSeen(
                            member.updatedAt
                          )}

                        </p>

                        <div className="
                          w-full
                          h-3
                          bg-gray-200
                          rounded-full
                          mt-3
                          overflow-hidden
                        ">

                          <div

                            style={{
                              width:
                                `${member.battery}%`,
                            }}

                            className={`
                              h-full
                              transition-all
                              duration-500
                              ${
                                member.battery <
                                20
                                  ? "bg-red-500"
                                  : "bg-green-500"
                              }
                            `}

                          />

                        </div>

                        <p className="
                          text-sm
                          mt-2
                        ">

                          🔋
                          {" "}
                          {Math.floor(
                            member.battery
                          )}%

                        </p>

                        {isDanger && (

                          <p className="
                            text-red-500
                            font-bold
                            mt-2
                            animate-pulse
                          ">

                            ⚠️ Danger Zone

                          </p>

                        )}

                      </div>

                      <div className="
                        text-5xl
                        animate-bounce
                      ">

                        👨‍👩‍👧

                      </div>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default FamilyMembers;