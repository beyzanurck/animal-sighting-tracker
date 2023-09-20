import React from 'react'

export default function WildlifeObservations( { info } ) {
  return (
    <tr>
        <td>{info.common_name}</td>
        <td>{info.scientific_name}</td>
        <td>{info.estimated_number}</td>
        <td>{info.nickname}</td>
        <td>{info.scientist_tracking}</td>
        <td>{info.email_address}</td>
        <td>{info.location_text}</td>
        <td>{info.is_healthy ? "Yes" : "No"}</td>
  </tr>
  )
}
