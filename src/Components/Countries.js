import React from 'react';
import axios from 'axios';
import './styles.css';
import Logo from './Logo.png'
import { withRouter } from "react-router-dom";


class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        countries: [],
        details: null
    };
}

  componentDidMount() {
    // fetching data for all the countries
    axios.get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        this.setState({ countries: response && response.data });
      })
  }

  countryDetails = (countryDetails) => {
      this.setState({
        countryDetails: countryDetails
        }, () =>  this.props.history.push({ 
                pathname: '/details',
                state: this.state.countryDetails //Sending the selected country data to the CountryDetails Component
            })
      )
  }

  render() {
      let { countries } = this.state;
    return (
        <div>
            <div className="mainWrapper">
                <img src={Logo} className="logo" />  
                <h1 className= "header">Countries Application</h1>
                <div className="countriesWrapper">
                        {countries && countries.map((item, index) => {
                            return(
                                <div className="tile" onClick={() => this.countryDetails(item)} key={index}>
                                    <div style={{display: 'flex'}}>
                                    <img src={item.flag} className="flag" alt={"Country"}/>
                                    <h3 className="headers">{item.name}</h3>
                                    </div>
                                    <h4>Capital City: {item.capital}</h4>
                                    <h4>Population: {item.population}</h4>
                                </div>
                            )
                        })}
                </div>
                </div>
        </div>
    )
  }
}
export default withRouter((Countries));