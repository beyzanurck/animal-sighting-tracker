import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';


export default function SightingsPopup( { show, onClose }) {
    
    const [sightings, setSightings] = useState([]);

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

    useEffect(() => {
        getSightings();
    }, []);


    return (
        <>
        
        <Modal show={show} onHide={onClose} size="lg">

            <Modal.Header closeButton>
            <Modal.Title>Sightings Table</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <table className="wildlife-table">
                    <thead>
                        <tr>

                            <th>Sighting Time</th>
                            <th>Individual Id</th>
                            <th>Location</th>
                            <th>Healthy</th>
                            <th>Email Adress</th>
                            <th>Creation Time</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            sightings.length > 0 ? 
                            sightings.map((item, index) => (
                                <tr>
                                    <td>{item.sighting_timestamp}</td>
                                    <td>{item.individual_id}</td>
                                    <td>{item.location_text}</td>
                                    <td>{item.is_healthy ? "Yes" : "No"}</td>
                                    <td>{item.email_address}</td>
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
