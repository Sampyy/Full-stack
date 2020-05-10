import React from 'react'

const PersonForm = ({ newName, newNumber, handleType, handleNumber, addPerson }) => {
    return (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleType}/>
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
    )
}

export default PersonForm