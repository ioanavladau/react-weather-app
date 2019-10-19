import React from 'react';

import "./style.scss";

import { TiLocation } from 'react-icons/ti';


// import WeatherNow from "./weather";

import { Manager, Reference, Popper } from 'react-popper';

export default class WeatherLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectLocationOpen: false
        }
    }

    onToggleSelectLocation() {
        this.setState((prevState) => ({ isSelectLocationOpen: !prevState.isSelectLocationOpen }));
    }

    onLocationNameChange(e) {
        this.setState({ locationName: e.target.value });
    }

    onSelectCity() {
        const { locationName } = this.state;
        const { eventEmitter } = this.props;
        eventEmitter.emit("updateWeather", locationName);
        this.setState({ isSelectLocationOpen: false });
    }

    render() {
        const { isSelectLocationOpen } = this.state;
        const { eventEmitter } = this.props;

        return <div className="select-city-container">
            <div className="location">
                <span><TiLocation /></span> {this.props.location}
            </div>
            <Manager>
                <Reference>
                {({ ref }) => (
                    <button className="btn btn-select-location" ref={ref} onClick={this.onToggleSelectLocation.bind(this)}>
                        Select Another Location
                    </button>
                )}
                </Reference>
                <Popper placement="top">
                {({ ref, style, placement, arrowProps }) => 
                    isSelectLocationOpen && (
                        <div 
                            className="popup-container"
                            ref={ref} 
                            style={style} 
                            data-placement={placement}
                        >
                            <div className="form-container">
                                {/* <label htmlFor="location-name">Location Name</label> */}
                                {/* <label for="nme"><span>City</span></label> */}

                                <input 
                                    id="location-name" 
                                    type="text" 
                                    placeholder="City Name"
                                    onChange={this.onLocationNameChange.bind(this)}
                                    type="text" name="name" className="question" id="nme" required autoComplete="off" 
                                />
                                <button className="btn btn-select-location" onClick={this.onSelectCity.bind(this)}>Select</button>
                            </div>
                            <div ref={arrowProps.ref} style={arrowProps.style} />
                        </div>
                    )
                }
                </Popper>
            </Manager>
            {/* <WeatherNow {...this.props}/> */}
            
        </div>;
    }
}