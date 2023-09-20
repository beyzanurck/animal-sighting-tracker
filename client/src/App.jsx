import './App.css'
import { useEffect, useState } from 'react';
import WildlifeObservations from './components/WildlifeObservations';


function App() {

  const [species, setSpecies] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [observation, setObservation] = useState([]);

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

  async function ObserveWildlife() {
    try {
      const response = await fetch('http://localhost:3000');

      if(!response.ok) {
        throw new Error('response was not ok');
      }

      const observation = await response.json();
      setObservation(observation)

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getSpecies();
    getIndividuals();
    getSightings();
    ObserveWildlife();
  }, []);

  return (
    <div className="App">
      <h1>Animal Sighting Tracker</h1>
      <table className="wildlife-table">
        <thead>
          <tr>
            <th>Common Name</th>
            <th>Scientific Name</th>
            <th>Estimated Number</th>
            <th>Nickname</th>
            <th>Scientist Tracking</th>
            <th>Email Address</th>
            <th>Location</th>
            <th>Healthy</th>
          </tr>
        </thead>
        <tbody>
          {observation.length > 0 && observation.map((item, index) => (
            <WildlifeObservations key={index} info={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
