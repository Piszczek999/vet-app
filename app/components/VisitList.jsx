import { collectionGroup, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

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

export default function VisitList({ setOpen }) {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVisits = async () => {
      try {
        setIsLoading(true);
        const visitsQuery = query(collectionGroup(db, "visits"));
        const visits = await getDocs(visitsQuery);
        setVisits([]);
        visits.forEach((visit) => setVisits((pre) => [...pre, visit.data()]));
      } catch (error) {
        console.error("Error fetching visit data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getVisits();
  }, []);

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

  if (isLoading) return <p>Ładowanie...</p>;

  return (
    <div className="flex flex-col gap-5">
      <button className="btn bg-gray-600" onClick={() => setOpen(false)}>
        Wróć
      </button>
      <div className="flex flex-col gap-1">
        {visits
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .filter((visit) => visit.date > new Date().getTime())
          .map((visit, i) => (
            <p className="btn bg-gray-500" key={i}>{`${formatDate(
              visit.date
            )} ${visit.description}`}</p>
          ))}
      </div>
    </div>
  );
}
