import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");
  let [submit, setSubmit] = useState(false);
  let [weather, setWeather] = useState("");

  function displayWeather(response) {
    setSubmit(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function weatherData(event) {
    event.preventDefault();
    let apiKey = "56e0818fd22a5efa4a6c31eab2ac96a0";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={weatherData}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={updateCity}
      />
      <button type="Submit">Search</button>
    </form>
  );

  if (submit) {
    return (
      <div className="WeatherApp">
        <h1>Weather App</h1>
        <div>{form}</div>
        <div className="displayWeather">
          <ul>
            <li>Temperature: {Math.round(weather.temperature)}°C</li>
            <li>Description: {weather.description}</li>
            <li>Humidity: 50%</li>
            <li>Wind: {weather.wind}km/h</li>
            <li>
              <img src={weather.icon} alt="icon" />{" "}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="WeatherApp">
        <h1>Weather App</h1>
        <div>{form}</div>
      </div>
    );
  }
}
