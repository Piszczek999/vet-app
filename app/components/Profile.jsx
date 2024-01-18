import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import AddPet from "./AddPet";
import PetList from "./PetList";
import VisitList from "./VisitList";

export default function Profile() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const user = (
          await getDoc(doc(db, "users", auth.currentUser.uid))
        ).data();
        setUser(user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(undefined);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isAdding) return <AddPet setOpen={setIsAdding} />;
  if (listOpen) return <VisitList setOpen={setListOpen} />;
  return (
    <div className="flex flex-col">
      {user.role === "admin" && <p>You are Admin</p>}
      <p>Imię: {user.firstname}</p>
      <p>Nazwisko: {user.lastname}</p>
      <p>Adres: {user.address}</p>
      <p>Telefon: {user.phone}</p>
      <h1>Pupile:</h1>
      <PetList />
      <div className="border-b border-white"></div>
      <button onClick={() => setIsAdding(true)}>Dodaj pupila</button>
      <button onClick={handleSignOut}>Log out</button>
      {user.role === "admin" && (
        <button onClick={() => setListOpen(true)}>*Wszystkie Wizyty</button>
      )}
    </div>
  );
}
