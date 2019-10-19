import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './sass/app.scss';

import WeatherNow from './components/dashboard/weather-now/weather'
import WeatherLocation from './components/dashboard/weather-now/index';
import WeatherTomorrow from './components/dashboard/weather-tomorrow/index';
import FormPage from './components/form/index';

import Clock from 'react-live-clock'; 
import axios from 'axios';

// var ReactFitText = require('react-fittext');



const WEATHER_KEY = '41007434f956d19cf5c620784be11b8e';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Copenhagen",
      days: 5,
      isLoading: true,
      firstName: ""
    }
  }

  updateWeather() {
    const { cityName, days } = this.state;

    const URL = `http://api.weatherstack.com/forecast?access_key=${WEATHER_KEY}&query=${cityName}&days=${days}`

    axios
      .get(URL)
      .then((res) => {
        // console.log(res.data)
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

  handleUserSubmit = ({ firstName }) => {
    this.setState({ firstName });
  }

  render() {

    const { isLoading, cityName, temperature, isDay, text, iconURL, forecastDays, firstName } = this.state;

    return (
      <Router>
        <div className="app-container">

          <Switch>
            <Route exact path="/" component={(props) => <FormPage {...props} onUserSubmit={this.handleUserSubmit} />} /> 

            <Route exact path="/dashboard">

              <div className="header-container">
                <div className="header-greeting-time">
                  <p className="hello">Howdy, {this.state.firstName ? this.state.firstName : "stranger" }!</p>
                  <div>
                    {/* <ReactFitText compressor={0.9}> */}
                      <p className="clock">
                        <Clock format="HH:mm:ss" ticking={true} interval={1000} />
                      </p>
                    {/* </ReactFitText> */}
                  </div>
                </div>
                <div className="header-motivation">
                  <p>Ready to rock the world?</p>
                </div>
              </div>

              <div className="weather-info-container">
                <div className="main-container">
                  {isLoading && <h3>Loading Weather...</h3> }
                  
                  {!isLoading &&
                    <div>
                      <div className="select-city-section">
                        <WeatherLocation 
                          location={cityName} 
                          temperature={temperature} 
                          isDay={isDay} 
                          text={text} 
                          iconURL={iconURL}
                          eventEmitter={this.props.eventEmitter}
                        />
                      </div>
                    
                      <div className="weather-sections">
                        <WeatherNow {...this.state}/>

                        <div className="weather-tomorrow-section">
                          <WeatherTomorrow forecastDays={forecastDays}/>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </Route>

            {/* <Route exact path="/theme" component={(props) => <ThemePage {...props} onColorChange={this.handleColorChange}/>}  />                             */}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
