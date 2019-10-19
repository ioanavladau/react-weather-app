import React from 'react';

// import SunImg from '../../../assets/images/sun.png';

export default class WeatherNow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { location, temperature, isDay, text, iconURL } = this.props;

        return <div className="weather-now-section">
            <div className="header">Now</div>
            <div className="inner-container">
                <div className="image">
                    <img src={ iconURL } alt=""/>
                </div>
                <div className="current-weather">{ temperature }°C</div>   
            </div>
            <div className="footer">{ text }</div>

            
        </div>
    }
}