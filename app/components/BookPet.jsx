import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { auth, db } from "../firebase";

const availableHours = [
  10 * 60 * 60 * 1000,
  11 * 60 * 60 * 1000,
  12 * 60 * 60 * 1000,
  13 * 60 * 60 * 1000,
  14 * 60 * 60 * 1000,
  15 * 60 * 60 * 1000,
  16 * 60 * 60 * 1000,
  17 * 60 * 60 * 1000,
];

export default function BookPet({ pet, setModalOpen, setOpen }) {
  const [date, setDate] = useState(new Date());
  const [dateChosen, setDateChosen] = useState(false);
  const [visits, setVisits] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const visitsQuery = query(collectionGroup(db, "visits"));
        const visits = await getDocs(visitsQuery);
        setVisits([]);
        visits.forEach((visit) => setVisits((pre) => [...pre, visit.data()]));
      } catch (error) {
        console.error(error);
      }
    };
    getVisits();
  }, []);

  const handleAddVisit = async () => {
    const newVisit = {
      date: date + time,
      desc: "now",
    };
    try {
      await addDoc(
        collection(db, `users/${auth.currentUser.uid}/pets/${pet.id}/visits`),
        newVisit
      );
    } catch (error) {
      console.error(error);
    }
    setModalOpen(false);
  };

  if (dateChosen)
    return (
      <div className="flex flex-col">
        <button onClick={() => setDateChosen(false)}>Wróć</button>
        {availableHours.map((hour) => {
          const isFree =
            visits.findIndex((visit) => visit.date == date + hour) == -1;
          return (
            <div key={hour}>
              {isFree ? (
                <p onClick={() => setTime(hour)}>
                  {new Date(date + hour).toLocaleTimeString()}
                </p>
              ) : (
                <p className="text-red-600">
                  {new Date(date + hour).toLocaleTimeString()}
                </p>
              )}
            </div>
          );
        })}
        <button onClick={handleAddVisit} disabled={!time}>
          Zapisz
        </button>
      </div>
    );
  else
    return (
      <div className="flex flex-col">
        <button onClick={() => setOpen(false)}>Wróć</button>
        <Calendar
          onChange={(e) => setDate(e.getTime())}
          value={[new Date(), new Date(Date.now() + 14 * 86400000)]}
          tileDisabled={(tile) =>
            tile.date.getTime() < Date.now() ||
            tile.date.getTime() >= Date.now() + 14 * 86400000 ||
            [0, 6].includes(tile.date.getDay())
          }
          onClickDay={() => setDateChosen(true)}
        />
      </div>
    );
}
