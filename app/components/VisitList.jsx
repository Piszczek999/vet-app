import { collectionGroup, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col">
      <button onClick={() => setOpen(false)}>Wróć</button>
      {visits.map((visit, i) => (
        <p key={i}>{`${new Date(visit.date).toLocaleString()} ${
          visit.description
        }`}</p>
      ))}
    </div>
  );
}
