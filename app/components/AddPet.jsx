import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";

export default function AddPet({ setOpen }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [race, setRace] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPet = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPet = {
        name: name,
        species: species,
        race: race,
      };
      await addDoc(
        collection(db, `users/${auth.currentUser.uid}/pets`),
        newPet
      );
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={async (e) => await handleAddPet(e)}
    >
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        placeholder="imię"
        autoComplete="off"
      />
      <input
        type="text"
        onChange={(e) => setSpecies(e.target.value)}
        placeholder="gatunek"
        autoComplete="off"
      />
      <input
        type="text"
        onChange={(e) => setRace(e.target.value)}
        placeholder="rasa"
        autoComplete="off"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Dodawanie..." : "Dodaj pupila"}
      </button>
      <button type="button" onClick={() => setOpen(false)}>
        Wróć
      </button>
    </form>
  );
}
