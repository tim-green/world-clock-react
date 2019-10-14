import React,
        { useState,
          useEffect  } from "react";
import * as moment from 'moment';
import "moment-timezone";
import "../assets/scss/_city.scss";
import { updateExpression } from "@babel/types";

// FIXME: window.setInterval(updateLocaTime(),5000);
// FIXME: bgImg is not used


function City(props) {
  const [ {name, timeZone, currentTime, bgImg, weatherId} ] = useState(props);
  const [weatherData, setWeatherData] = useState({});
  const [localTime, setLocalTime] = useState(currentTime.tz(timeZone).format('hh:mm dddd'));
  const [currentHour] = useState(currentTime.tz(timeZone).format('hh'));
  const [open, setToggleOpen] = useState(false);
  const [bgGradient, setGradient] = useState('');
 
  const getWeatherInfo = async (id) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=f594268c9cc670ce8c73dc8b4ce4f00e`;
      const res = await fetch(url).then(res => res.json());
      const weatherInfo = { "temp": res.main.temp,
                            "desc": res.weather[0].main,
                            "icon": `${res.weather[0].icon}.png`,
                          };
      return setWeatherData(weatherInfo);
  }

  const getBgGradient = (hour) => {
          if (hour < 3) {
            return setGradient('night-2');
        } else if (hour < 6) {
            return setGradient('dawn');
        } else if (hour < 9) {
            return setGradient('morning');
        } else if (hour < 12) {
            return setGradient('afternoon-1');
        } else if (hour < 15) {
            return setGradient('afternoon-2');
        } else if (hour < 18) {
            return setGradient('evening-1');
        } else if (hour < 21) {
            return setGradient('evening-2');
        } else if (hour < 24) {
            return setGradient('night-1');
        };
  }

  const updateLocaTime = () => {
    setLocalTime(currentTime.tz(timeZone).format("dddd HH:mm"));
  };

  useEffect(() => {
    getWeatherInfo(weatherId);
    // window.setInterval(updateLocaTime(),5000);
    getBgGradient(currentHour);
  });

  return (
    <div
      className={`panel ${open ? "open" : ""} ${bgGradient}`}
      onClick={() => setToggleOpen(!open)}
    >
      <div>
        <h2>{name}</h2>
        <p>{localTime}</p>
      </div>
      <div className="weather-icon">
        <i className={weatherData.icon}></i>
        {weatherData.temp ? (
          <span>
            {" "}
            {weatherData.desc} {weatherData.temp}°C{" "}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );  
}

export default City;