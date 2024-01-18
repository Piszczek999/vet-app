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
    <div className="flex flex-col">
      <p>Log in</p>
      {message && <p>{message}</p>}
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
      <div className="border-b border-white"></div>
      <button onClick={async () => await handleSignIn()}>Login</button>
      <button onClick={() => setIsRegister(true)}>Create an account</button>
    </div>
  );
}
