import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WildlifeObservations from './components/WildlifeObservations';
import Species from './components/Species';
import IndividualsPopup from './components/IndividualsPopup';
import SightingsPopup from './components/SightingsPopup';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';


//move
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {

 

  const [observation, setObservation] = useState([]);

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

   //move
   const [newIndividual, setNewIndividual] = useState({
      "nickname": "",
      "scientist_tracking": "",
      "species_id": 1,
      "created_at": new Date()
    });

  //move
  function handleSelectChange (event) {

    const id = parseInt(event.target.value, 10);
    console.log(id)
    setNewIndividual((preValue) => ({ ...preValue, species_id: id }))
    console.log(newIndividual.species_id)

  }
  const [dicSpecies, setDicSpecies] = useState({});

  async function getSpecies() {
      try {
        const response = await fetch('http://localhost:3000/species');
  
        if(!response.ok) {
          throw new Error('response was not ok');
        }
  
        const allSpecies = await response.json();

        const speciesObj = allSpecies.reduce((accumulator, species) => {
          accumulator[species.common_name] = species.id;
          return accumulator;
      }, {});

      setDicSpecies(speciesObj);
      //console.log(dicSpecies)
  
      } catch (error) {
        console.log(error.message);
      }
  }

  useEffect(() => {
      getSpecies();
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
          <SightingsPopup show={show.sightings} onClose={() => handleClose('sightings')}/>

          <h4> add new </h4>

          <div className='buttons'>

            <button>Species</button>
            <button >Individuals</button>
            <button >Sightings</button>

          </div>

          <form>

            <input placeholder='nickname'/>
            <input placeholder='scientist name'/>

            <select value={""} onChange={handleSelectChange} >
            {
              Object.keys(dicSpecies).length > 0 ?
              Object.entries(dicSpecies).map(([key, value]) => (
                <option key={value} value={value}>{key}</option>
              )) : ` `
            }
            </select>

            <DatePicker
              selected={newIndividual.created_at}
              onChange={(date) => setNewIndividual({ ...newIndividual, created_at: date })}
              showTimeSelect
              dateFormat="Pp"
            />

          </form>

      </div>
   
    
  )
}

export default App
