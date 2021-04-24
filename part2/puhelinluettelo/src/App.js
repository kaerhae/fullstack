import './App.css'
import personService from './services/persons'
import React, { useEffect, useState } from 'react'
import Filter from './components/filterPerson'
import Add from './components/addPerson'
import ShowPerson from './components/showAllPersons'
import Notification from './components/Notification'

const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ newPerson,  setNewPerson ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() =>  {
    personService
      .getAllPersons()
      .then(response => {
        setPersons(response.data)
      })
}, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
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
        const changedPerson = {...returnedId, name, number}
        
        personService
          .updatePerson(returnedId, changedPerson)
          .then(response => {
            const filtered = persons.map(person => person.id != returnedId ? returnedId : response.data)         
            setPersons(filtered)
            const successMessage = ` '${response.data.name}' was updated succesfully to the server`
            setMessage(successMessage)
            setTimeout(() => {
              setMessage(null)
            }, 11000)
          })
          .catch(error => {
            const errorMessage = `Person was already removed from server`
            setMessage(errorMessage)
            setTimeout(() => {
              setMessage(null)
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
          setNewPerson('')
          const successMessage = ` '${response.data.name}' was added succesfully to the server`
          setMessage(successMessage)
          setTimeout(() => {
            setMessage(null)
          }, 11000)
  

        })
    }
}



  const handleDelete = (event) => {
    const id = event.target.value
    const pid = persons.filter(n => {
      return n.id === id
    })

    const pName = pid.map(n => n.name)

      if (window.confirm("Are you sure you want to delete " + pName))
      {
        personService
      .deletePerson(id)
      .then(response => {
        
        setMessage(
          ` '${pName}' was deleted succesfully from the server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 11000)
        const filtered = persons.filter(person => person.id != id)
        setPersons(filtered)   
      })
    }
  }



  return (
    <div>
      <Notification message={message} />

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