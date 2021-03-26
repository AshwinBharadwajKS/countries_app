import React from 'react';
import axios from 'axios';
import './styles.css';
import Back from './back.png';
import { withRouter } from "react-router-dom";


class CountryDetails extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            countryDetails: this.props && this.props.location && this.props.location.state,
            borders: []
		};
	}

  componentDidMount() {
      let { countryDetails } = this.state;
      let borders = [];
      this.setState({
          countryDetails: this.props && this.props.location && this.props.location.state
      },()=> 
                {
                //Getting Data for the bordering countries    
                for(let i = 0; i< countryDetails.borders.length; i++){
                    axios.get(`https://restcountries.eu/rest/v2/alpha/${countryDetails.borders[i]}`)
                    .then(response => {
                    borders.push(response.data)
                    this.setState({ borders: borders });
                    })
                }
})
  }

  navigate = () => {
      this.props.history.push("/")
  } 

  render() {
      console.log(this.state.borders,"borders")
      let { countryDetails, borders} = this.state;
    return (
        <div className="mainWrapper">
                <img src={Back} className="logoDetails" onClick={() => this.navigate()}/>  
                <div className = "countryDetails">
                        <img src={countryDetails.flag} className="countryDetailsflag" alt={"Country"}/>
                        <h1 className="countryName">{countryDetails.name}</h1>
                    </div>
                    <div className = "countryData">    
                        <h3>Capital City: {countryDetails.capital}</h3>
                        <h4>Population: {countryDetails.population}</h4>
                        <span>Currencies: </span>
                        {countryDetails && countryDetails.currencies.map((item, index) => {
                            return(
                                index === countryDetails.currencies.length - 1 ? <span>{item.name}</span> : <span>{item.name}, </span>
                            )
                        })}
                        <br></br>
                        <br></br>
                        <span> Languages: </span>
                        {countryDetails && countryDetails.languages.map((item, index) => {
                            return(
                                index === countryDetails.languages.length - 1 ? <span>{item.name}</span> : <span>{item.name}, </span> 
                            )
                        })}
                </div>
                <h3>Bordering Countries:</h3>
                {borders && borders.length > 0 ? <div className = "borderingCountries">
                        {borders && borders.length > 0 && borders.map((item,index) => {
                            return(
                                <div className="borderingCountryTile">
                                    <div style={{display: 'flex'}}>
                                    <img src={item.flag} className="flag" alt={"Country"}/>
                                    <h3 className="countryName">{item.name}</h3>
                                    </div>
                                    <h4>Population: {item.population}</h4>
                                </div>
                            )
                        })}
                        </div> : <h2>No Bordering countries</h2>}
            </div>
    )
  }
}
export default withRouter((CountryDetails));