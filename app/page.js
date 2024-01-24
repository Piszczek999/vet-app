"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { auth } from "./firebase";

export default function Home() {
  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  onAuthStateChanged(auth, (authUser) => {
    setAuthUser(authUser);
    setIsLoading(false);
  });

  if (isLoading)
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-20">
        <p>Ładowanie...</p>
      </main>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      {authUser ? (
        // Zalogowany
        <Profile />
      ) : isRegister ? (
        // Rejestracja
        <Register setIsRegister={setIsRegister} />
      ) : (
        // Logowanie
        <Login setIsRegister={setIsRegister} />
      )}
    </main>
  );
}
