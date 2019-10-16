import React from 'react';

import SunImg from '../../assets/images/sun.png';

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="weather-container">
            <div className="header">Location name</div>
            <div className="inner-container">
                <div className="image"><img src={SunImg} alt=""/></div>
                <div className="current-weather">10°C</div>
            </div>
            <div className="footer">Sunny</div>
        </div>
    }
}