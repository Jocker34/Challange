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
        params: {
          access_key: 'ca00a5e307732f94d27adece0a5bfb21',
          symbols: `${this.state.source},${this.state.destination}`
        },
      });
      console.log(resp)
      this.setState({ dataFromApi: resp.data })
      let isError = this.validate()
      if (!isError) return false
      this.calculations(this.state.source, this.state.destination);
    } catch (err) {
      console.error(err)
      if (err.response.data.error.code === 'invalid_currency_codes') {
        this.setState({result: `Symbols ${this.state.destination} are invalid for date ${this.state.date}.`})
      }
      if (err.response.data.error.code === 'invalid_date') {
        this.setState({result: `time data '${this.state.date}' does not match format '%Y-%m-%d'`})
      }
    }
  };

  validateField = (firstSymbol, secoundSymbol, date) => {
    const reponse = "Please complete each field"
    if (firstSymbol.length < 3 || secoundSymbol.length < 3 || date.length < 10) {
      this.setState({ result: reponse })
      return reponse
    }
    return false
  }

  validateSymbols = (firstSymbol) => {
    const responeAPI = Object.keys(this.state.dataFromApi.rates)
    const responseFirst = `Base ${firstSymbol} is not supported.`
    if (!responeAPI.find(e => e === firstSymbol)) {
      this.setState({ result: responseFirst })
      return responseFirst
    }
    return ''
  }

  validate = () => {
    let isError = this.validateSymbols(this.state.source, this.state.destination)
    if (isError) return false
    return true
  }

  validateInputs = () => {
    let isError = this.validateField(this.state.source, this.state.destination, this.state.date)
    if (isError) return false
    this.sendGetRequest()
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
    this.setState({ result: secoundSymnbol / firstSymbol })
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
              onChange={e => this.setState({ source: e.target.value.substr(0, 3).toUpperCase().replace(/[^a-zA-Z]/ig, '') })}
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
              onChange={e => this.setState({ destination: e.target.value.substr(0, 3).toUpperCase().replace(/[^a-zA-Z]/ig, '') })}
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
              onChange={e => this.setState({ date: e.target.value.substr(0, 10).replace(/[^0-9+-]/ig, '') })}
              placeholder='YYYY-MM-DD'
            />
          </div>
        </div>

        <button
          className="find-rate"
          onClick={this.validateInputs}
        >
          Find rate
        </button>
        <button
          className="reset-fields"
          onClick={this.resetAllFields}
        >
          Reset
        </button>
        <div className="conversion-result">
          {this.state.result}
        </div>
      </>
    );
  }
}