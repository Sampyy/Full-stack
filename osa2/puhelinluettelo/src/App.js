import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import numbers from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([

  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successStatus, setSuccessStatus] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    let found = false
    persons.forEach(person => {
      if (person.name === newName) {
        found = true
        if (newNumber !== '') {
          numbers.update(person.id, personObject)
          .then(returnPersons => {
            setPersons(persons.map(person => person.name !== personObject.name ? person : returnPersons ))
          }).catch(error => {
            setSuccessStatus(false)
            setErrorMessage(`Person '${person.name}' was already removed`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.name !== newName))
          })
          setSuccessStatus(true)
          setErrorMessage(`Person '${person.name}' number changed successfully to '${personObject.number}'`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          return null
        }
          setErrorMessage(`Person '${person.name}' is already added`)
          setSuccessStatus(false)
          setTimeout(()=> {
            setErrorMessage(null)
          }, 5000)
      }
    })
    if(found === false) {
          console.log('pistetään')
           
          numbers.create(personObject)
          .then(createdPerson => {
            setSuccessStatus(true)
            setErrorMessage(`Person '${createdPerson.name}' added`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
            setPersons(persons.concat(personObject))
          })
          .catch(error => {
            console.log(error.response.data.error)
            setSuccessStatus(false)
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          
        }
  }

  const handleDelete = (id) => {
    numbers.deleteId(id)
    numbers.getAll().then(response => {
      setPersons(persons.filter(person => person.id !== id))
    })
    setSuccessStatus(true)
    setErrorMessage(`Successfully removed`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const hook = () => {
    numbers.getAll().then(response => setPersons(response))
  }

  useEffect(hook, [])

  const handleType = (event) => setNewName(event.target.value)

  const handleNumber = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => setFilter(event.target.value)



  return (
    <div>
      <Notification message={errorMessage} success={successStatus} />
      <h2>Phonebook</h2>    
      filter: <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm newName={newName} newNumber={newNumber} handleType={handleType} handleNumber={handleNumber} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(per => per.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
        <Persons key={person.name} person={person} handleDelete={()=> handleDelete(person.id)}/>)
      }
      </ul>
    </div>
  )

}

export default App
