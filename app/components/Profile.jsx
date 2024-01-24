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

  if (isLoading) return <p>Ładowanie...</p>;
  if (isAdding) return <AddPet setOpen={setIsAdding} />;
  if (listOpen) return <VisitList setOpen={setListOpen} />;
  return (
    <div className="flex flex-col justify-between grow">
      <div>
        <p className="text-center text-2xl">{`Witaj ${user.firstname}!`}</p>
        {user.role === "admin" && (
          <p className="text-center text-2xl">Administrator</p>
        )}
      </div>
      <div>
        <p className="text-center mb-3 text-xl">Wybierz pupila</p>
        <PetList />
      </div>

      <div className="flex flex-col gap-5">
        <button className="btn bg-green-700" onClick={() => setIsAdding(true)}>
          Dodaj pupila
        </button>
        <button className="btn bg-gray-600" onClick={handleSignOut}>
          Wyloguj
        </button>
        {user.role === "admin" && (
          <button
            className="btn bg-green-700"
            onClick={() => setListOpen(true)}
          >
            *Wszystkie Wizyty
          </button>
        )}
      </div>
    </div>
  );
}
