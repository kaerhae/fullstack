import './App.css'
import React, { useState } from 'react'
import Filter from './components/filterPerson'
import Add from './components/addPerson'
import ShowPerson from './components/showAllPersons'



const App = () => {
  
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040012341234"
    },
    { name: 'Herra esimerkki',
      number: "9439494" 
    },
    { name: 'Rouva',
      number: '3333'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')


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