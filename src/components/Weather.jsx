import './Weather.css'
import { useState,useRef, useEffect } from "react";
import moment from 'moment';

const Weather = () => {
  //const [weather, setWeather] = useState(false);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const inputRef = useRef()
  const [weather, setWeather] = useState(false);
  

  const search = async (city) => {
    try {
      const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data)
      setWeather({
          location: data.location.name,
          country: data.location.country,
          today: data.current.last_updated,
          temperature: Math.round(data.current.temp_c),
          precip: data.current.precip_mm,
          humidity: data.current.humidity,
          icon: data.current.condition.icon,
          text: data.current.condition.text,
          wind: data.current.wind_kph
        })
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
  }

  useEffect(() => {
    search("London");
  },[])

  return (
    <div className="weather">
        <div className="search-bar">
        <input ref={inputRef} type="text" className="search-bar" placeholder='Search the country/city' />
        <button type="button" onClick={()=>search(inputRef.current.value)}>Enter</button>
         </div>
        
         <div className="result">
                 
          {/* LEFT SIDE CONTAINER */}
          <div className="left">
          <b>{moment(weather.today).format("dddd")}</b>
          <p>{moment(weather.today).format("D MMM YY")}</p>
          <p>{weather.location}, {weather.country}</p>
          <p><img src={weather.icon}></img></p>
          <p className="temp">{weather.temperature}°C</p>
          <p>{weather.text}</p>
          </div>

          {/* RIGHT SIDE CONTAINER */}
          <div className="right">
          <p>PRECIPITATION: {weather.precip}%</p>
          <p>HUMIDITY:{weather.humidity}%</p>
          <p>WIND:{weather.wind} km/h</p>
          </div>

         </div>
    </div>

  );
};

export default Weather;

