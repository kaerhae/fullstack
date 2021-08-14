import './App.css'
import personService from './services/persons'
import React, { useEffect, useState } from 'react'
import Filter from './components/filterPerson'
import Add from './components/addPerson'
import ShowPerson from './components/showAllPersons'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() =>  {
    personService
      .getAllPersons()
      .then(response => {
        setPersons(response.data)
      })
}, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const personResult = persons.find( ({ name }) => 
    name.toLowerCase() === newName.toLowerCase())
    const personObject = 
    {
      name: newName,
      number: newNumber,
    }    
    if(personResult)
    {
      if(window.confirm("Haluatko lisätä uuden numeron henkilölle?"))
      { 
        const name = newName.toLowerCase()
        const number = newNumber
        const findPerson = persons.find(p => p.name.toLowerCase() === name)
        const returnedId = findPerson.id
        console.log(returnedId)
        const changedPerson = {...returnedId, name, number}
        
        personService
          .updatePerson(returnedId, changedPerson)
          .then(response => {
            const filtered = persons.map(person => person.id !== returnedId ? person : response.data)
            console.log(filtered)      
            setPersons(filtered)
            const successMessage = ` '${response.data.name}' was updated succesfully to the server`
            setMessage(successMessage)
            setTimeout(() => {
              setMessage(null)
            }, 11000)
          })
          .catch(error => {
            const errorMessage = `Person was already removed from server`
            setErrorMessage(errorMessage)
            setTimeout(() => {
              setErrorMessage(null)
            }, 11000)
          })
      }
    }
    if(!personResult)
    {
      console.log("Ei löydy listalta, lisätään....")
      personService
        .createPerson(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          const successMessage = ` '${response.data.name}' was added succesfully to the server`
          setMessage(successMessage)
          setTimeout(() => {
            setMessage(null)
          }, 11000)
        })
        .catch(error => {
          const errorMessage = `Error happened`
          setErrorMessage(errorMessage)
          setTimeout(() => {
            setErrorMessage(null)
          }, 11000)
        })
    }
}

  const handleDelete = (event) => {
    const id = event.target.value
    const person = persons.filter(p => p.id === parseInt(id))

      if (window.confirm(`Are you sure you want to delete ${person.map(p => p.name)}?`))
      {
        personService
      .deletePerson(id)
      .then(response => {
        setMessage(
          `${person.map(p => p.name)} was deleted succesfully from the server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 11000)
        const filtered = persons.filter(person => person.id != id)
        setPersons(filtered)   
      })
      .catch(error => {
        const errorMessage = `Person was already removed from server`
        setErrorMessage(errorMessage)
        setTimeout(() => {
          setErrorMessage(null)
        }, 11000)
      })
    }
  }



  return (
    <div>
      <Notification message={message} />
      <ErrorMessage errorMessage={errorMessage} />
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleFilterChange}/>
      <Add 
      onSubmit={handleSubmit}
      nameValue={newName}
      nameHandler={handleNameChange}
      numberValue={newNumber}
      numberHandle={handleNumberChange}
      />

      <h2>Numbers</h2>
      <ShowPerson
        persons={persons}
        newSearch={newSearch}
        onClickHandler={handleDelete}
      />
    </div>
  )

}

export default App
