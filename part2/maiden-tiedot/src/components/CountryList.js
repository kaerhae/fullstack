import React from 'react'
import Weather from './Weather'

const CountryList = ({ founded, handleShowCountry }) => {
  
  if(founded.length > 10) {
    return <div>Way too many, specify your search</div>
  } else if (founded.length <= 10 && founded.length > 1) {
    return (
      <div>
        {
          founded.map(f =>
            <div key={f.name}>
              <p key={f.name}>{f.name} <button key={f.name} value={f.name} onClick={handleShowCountry}>Show</button></p>
              
            </div>
          )
        }
      </div>
    )
  } else {
    
    return (
      <div>
        {
          founded.map(f =>
            <div>
              <h1>{f.name}</h1>
              <p>Capital: {f.capital}</p>
              <p>Population: {f.population}</p>

              <h3>Languages</h3>
              <ul>
                {
                  f.languages.map(l => 
                    <li key={l.name}>{l.name}</li>
                  )
                }
              </ul>

              <img alt="flag-icon" src={f.flag} width="20%" height="20%" />
              <Weather country={f.name} />
            </div>
            
          )
        }

        
      </div>
    )
  }
}

export default CountryList