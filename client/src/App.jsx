import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WildlifeObservations from './components/WildlifeObservations';
import Species from './components/Species';
import IndividualsPopup from './components/IndividualsPopup';


function App() {

  const [sightings, setSightings] = useState([]);
  const [observation, setObservation] = useState([]);

  // const [show, setShow] = useState(false);
  const [show, setShow] = useState({
    "species" : false,
    "individuals" : false,
    "sightings" : false
  });

  const handleClose = (type) => {
    switch(type) {
      case 'species':
        setShow({...show, species: false})
        break;
      case 'individuals':
        setShow({...show, individuals: false})
        break;
      case 'sightings':
        setShow({...show, sightings: false})
        break;
      default:
        setShow({
          species: false,
          individuals: false,
          sightings: false
        });
    }
  };
  
  const handleShow = (type) => {
    switch(type) {
      case 'species':
        setShow({...show, "species":true})
        break;
      case 'individuals':
        setShow({...show, "individuals":true})
        break;
      case 'sightings':
        setShow({...show, "sightings":true})
        break;
      default:
        // default case if needed
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

        <button onClick={() => handleShow('species')}>Species</button>
        <button onClick={() => handleShow('individuals')}>Individuals</button>
        <button onClick={() => handleShow('sightings')}>Sightings</button>

      </div>

      <Species show = {show.species} onClose={() => handleClose('species')}/>
      <IndividualsPopup show={show.individuals} onClose={() => handleClose('individuals')}/>

    </div>
  )
}

export default App
