import React from 'react';

export default class ForecastDay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { day } = this.props;
        if (!day) return null;
        return (
            <div className="forecastday-container">
                <div className="image"><img src={"https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"} alt=""/></div>
                <div className="text">{day}</div>
            </div>
        )
    }
}