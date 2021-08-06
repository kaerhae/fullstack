import './App.css'
import React, { useEffect, useState } from 'react'
import Filter from './components/filterCountry'
import axios from 'axios'
import CountryList from './components/CountryList'


const App = () => {

  const [ countries, setCountries] = useState([]) 
  const [ newSearch, setNewSearch ] = useState('')
  const [ founded, setFounded ] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => 
  {
    setNewSearch(event.target.value)
    const result = countries.filter(land => 
      land.name.toLowerCase().includes(newSearch.toLowerCase()))
    console.log(result)
    setFounded(result)

    
  }

  const handleShowCountry = (event) => {

    const selectedLand = event.target.value
    const result = countries.filter(land => land.name === selectedLand)
    setFounded(result)


  }

  return (
    <div className="">
      <Filter value={newSearch} onChange={handleFilterChange}/>
      {
        founded &&
        <CountryList founded={founded} handleShowCountry={handleShowCountry} />
      }
    </div>
  )

}



export default App