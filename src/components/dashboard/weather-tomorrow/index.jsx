import React from 'react';
import "./style.scss";

import ForecastDay from './forecastDay';

export default class WeatherTomorrow extends React.Component {


    render() {
        const { forecastDays } = this.props;
        return <div>
                <div className="header">Tomorrow</div>
                <div className="inner-container">
                    
                    {forecastDays && Object.keys(forecastDays).map((day, index) => {
                        // return <ForecastDay day={day} key={index}/>
                        console.log(forecastDays[day])
                        return <ForecastDay day={forecastDays[day].avgtemp + "°C"} key={index}/>
                        
                    })}
                </div>
        </div>;
    }
}