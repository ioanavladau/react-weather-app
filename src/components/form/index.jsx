import React from 'react';
import './../form/style.scss';



export default class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            redirectToWeather: false
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault()

        const { firstName } = this.state;

        console.log(`Your first name is ${firstName}.`);

        this.props.onUserSubmit({firstName});

        this.setState({ redirectToWeather: true })
        
        this.props.history.push('/dashboard');
    }

    // renderRedirect = () => {
    //     if (this.state.redirectToWeather) {
    //         this.props.history.push('/weather/');
    //     }
    //   }

    render() {
        const { firstName } = this.state;
        // if (this.state.redirectToWeather === true) {
        //     return <Redirect to="/weather"/>
        // }
        // console.log(this.state.redirectToWeather)
        return (
            <form className="form-page">
                <input id="firstName" placeholder="What's your name?" onChange={this.handleChange} value={firstName} required/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="" className="email"></label>
                {/* <button onClick={this.onSubmit}>Submit</button> */}
                <input className="btn btn-submit" type="submit" onClick={this.onSubmit} value="Submit!"/>


                {/*                 
                <input id="firstName" name="firstName" placeholder="What's Your First Name?" onChange={this.handleChange} value={firstName} className="question" required/>
                {/* <label htmlFor="firstName"><p>Hello, what's your name? </p></label> */}
                {/* <input type="submit" onClick={this.onSubmit} value="Submit!"/> */}

            </form>
        );
    }
}