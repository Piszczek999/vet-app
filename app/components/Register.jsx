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
  const [message, setMessage] = useState("");

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
      if (error.code === "auth/invalid-email") {
        setMessage("Invalid email");
      } else if (error.code === "auth/missing-password") {
        setMessage("Missing password");
      } else console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between grow">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-center text-xl mb-4">
          Gabinet Weterynaryjny <br /> Doctor Vet
        </h1>
        {message && (
          <p className="bg-yellow-300 py-2 px-3 rounded-xl">{message}</p>
        )}
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
      </div>
      <div className="flex flex-col gap-5 items-center">
        <button
          className="btn bg-green-700"
          onClick={async () => await handleCreateUser()}
          disabled={!firstname || !lastname}
        >
          Zapisz
        </button>
        <button
          className="btn bg-gray-600"
          onClick={() => setIsRegister(false)}
        >
          Posiadam konto
        </button>
      </div>
    </div>
  );
}
