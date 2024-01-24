import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

export default function Login({ setIsRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code == "auth/invalid-email") setMessage("Invalid email");
      else if (error.code == "auth/invalid-credential")
        setMessage("Invalid password");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between grow">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-center text-xl mb-4">
          Gabinet Weterynaryjny <br /> Doctor Vet
        </h1>
        {message && (
          <p className="bg-yellow-300 py-2 px-3 rounded-xl">{message}</p>
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Login"
          autoComplete="off"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-5 items-center">
        <button
          className="btn bg-green-700"
          onClick={async () => await handleSignIn()}
        >
          Zaloguj
        </button>
        <button className="btn bg-gray-600" onClick={() => setIsRegister(true)}>
          Utwórz konto
        </button>
      </div>
    </div>
  );
}
