import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import PetModal from "./PetModal";
import PetProfile from "./PetProfile";

export default function PetList() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getPets = async () => {
      try {
        const pets = await getDocs(
          collection(db, `users/${auth.currentUser.uid}/pets`)
        );
        setPets([]);
        pets.forEach((pet) =>
          setPets((pre) => [...pre, { ...pet.data(), id: pet.id }])
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };
    getPets();
  }, []);

  const handleOpen = (id) => {
    setSelectedPet(pets.find((pet) => pet.id == id));
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;

  if (pets.length === 0) return <p>Brak pupili</p>;

  return (
    <div className="flex flex-col gap-2 overflow-y-scroll max-h-[350px]">
      {pets.map((pet) => (
        <button
          className="btn bg-blue-500"
          key={pet.id}
          onClick={() => handleOpen(pet.id)}
        >
          <p>{`${pet.species} ${pet.name}`}</p>
        </button>
      ))}
      <PetModal isOpen={modalOpen} onClose={handleClose}>
        <PetProfile pet={selectedPet} setModalOpen={setModalOpen} />
      </PetModal>
    </div>
  );
}
