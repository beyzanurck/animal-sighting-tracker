import React from 'react'
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormNewIndividual() {

    const [newIndividual, setNewIndividual] = useState({
        "nickname": "",
        "scientist_tracking": "",
        "species_id": 1,
        "created_at": new Date()
    });

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

    function handleSelectChange (event) {

        const id = parseInt(event.target.value, 10);
        console.log(id)
        setNewIndividual((preValue) => ({ ...preValue, species_id: id }))
        console.log(newIndividual.species_id)
    }

    return (
        <div>
            <form className='form-new-individual'>

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
