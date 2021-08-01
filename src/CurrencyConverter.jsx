import axios from "axios";
import React from "react";

export default class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: '',
      destination: '',
      date: '',
      result: '',
      symbols: '',
      dataFromApi: ''
    }
    
  }
  
 sendGetRequest = async () => {
    try {
      const resp = await axios.get(`http://api.exchangeratesapi.io/v1/${this.state.date}`, {
        params: { access_key: 'ca00a5e307732f94d27adece0a5bfb21' },
      });
      console.log(resp)
      this.setState({dataFromApi: resp.data})
      this.calculations(this.state.source, this.state.destination);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  
  validateField = (firstSymbol, secoundSymbol, date) => {
    const reponse = "Please complete each field"
    if (firstSymbol.length < 3 || secoundSymbol.length < 3 || date.length < 10) {
      this.setState({result: reponse})
      return reponse
    }
    return ''
  }
  
  validateSymbols = (firstSymbol, secoundSymbol) => {
    const responeAPI = Object.keys(test.rates)
    const responseFirst = `Symbols ${firstSymbol} are invalid for date`
    const responseSecound = `Symbols ${secoundSymbol} are invalid for date`
    if(!responeAPI.find(e => e === firstSymbol)){
      this.setState({result: responseFirst})      
      return responseFirst
    }
    if(!responeAPI.find(e => e === secoundSymbol)){
      this.setState({result: responseSecound})      
      return responseSecound
    }
    return ''
  }
  
  validateDate = date => {
    const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/

    const response = 'time data is not valid'
    
    if(!regex.test(date)) {
      this.setState({result: response})
      return response 
    }
  }
  
  validate = () => {
    let isError = this.validateField(this.state.source, this.state.destination, this.state.date)
    if(isError) return false
    isError = this.validateSymbols(this.state.source, this.state.destination)
    if(isError) return false
    isError = this.validateDate(this.state.date)
    if(isError) return false
    this.sendGetRequest()
    
  }
  
  toUpperCase = event => {
    event.target.value = event.target.value.toUpperCase();
  }
  
  resetAllFields = () => {
    this.setState({
      source: '',
      destination: '',
      date: '',
      result: '',
      symbols: '',
      dataFromApi: ''
    })
  }
  
  calculations = (source, destination) => {
    const firstSymbol = this.state.dataFromApi.rates[source]
    const secoundSymnbol = this.state.dataFromApi.rates[destination]
    this.setState({result: secoundSymnbol/firstSymbol})
  }
  
  render() {
    return (
      <>
        <div className="input-container">
          <h2>Currency Converter</h2>
          <div className="single-input">
            <p>Source symbol</p>
            <input
              className="currency-source"
              type="text"
              value={this.state.source}
              maxLength="3"
              onChange={e => this.setState({source: e.target.value})}
              onInput={this.toUpperCase}
              placeholder='USD'
            />
          </div> 
          <div className="single-input">
            <p>Destination symbol</p>
            <input
              className="currency-destination"
              type="text"
              value={this.state.destination}
              maxLength="3"
              onChange={e => this.setState({destination: e.target.value})}
              onInput={this.toUpperCase}
              placeholder='EUR'
            />
          </div>
          <div className="single-input">
            <p>Date</p>
            <input
              className='currency-date'
              type="text"
              maxLength="10"
              value={this.state.date}
              onChange={e => this.setState({date: e.target.value})}
              placeholder='YYYY-MM-DD'
            />  
          </div>
        </div>  

        <button 
          className="find-rate"
          onClick={this.validate}
          >
        Find rate
        </button>
        <button
          className="reset-fields"
          onClick={this.resetAllFields}
        >
          Reset
        </button>
        <div className="conversion-result">{this.state.result}</div>
      </>
    );
  }
}