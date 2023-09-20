import React from 'react'

export default function WildlifeObservations( { info } ) {
  return (
    <div className="wildlife-obs">
      <p> {info.common_name} </p>
      <p> {info.scientific_name} </p>
      <p> {info.estimated_number} </p>
      <p> {info.nickname} </p>
      <p> {info.scientist_tracking} </p>
      <p> {info.email_address} </p>
      <p> {info.location_text} </p>
      <p> {info.is_healthy ? "Yes" : "No"} </p>
    </div>
  )
}
