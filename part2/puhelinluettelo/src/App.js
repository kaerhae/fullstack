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
  const [ successMessage, setSuccessMessage ] = useState('')



  useEffect(() =>  {
    personService
      .getAllPersons()
      .then(response => {
        setPersons(response.data)
      })
}, [])

  console.log('render', persons.length, 'notes')



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
    const lowCased = newName.toLowerCase()
    const personResult = persons.find( ({ name }) => name.toLowerCase() === lowCased)
    const numberResult = persons.find( ({ number }) => number === newNumber)
    console.log(personResult)
    console.log(numberResult)
    const personObject = {
      name: newName,
      number: newNumber,
     
    }


    
    if(personResult)
    {
      if(window.confirm("Haluatko lisätä uuden numeron henkilölle?"))
      {

      
        const name = newName
        const number = newNumber
        console.log(name)
        const findPerson = persons.find(p => p.name === name)
        const returnedId = findPerson.id
        const changedPerson = {...returnedId, name, number}
        

        personService
          .updatePerson(returnedId, changedPerson)
          .then(response => {
            console.log("Done")
          })

       

        
      }
      
    }
    if(!personResult && !numberResult)
    {
      console.log("Ei löydy listalta, lisätään....")
      personService
        .createPerson(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewPerson('')

          setSuccessMessage(
            `Note '${personObject}' was added succesfully to the server`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 11000)
  

        })
    }

}


  const handleDelete = (event) => {
    const id = event.target.value
    const deletedPerson = [...id]
    console.log(deletedPerson)

      if (window.confirm("Are you sure you want to delete " + id))
      {
        personService
      .deletePerson(deletedPerson)
      .then(response => {
       const filtered = persons.filter(person => person.id != deletedPerson)
        setPersons(filtered)
      })
    }



  }



  return (
    <div>
      <Notification message={successMessage} />

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