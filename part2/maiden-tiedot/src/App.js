import './App.css'
import React, { useEffect, useState } from 'react'
import Filter from './components/filterCountry'
import axios from 'axios'
import Check from './components/Check'


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
  console.log('render', countries.length, 'contries')


  const handleFilterChange = (event) => {
    setNewSearch(event.target.value)
    const res = countries.filter(land => land.name.toLowerCase().includes(newSearch.toLowerCase())).map(country => <li key={country.name}>{country.name}</li>)
    setFounded(res)

    
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