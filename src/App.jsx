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
      days: 5,
      isLoading: true
    }
  }

  updateWeather() {
    const { cityName, days } = this.state;

    const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${cityName}&days=${days}`

    axios
      .get(URL)
      .then((res) => {
        console.log(res.data)
        return res.data;
      }).then((data) => {
        this.setState({ 
          isLoading: false,
          temperature: data.current.temperature,
          isDay: data.current.is_day,
          text: data.current.weather_descriptions[0],
          iconURL: data.current.weather_icons[0],
          forecastDays: data.forecast
        })
      })
      .catch((err) => {
        if(err) {
          console.error("Cannot fetch weather data from API", err);                                                               
        }                                 
      });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", (data) => {
      this.setState({ cityName: data }, () => this.updateWeather()); // pass updateWeather as callback to state change
      
      // console.log("Location name: ", data);
    })

  }

  render() {

    const { isLoading, cityName, temperature, isDay, text, iconURL, forecastDays } = this.state;

    return <div className="app-container">
      <div className="main-container">
        {isLoading && <h3>Loading Weather...</h3> }
        {!isLoading &&
          <div className="top-section">
            <TopSection 
              location={cityName} 
              temperature={temperature} 
              isDay={isDay} 
              text={text} 
              iconURL={iconURL}
              eventEmitter={this.props.eventEmitter}
            />
          </div>
        }

        <div className="bottom-section">
          <BottomSection forecastDays={forecastDays}/>
        </div>
      </div>
    </div>
  }
}

export default App;
