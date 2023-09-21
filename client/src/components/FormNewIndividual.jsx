import React from 'react'
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormNewIndividual() {

    const [newIndividual, setNewIndividual] = useState({
        "nickname": "",
        "scientist_tracking": "",
        "species_id": "",
        "created_at": new Date()
    });

    const [dicSpecies, setDicSpecies] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    
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

        const newSpeciesId = event.target.value;
        setSelectedValue(newSpeciesId);
        setNewIndividual((preValue) => ({ ...preValue, species_id: newSpeciesId }));

    }

    function handleChange(event){
        const { value, name } = event.target;
        setNewIndividual((preValue) => ({ ...preValue, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        addNewIndividual(newIndividual);
    }

    const addNewIndividual = async (newIndividual) => {
        try {
            const {nickname, scientist_tracking, species_id, created_at} = newIndividual;

            const body = {nickname, scientist_tracking, species_id, created_at};

            const response = await fetch("http://localhost:3000/individuals", {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            if(response.ok) {console.log("Successfully added new individual")};
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>

            <form className='form-new-individual' onSubmit={handleSubmit}>

                <h2>Add New Individual</h2>

                <input 
                    placeholder='nickname'
                    name = 'nickname'
                    value={newIndividual.nickname}
                    onChange={handleChange}
                />
                <input 
                    placeholder='scientist name'
                    name = 'scientist_tracking'
                    value={newIndividual.scientist_tracking}
                    onChange={handleChange}
                />

                <select value={selectedValue} onChange={handleSelectChange} >
                <option value="" disabled>select a species</option>
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

                <button type='submit'>Add</button>

            </form>
        </div>
    )
}
