import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WildlifeObservations from './components/WildlifeObservations';
import Species from './components/Species';


function App() {

  const [individuals, setIndividuals] = useState([]);
  const [sightings, setSightings] = useState([]);
  const [observation, setObservation] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      <h4> see only the table of </h4>

      <div className='buttons'>

        <button onClick={handleShow}>Species</button>
        <button>Individuals</button>
        <button>Sightings</button>

      </div>

      <Species show = {show} onClose = {handleClose}/>

    </div>
  )
}

export default App
