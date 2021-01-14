import React from 'react'

const Check = (props) => {


  
  
  
    if (props.founded.length < 2 && props.founded.length > 0)
    {
  
      const header = props.countries.filter(land => land.name.toLowerCase().includes(props.newSearch.toLowerCase())).map(country => <h1 key={country.name}>{country.name}</h1>)
  
      const capital = props.countries.filter(land => land.name.toLowerCase().includes(props.newSearch.toLowerCase())).map((country) => <p key={country.capital}>Capital: {country.capital}</p>)
  
      const population = props.countries.filter(land => land.name.toLowerCase().includes(props.newSearch.toLowerCase())).map((country) => <p key={country.population}>Population: {country.population}</p>)
  
  
      const lang = props.countries.filter(land => land.name.toLowerCase().includes(props.newSearch.toLowerCase())).map((country)=> country.languages.map((lang) => <p key={lang.nativeName}>{lang.nativeName}</p>) )
  
  
      const img = props.countries.filter(land=> land.name.toLowerCase().includes(props.newSearch.toLowerCase())).map((country) => <img src={country.flag} alt="Country flag" width="40%" height="40%" key={country.flag}></img>)
  
      return (
        <div>
        {header}
        
        {capital}
        {population}
        <h2>Languages</h2>
        {lang}
        {img}
        </div>
      )
    }
  
    return (
      <div>
      {props.founded}
      </div>
      )
  }


  export default Check

