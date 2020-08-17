import React,{useState} from 'react';
import './App.css';

const api= {
  key  : process.env.REACT_APP_API_KEY,
  base :  "https://api.openweathermap.org/data/2.5/"
  //"https://api.openweathermap.org/data/2.5/weather?q=Mumbai&APPID=d88bb7bb970773f794fe4bf13445df7d"
}
  //https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&APPID=d88bb7bb970773f794fe4bf13445df7d

function App() {
  const[query,setQuery]=useState('');
  const[weather,setWeather ]=useState({});

  const search= evt =>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res=>res.json())
        .then(result=>{
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }
  
  const dateBuilder = (d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let month=months[d.getMonth()];
    let date=d.getDate();
    let year=d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`
  }


  return (
    
    <div className={(typeof weather.main != "undefined")? ((weather.main.temp>20)?'app warm':'app cold')
                   : 'app'}>
      <main>
        <div className="title">Weather App</div>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search by City or Country"
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        { (typeof weather.main != "undefined")?(
          <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div> 
              </div>

            <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ):("") }
      </main>
    </div>

    
  );
}

export default App;
