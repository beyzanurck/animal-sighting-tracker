import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WildlifeObservations from './components/WildlifeObservations';
import Species from './components/Species';
import IndividualsPopup from './components/IndividualsPopup';
import SightingsPopup from './components/SightingsPopup';
import { Link } from 'react-router-dom';


function App() {

  const [observation, setObservation] = useState([]);

  const [show, setShow] = useState({
    "species" : false,
    "individuals" : false,
    "sightings" : false
  });

  const handleVisibility = (type, boolean) => {
    switch(type) {
      case 'species':
        setShow({...show, "species":boolean})
        break;
      case 'individuals':
        setShow({...show, "individuals":boolean})
        break;
      case 'sightings':
        setShow({...show, "sightings":boolean})
        break;
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

            <button onClick={() => handleVisibility('species', true)}>Species</button>
            <button onClick={() => handleVisibility('individuals', true)}>Individuals</button>
            <button onClick={() => handleVisibility('sightings', true)}>Sightings</button>

          </div>

          <Species show = {show.species} onClose={() => handleVisibility('species', false)}/>
          <IndividualsPopup show={show.individuals} onClose={() => handleVisibility('individuals', false)}/>
          <SightingsPopup show={show.sightings} onClose={() => handleVisibility('sightings', false)}/>

          <h4> add new </h4>

          <div className='links'>

            <Link to="/new-species">Species</Link>
            
            <Link to="/new-individual">Individual</Link>
            
            <Link to="/new-sighting">Sighting</Link>


          </div>
      </div>
  )
}

export default App
