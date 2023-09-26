import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';


export default function Species( { show, onClose }) {
    
    const [species, setSpecies] = useState([]);

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

    useEffect(() => {
        getSpecies();
    }, []);



    return (
        <>
        
        <Modal show={show} onHide={onClose} size="lg">

            <Modal.Header closeButton>
            <Modal.Title>Species Table</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <table className="wildlife-table">
                    <thead>
                        <tr>
                            <th>Common Name</th>
                            <th>Scientific Name</th>
                            <th>Estimated Number</th>
                            <th>Conservation Code</th>
                            <th>Creation Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            species.length > 0 ? 
                            species.map((item, index) => (
                                <tr>
                                    <td>{item.common_name}</td>
                                    <td>{item.scientific_name}</td>
                                    <td>{item.estimated_number}</td>
                                    <td>{item.conservation_code}</td>
                                    <td>{item.created_at}</td>
                                </tr>
                            )) : ` `
                        }
                    </tbody>

                </table>

            </Modal.Body>
            
            <Modal.Footer>

            <Button variant="secondary" onClick={onClose}>
                Close
            </Button>

            </Modal.Footer>

        </Modal>
        </>
    )
}
