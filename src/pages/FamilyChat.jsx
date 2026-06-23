import { useEffect, useRef, useState } from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  setDoc,
  deleteDoc
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  db,
  auth,
  storage
} from "../firebase";

function FamilyChat() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [typingUser, setTypingUser] =
    useState("");

  const [image, setImage] = useState("");

  const [replyText, setReplyText] =
    useState("");

  const [recording, setRecording] =
    useState(false);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [showVideoCall, setShowVideoCall] =
    useState(false);

  const bottomRef = useRef(null);

  // REALTIME CHAT

  useEffect(() => {

    const q = query(
      collection(db, "family-chat"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {

        const msgs = [];

        snapshot.forEach((docItem) => {

          msgs.push({
            id: docItem.id,
            ...docItem.data()
          });

        });

        setMessages(msgs);

        setUnreadCount(msgs.length);

      }
    );

    return () => unsubscribe();

  }, []);

  // TYPING STATUS

  useEffect(() => {

    const unsubscribe = onSnapshot(
      doc(db, "typing-status", "status"),
      (snapshot) => {

        if (snapshot.exists()) {

          const data = snapshot.data();

          if (
            data.user !==
            auth.currentUser?.displayName
          ) {

            setTypingUser(data.user);

          } else {

            setTypingUser("");

          }

        }

      }
    );

    return () => unsubscribe();

  }, []);

  // AUTO SCROLL

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  // SEND MESSAGE

  const sendMessage = async () => {

    if (!message.trim() && !image)
      return;

    await addDoc(
      collection(db, "family-chat"),
      {

        text: message,

        image: image,

        reply: replyText,

        user:
          auth.currentUser?.displayName ||
          "Unknown",

        photo:
          auth.currentUser?.photoURL || "",

        createdAt: Date.now()

      }
    );

    await setDoc(
      doc(db, "typing-status", "status"),
      {
        user: ""
      }
    );

    setMessage("");

    setImage("");

    setReplyText("");

  };

  // DELETE MESSAGE

  const deleteMessage = async (id) => {

    await deleteDoc(
      doc(db, "family-chat", id)
    );

  };

  // VOICE NOTE

  const handleVoiceNote = () => {

    setRecording(true);

    setTimeout(async () => {

      await addDoc(
        collection(db, "family-chat"),
        {

          text:
            "🎤 Voice message sent",

          user:
            auth.currentUser?.displayName,

          photo:
            auth.currentUser?.photoURL,

          createdAt: Date.now()

        }
      );

      setRecording(false);

    }, 2000);

  };

  // IMAGE UPLOAD

  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageRef = ref(
      storage,
      `chat-images/${Date.now()}-${file.name}`
    );

    await uploadBytes(imageRef, file);

    const imageUrl =
      await getDownloadURL(imageRef);

    setImage(imageUrl);

  };

  // VIDEO CALL

  const startVideoCall = () => {

    setShowVideoCall(true);

  };

  const endVideoCall = () => {

    setShowVideoCall(false);

  };

  // EMOJIS

  const addEmoji = (emoji) => {

    setMessage((prev) => prev + emoji);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f6d8ff] via-[#f3e8ff] to-[#dbeafe] flex items-center justify-center p-4">

      <div
        className="
          w-[390px]
          h-[844px]
          rounded-[40px]
          overflow-hidden
          border
          border-white/40
          shadow-[0_20px_80px_rgba(0,0,0,0.15)]
          backdrop-blur-xl
          bg-white/70
          flex
          flex-col
          relative
        "
      >

        {/* VIDEO CALL */}

        {showVideoCall && (

          <div
            className="
              absolute
              inset-0
              bg-black
              z-50
              flex
              flex-col
              items-center
              justify-center
            "
          >

            <img
              src={
                auth.currentUser?.photoURL
              }
              alt=""
              className="
                w-36
                h-36
                rounded-full
                border-4
                border-white
              "
            />

            <h2 className="text-white text-3xl font-bold mt-6">

              Family Video Call 📹

            </h2>

            <div className="flex gap-5 mt-10">

              <button
                onClick={endVideoCall}
                className="
                  bg-red-500
                  px-6
                  py-4
                  rounded-full
                  text-2xl
                "
              >

                ❌

              </button>

              <button
                className="
                  bg-green-500
                  px-6
                  py-4
                  rounded-full
                  text-2xl
                "
              >

                🎤

              </button>

            </div>

          </div>

        )}

        {/* HEADER */}

        <div
          className="
            bg-gradient-to-r
            from-purple-600
            via-fuchsia-500
            to-pink-500
            text-white
            px-5
            py-5
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h1 className="text-3xl font-extrabold">

              Family Chat 💬

            </h1>

            <p className="text-xs mt-1">

              Ultra Messenger

            </p>

          </div>

          <div className="flex gap-3 items-center">

            <button
              onClick={startVideoCall}
              className="
                bg-white/20
                px-3
                py-2
                rounded-full
              "
            >

              📹

            </button>

            <div
              className="
                bg-white/20
                px-3
                py-1
                rounded-full
                text-xs
              "
            >

              🔔 {unreadCount}

            </div>

          </div>

        </div>

        {/* CHAT */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-4
            py-5
            space-y-4
            bg-[#faf7ff]
          "
        >

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={`
                flex
                ${
                  msg.user ===
                  auth.currentUser?.displayName
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >

              <div
                className={`
                  max-w-[80%]
                  rounded-[30px]
                  px-4
                  py-3
                  shadow-xl
                  ${
                    msg.user ===
                    auth.currentUser?.displayName
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                      : "bg-white text-black"
                  }
                `}
              >

                <div className="flex items-center gap-2 mb-2">

                  <img
                    src={
                      msg.photo ||
                      "https://i.pravatar.cc/100"
                    }
                    alt=""
                    className="
                      w-9
                      h-9
                      rounded-full
                    "
                  />

                  <p className="font-bold text-sm">

                    {msg.user}

                  </p>

                </div>

                {msg.reply && (

                  <div
                    className="
                      bg-black/10
                      rounded-xl
                      p-2
                      mb-2
                      text-xs
                    "
                  >

                    Replying:
                    {" "}
                    {msg.reply}

                  </div>

                )}

                {msg.text && (

                  <p className="text-sm">

                    {msg.text}

                  </p>

                )}

                {msg.image && (

                  <img
                    src={msg.image}
                    alt=""
                    className="
                      mt-2
                      rounded-2xl
                      w-full
                      max-w-[220px]
                    "
                  />

                )}

                <div className="flex justify-between mt-3">

                  <button
                    onClick={() =>
                      setReplyText(msg.text)
                    }
                    className="text-xs"
                  >

                    💬

                  </button>

                  {msg.user ===
                    auth.currentUser?.displayName && (

                    <button
                      onClick={() =>
                        deleteMessage(msg.id)
                      }
                      className="text-xs"
                    >

                      🗑️

                    </button>

                  )}

                </div>

              </div>

            </div>

          ))}

          <div ref={bottomRef}></div>

        </div>

        {/* TYPING */}

        {typingUser && (

          <div
            className="
              px-5
              py-2
              text-sm
              italic
              text-purple-500
            "
          >

            ✍️ {typingUser} is typing...

          </div>

        )}

        {/* REPLY */}

        {replyText && (

          <div className="px-4 pb-2">

            <div
              className="
                bg-purple-100
                p-3
                rounded-2xl
                text-sm
              "
            >

              Replying:
              {" "}
              {replyText}

            </div>

          </div>

        )}

        {/* IMAGE PREVIEW */}

        {image && (

          <div className="px-4 pb-2">

            <img
              src={image}
              alt=""
              className="
                w-24
                h-24
                rounded-2xl
                object-cover
              "
            />

          </div>

        )}

        {/* INPUT */}

        <div
          className="
            p-4
            bg-white/80
            border-t
            flex
            items-center
            gap-2
          "
        >

          <button
            onClick={() => addEmoji("😂")}
            className="text-2xl"
          >

            😀

          </button>

          <label
            className="
              bg-purple-100
              p-3
              rounded-full
              cursor-pointer
            "
          >

            📸

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />

          </label>

          <button
            onClick={handleVoiceNote}
            className={`
              p-3
              rounded-full
              ${
                recording
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-gray-100"
              }
            `}
          >

            🎤

          </button>

          <input
            value={message}
            onChange={async (e) => {

              setMessage(e.target.value);

              await setDoc(
                doc(db, "typing-status", "status"),
                {
                  user:
                    auth.currentUser
                      ?.displayName ||
                    "Someone"
                }
              );

            }}
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                sendMessage();

              }

            }}
            placeholder="Type message..."
            className="
              flex-1
              bg-gray-100
              rounded-full
              px-5
              py-3
              outline-none
            "
          />

          <button
            onClick={sendMessage}
            className="
              bg-gradient-to-r
              from-purple-600
              to-pink-500
              text-white
              px-6
              py-3
              rounded-full
              font-bold
            "
          >

            🚀

          </button>

        </div>

      </div>

    </div>

  );

}

export default FamilyChat;