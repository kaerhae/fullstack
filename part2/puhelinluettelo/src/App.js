import './App.css'
import React, { useEffect, useState } from 'react'
import Filter from './components/filterPerson'
import Add from './components/addPerson'
import ShowPerson from './components/showAllPersons'
import axios from 'axios'


const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
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
    event.preventDefault()
    const lowCased = newName.toLowerCase()
    const personResult = persons.find( ({ name }) => name.toLowerCase() === lowCased)
    const numberResult = persons.find( ({ number }) => number === newNumber)
    
    if(personResult)
    {
      alert(newName + " is already added to phonebook")
      
    }
    if(!personResult && !numberResult)
    {
      console.log("Ei löydy listalta, lisätään....")
    }

    if(numberResult)
    {
      alert(newNumber + " is already used")
    }



}


  return (
    <div className="">
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
      />
    </div>
  )

}

export default App