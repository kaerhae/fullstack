import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Weather = ({country}) => {
  const [ countryData, setCountryData ] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  
  const api_addr = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`
    
  useEffect(() => {
    console.log('Weather effect')
    axios
      .get(api_addr)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountryData(response.data)
      })
  }, [api_addr])
  if(countryData) {
    return (
      <div>
        <h3>Weather in {countryData.location.name}</h3>
        <p><b>Temperature:</b> {countryData.current.temperature} Celsius</p>
        {
          
          countryData.current.weather_icons.map(w =>
             
            <img alt="weather-icon" key={w} src={w} width="10%" height="10%"/>  
          )
        }
        <p><b>Wind:</b> {countryData.current.wind_speed} mph direction {countryData.current.wind_dir}</p>
      </div>
    )
  } else {
    return <div>No weather data available</div>
  }
}

export default Weather