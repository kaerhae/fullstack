import './App.css'
import React, { useEffect, useState } from 'react'
import Filter from './components/filterCountry'
import axios from 'axios'
import Check from './components/Check'


const App = () => {
  


  const api_key = process.env.REACT_APP_API_KEY

  // 070c9b88a188f7d6ba73e90462e8c789
  
  const api_addr = http://api.weatherstack.com/current?access_key='$api_key'&query=Sweden
    
    

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
  console.log('render', countries.length, 'contries')


  useEffect(() => {
    console.log('effect')
    axios
      .get('')
  })


  const handleFilterChange = (event) => 
  {
    setNewSearch(event.target.value)
    const result = countries.filter(land => 
      land.name.toLowerCase().includes(newSearch.toLowerCase())).map(country => 
      <div>
        <li key={country.name}>{country.name}</li>
        <button value={country.name} onClick={handleShowCountry}>Show</button>
      </div>)
    setFounded(result)

    
  }

  const handleShowCountry = (event) => {

    const selectedLand = event.target.value

    const result = countries.filter(land => land.name === selectedLand).map(country => country.name)

    setFounded(result)


  }

  return (
    <div className="">
      <Filter value={newSearch} onChange={handleFilterChange}/>


    <ul>
      <Check
      countries={countries}
      newSearch={newSearch}
      founded={founded}
      />
    </ul>
    </div>
  )

}



export default App