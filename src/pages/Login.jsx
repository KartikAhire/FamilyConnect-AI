import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

import { auth, provider, db } from "../firebase";

function Login() {

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {

    try {

      const result = await signInWithPopup(auth, provider);

      console.log("USER:", result.user);

      await setDoc(doc(db, "users", result.user.uid), {

        name: result.user.displayName,

        email: result.user.email,

        photo: result.user.photoURL,

        uid: result.user.uid,

      });

      navigate("/home");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">

      <div className="w-[390px] h-[844px] bg-white rounded-[35px] shadow-2xl flex flex-col items-center justify-center p-10">

        <div className="text-7xl mb-6">
          🔐
        </div>

        <h1 className="text-4xl font-bold text-purple-600 text-center">
          FamilyConnect AI
        </h1>

        <p className="text-gray-500 mt-3 text-center">
          Secure Family Login
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mt-10 bg-purple-600 hover:bg-purple-700 transition text-white px-8 py-4 rounded-2xl text-lg font-semibold w-full"
        >
          Continue With Google
        </button>

      </div>

    </div>
  );
}

export default Login;