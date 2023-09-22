import React from 'react'
import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormNewSighting() {

    const [newSighting, setNewSighting] = useState({
        "sighting_timestamp": "",
        "individual_id": "",
        "location_text": "",
        "is_healthy" : true,
        "email_address": "",
        "created_at": new Date()
    });

    const [dicSighting, setDicSighting] = useState({});
    const [selectedValue, setSelectedValue] = useState({
        "individual_id" : "",
        "is_healthy" : "Yes"
    });
    
    async function getIndividuals() {
        try {

            const response = await fetch('http://localhost:3000/individuals');
    
            if(!response.ok) {
            throw new Error('response was not ok');
            }
    
            const allIndividuals = await response.json();

            const speciesObj = allIndividuals.reduce((accumulator, species) => {
                accumulator[species.common_name] = species.id;
            return accumulator;

        }, {});

        setDicSighting(speciesObj);
        //console.log(dicSpecies)
    
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getIndividuals();
    }, []);

    function handleSelectChange (event) {

        const newIndividualId = event.target.value;
        setSelectedValue(newIndividualId);
        setNewSighting((preValue) => ({ ...preValue, individual_id: newIndividualId }));

    }

    function handleChange(event){
        const { value, name } = event.target;
        setNewSighting((preValue) => ({ ...preValue, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        addNewSighting(newSighting);
    }

    const addNewSighting = async (newSighting) => {
        try {
            const {sighting_timestamp, individual_id, location_text, is_healthy, email_address, created_at} = newSighting;

            const body = {sighting_timestamp, individual_id, location_text, is_healthy, email_address, created_at};

            const response = await fetch("http://localhost:3000/sightings", {
                method : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            if(response.ok) {console.log("Successfully added new sighting")};
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>

            <form className='form-new-sighting' onSubmit={handleSubmit}>

                <h2>Add New Sighting</h2>

                <input 
                    placeholder='sighting time'
                    name = 'sighting_timestamp'
                    value={newSighting.sighting_timestamp}
                    onChange={handleChange}
                />
                <input 
                    placeholder='location'
                    name = 'location_text'
                    value={newSighting.location_text}
                    onChange={handleChange}
                />

                <input 
                    placeholder='email adress'
                    name = 'email_address'
                    value={newSighting.email_address}
                    onChange={handleChange}
                />


                <select value={selectedValue} onChange={handleSelectChange} >
                    <option key={1} value={true}>{"Yes"}</option>
                    <option key={2} value={false}>{"No"}</option>
                </select>


                <select value={selectedValue} onChange={handleSelectChange} >
                <option value="" disabled>select a species</option>
                {
                    Object.keys(dicSighting).length > 0 ?
                    Object.entries(dicSighting).map(([key, value]) => (
                        <option key={value} value={value}>{key}</option>
                    )) : ` `
                }
                </select>

                <DatePicker
                selected={newSighting.created_at}
                onChange={(date) => setNewSighting({ ...newSighting, created_at: date })}
                showTimeSelect
                dateFormat="Pp"
                />

                <button type='submit'>Add</button>
                {/* test for PR!!! */}

            </form>
        </div>
    )
}
