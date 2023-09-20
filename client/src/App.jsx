import './App.css'
import { useEffect, useState } from 'react';


function App() {

  const [species, setSpecies] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);

  async function getSpecies() {
    try {
      const response = await fetch('http://localhost:3000/species');

      if(!response.ok) {
        throw new Error('response was not ok');
      }

      const allSpecies = await response.json();
      setSpecies(allSpecies);

    } catch (error) {
      console.log(error.message);
    }
  }

  async function getIndividuals() {
    try {
      const response = await fetch('http://localhost:3000/individuals');

      if(!response.ok) {
        throw new Error('response was not ok');
      }

      const allIndividuals = await response.json();
      setIndividuals(allIndividuals)

    } catch (error) {
      console.log(error.message);
    }
  }

  async function getSightings() {
    try {
      const response = await fetch('http://localhost:3000/sightings');

      if(!response.ok) {
        throw new Error('response was not ok');
      }

      const allSightings = await response.json();
      setSightings(allSightings)

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getSpecies();
    getIndividuals();
    getSightings();
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>

      <p> {species.length > 0 ? species[0]["common_name"] : ` `} </p>
      <p> {individuals.length > 0 ? individuals[0]["nickname"] : ` `} </p>
      <p> {sightings.length > 0 ? sightings[0]["created_at"] : ` `} </p>

    </div>
  )
}

export default App
