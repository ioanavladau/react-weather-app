import React from 'react';
import "./style.scss";

import ForecastDay from './forecastDay';

export default class BottomSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { forecastDays } = this.props;
        return <div className="bottom-container">
                <div className="inner-container">
                    {forecastDays && Object.keys(forecastDays).map((day, index) => {
                        // return <ForecastDay day={day} key={index}/>
                        console.log(forecastDays[day])
                        return <ForecastDay day={forecastDays[day].avgtemp} key={index}/>
                        
                    })}
                </div>
        </div>;
    }
}