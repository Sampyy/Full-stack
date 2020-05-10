import React from 'react'


const Persons = ({person, filter, handleDelete}) => {
    return(
    <li key={person.name}>{person.name} {person.number}
          <button onClick={handleDelete}>Delete</button></li>
    )
}

export default Persons