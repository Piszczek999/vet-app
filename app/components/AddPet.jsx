import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebase";

const speciesList = [
  "Pies",
  "Kot",
  "Królik",
  "Świnka morska",
  "Chomik",
  "Inny",
];
const genderList = ["Samiec", "Samica", "Nie wiem"];

export default function AddPet({ setOpen }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [otherSpecies, setOtherSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPet = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newPet = {
        name: name,
        species: species == "Inny" ? otherSpecies : species,
        gender: gender,
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
      className="flex flex-col justify-between grow"
      onSubmit={(e) => handleAddPet(e)}
    >
      <div className="flex flex-col gap-3">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Imię"
          autoComplete="off"
        />
        {species === "Inny" ? (
          <input
            type="text"
            onChange={(e) => setOtherSpecies(e.target.value)}
            placeholder="Gatunek"
            autoComplete="off"
          />
        ) : (
          <select
            onChange={(e) => setSpecies(e.target.value)}
            value={species}
            placeholder="Gatunek"
            className="text-gray-700 bg-gray-300 px-3 py-2 rounded-xl min-w-[200px]"
          >
            <option value="" disabled>
              Wybierz gatunek
            </option>
            {speciesList.map((speciesOption, index) => (
              <option key={index} value={speciesOption}>
                {speciesOption}
              </option>
            ))}
          </select>
        )}

        <select
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          placeholder="Płeć"
          className="text-gray-700 bg-gray-300 px-3 py-2 rounded-xl min-w-[200px]"
        >
          <option value="" disabled className="text-gray-500">
            Wybierz płeć
          </option>
          {genderList.map((gender, i) => (
            <option key={i} value={gender} className="text-black">
              {gender}
            </option>
          ))}
        </select>
        <input
          type="text"
          onChange={(e) => setRace(e.target.value)}
          placeholder="Rasa (Opcjonalne)"
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-3">
        <button
          className="btn bg-green-700"
          type="submit"
          disabled={
            isSubmitting ||
            !name ||
            !gender ||
            !species ||
            (species == "Inny" && !otherSpecies)
          }
        >
          {isSubmitting ? "Dodawanie..." : "Dodaj pupila"}
        </button>
        <button
          className="btn bg-gray-600"
          type="button"
          onClick={() => setOpen(false)}
        >
          Wróć
        </button>
      </div>
    </form>
  );
}
