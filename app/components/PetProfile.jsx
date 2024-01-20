import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import BookPet from "./BookPet";

export default function PetProfile({ pet, setModalOpen }) {
  const [visits, setVisits] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVisits = async () => {
      try {
        setIsLoading(true);
        const visits = await getDocs(
          collection(db, `users/${auth.currentUser.uid}/pets/${pet.id}/visits`)
        );
        setVisits([]);
        visits.forEach((visit) => setVisits((pre) => [...pre, visit.data()]));
      } catch (error) {
        console.error("Error fetching visit data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getVisits();
  }, [pet.id]);

  if (isLoading) return <p>Loading...</p>;

  if (isBooking)
    return (
      <BookPet pet={pet} setModalOpen={setModalOpen} setOpen={setIsBooking} />
    );

  return (
    <div className="flex flex-col">
      <h1>Wizyty:</h1>
      {visits.length > 0 ? (
        visits.map((visit, i) => (
          <p key={i}>{new Date(visit.date).toLocaleString()}</p>
        ))
      ) : (
        <p>Brak wizyt</p>
      )}
      <button onClick={() => setIsBooking(true)}>Umów za wizytę</button>
    </div>
  );
}
