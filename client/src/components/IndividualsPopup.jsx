import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';


export default function individualsPopup( { show, onClose }) {
    
    const [individuals, setIndividuals] = useState([]);


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

    useEffect(() => {
        getIndividuals();
    }, []);



    return (
        <>
        
        <Modal show={show} onHide={onClose} size="lg">

            <Modal.Header closeButton>
            <Modal.Title>Individuals Table</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <table className="wildlife-table">
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>Scientific Name</th>
                            <th>Species Id</th>
                            <th>Creation Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            individuals.length > 0 ? 
                            individuals.map((item, index) => (
                                <tr>
                                    <td>{item.nickname}</td>
                                    <td>{item.scientist_tracking}</td>
                                    <td>{item.species_id}</td>
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
