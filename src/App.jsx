import React from 'react';
import logo from './logo.svg';
import './App.css';

import './sass/app.scss';

import TopSection from './components/top/index';
import BottomSection from './components/bottom/index';

import axios from 'axios';

const WEATHER_KEY = '41007434f956d19cf5c620784be11b8e';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Copenhagen",
      forecastDays: 5
    }
  }

  componentDidMount() {
    const { cityName, forecastDays } = this.state;
    // http://api.weatherstack.com/forecast ? access_key = YOUR_ACCESS_KEY & query = New York 

    const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${cityName}&days=${forecastDays}`

    axios
      .get(URL)
      .then((res) => {
        return res.data;
      }).then((data) => {
        
      })
      .catch((err) => {
        if(err) {
          console.error("Cannot fetch weather data from API", err);
        }
      })
    }

  render() {
    return <div className="app-container">
      <div className="main-container">
        <div className="top-section">
          <TopSection />
        </div>
        <div className="bottom-section">
          <BottomSection />
        </div>
      </div>
    </div>
  }
}

export default App;
