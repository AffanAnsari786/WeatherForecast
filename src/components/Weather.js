import React, { useEffect, useState } from 'react'
import WeatherUI from './WeatherUI';

function Weather() {
  const [searchValue, setSerchValue] = useState('Mumbai');
  const [tempInfo, setTempInfo] = useState({});

  const getweatherinfo = async() =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9f0cb81467e9e6dcba61706358bc6d1d`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;

      const myNewWeatherInfo = {
        temp, humidity, pressure, weathermood, name, speed, country, sunset
      }
      
      setTempInfo(myNewWeatherInfo)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getweatherinfo();
  },[])
  return (
    <>
    <header className='header'>
        <h1></h1>
        {/* <img src='2.jpg' alt='Loading...' /> */}
        <nav className='navigation'>
            <a href='#'>Home</a>
            <a href='#'>Career</a>
            <a href='#'>About</a>
            <a href='#'>Contact us</a>
        </nav>
    </header>

    

    <div className='wrap'>
        <div className='search'>
            <input type='text' placeholder='Search...' value={searchValue} onChange={(e)=>setSerchValue(e.target.value)} autoFocus></input>
        </div>
        <button className='searchbutton' type='button' onClick={getweatherinfo}>Search</button>
    </div>

    <WeatherUI tempInfo={tempInfo} />  
    </>
  )
}

export default Weather