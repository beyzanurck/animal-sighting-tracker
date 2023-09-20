import './App.css'
import { useEffect } from 'react';


function App() {

  async function getSpecies() {
    try {
      const response = await fetch('http://localhost:3000/species');

      if(!response.ok) {
        throw new Error('response was not ok');
      }

      const allSpecies = await response.json();
      console.log(allSpecies)
      
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
      console.log(allIndividuals)

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
      console.log(allSightings)

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {getSpecies(), getIndividuals(), getSightings()}, []);

  return (
    <div className="App">
      <h1>Hello</h1>

    </div>
  )
}

export default App
