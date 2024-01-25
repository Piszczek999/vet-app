import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import BookPet from "./BookPet";

const months = [
  "Stycznia",
  "Lutego",
  "Marca",
  "Kwietnia",
  "Maja",
  "Czerwca",
  "Lipca",
  "Sierpnia",
  "Września",
  "Października",
  "Listopada",
  "Grudnia",
];

const days = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota",
];

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

  if (isLoading) return <p>Ładowanie...</p>;

  if (isBooking)
    return (
      <BookPet pet={pet} setModalOpen={setModalOpen} setOpen={setIsBooking} />
    );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const dayOfWeek = days[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} ${month}, ${
      dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
    } ${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  return (
    <div className="flex flex-col justify-center gap-10">
      <p className="text-center text-xl">Nadchodzące wizyty</p>
      <div className="flex flex-col gap-2">
        {visits.length > 0 ? (
          visits
            .filter((visit) => visit.date > new Date().getTime())
            .map((visit, i) => (
              <div className="btn bg-gray-500 hover:bg-gray-500" key={i}>
                {formatDate(visit.date)}
              </div>
            ))
        ) : (
          <div className="btn bg-gray-500 hover:bg-gray-500">Brak wizyt</div>
        )}
      </div>

      <button className="btn bg-green-700" onClick={() => setIsBooking(true)}>
        Umów za wizytę
      </button>
    </div>
  );
}
