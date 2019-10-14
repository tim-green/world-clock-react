import React,
        { Component, 
          useState,
          useEffect } from "react";
import * as moment from 'moment';
import City from "./components/city";


function WeatherApp() {
  const [currentTime] = useState(moment());
  const [cities] = useState({'Austin' : {weatherId: 5016884,
                                          timeZone: 'America/Chicago'
                                        },
                            'London': {weatherId: 2643743,
                                      timeZone: 'Europe/London'
                                        },
                            'Sydney': {weatherId: 2147714,
                                      timeZone: 'Australia/Sydney'
                                        },
                            'Los Angeles': {weatherId: 5368361,
                                        timeZone: 'America/Los_Angeles'
                                        },
                                      })                                   
  useEffect(() => {
    window.setInterval = currentTime/5000;
  });

  return (
      <div className="panels">
        {
          Object
            .keys(cities)
            .map(cityName =>
                 <City name={cityName}
                       weatherId = {cities[cityName].weatherId}
                       timeZone = {cities[cityName].timeZone}
                       bgImg = {cities[cityName].bgImg}
                       currentTime = {currentTime}
                       key={cityName}
                 />)
        }
      </div>
    )
}

export default WeatherApp;
