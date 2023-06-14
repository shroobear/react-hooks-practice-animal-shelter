import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const handleChangeType = (e) => {
    setFilters({ type: e.target.value });
  };

  function handleFindPetsClick() {
    let url = "http://localhost:3001/pets";

    if (filters.type !== "all") {
      url += `?type=${filters.type}`
    }

    fetch(url)
      .then((r) => r.json())
      .then((data) => setPets(data))
      .catch((error) => console.log(error));
  }

  const handleAdoptPet = (id) => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === id ? { ...pet, isAdopted: true } : pet))
    );
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={handleFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
