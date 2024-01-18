import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";

export default function Register({ setIsRegister }) {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = async () => {
    try {
      const { user: authUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = {
        role: "user",
        firstname: firstname,
        lastname: lastname,
        address: address,
        phone: phone,
      };
      await setDoc(doc(db, "users", authUser.uid), newUser);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col">
      <p>Create an account</p>
      <input
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="firstname"
        autoComplete="off"
      />
      <input
        onChange={(e) => setLastname(e.target.value)}
        placeholder="lastname"
        autoComplete="off"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        autoComplete="off"
      />
      <input
        onChange={(e) => setPhone(e.target.value)}
        placeholder="phone ex. +48 435534254"
        autoComplete="off"
      />
      <input
        onChange={(e) => setAddress(e.target.value)}
        placeholder="address"
        autoComplete="off"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        autoComplete="off"
      />
      <div className="border-b border-white"></div>
      <button onClick={async () => await handleCreateUser()}>Register</button>
      <button onClick={() => setIsRegister(false)}>
        Already have an account?
      </button>
    </div>
  );
}
