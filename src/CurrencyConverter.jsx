import axios from "axios";
import React from "react";


const test = {"success":true,"timestamp":1627223104,"base":"EUR","date":"2021-07-25","rates":{"AED":4.323839,"AFN":93.71,"ALL":122.22,"AMD":573.42,"ANG":2.1116,"AOA":753.164313,"ARS":113.407,"AUD":1.598276,"AWG":2.119423,"AZN":2.005794,"BAM":1.95583,"BBD":2.3752,"BDT":99.8553,"BGN":1.9558,"BHD":0.4435,"BIF":2331.159998,"BMD":1.17713,"BND":1.5998,"BOB":8.111,"BRL":6.125625,"BSD":1.1764,"BTC":3.4710211e-5,"BTN":87.552,"BWP":13.0852,"BYN":2.9519,"BYR":23071.747983,"BZD":2.3712,"CAD":1.479005,"CDF":2357.791814,"CHF":1.082864,"CLF":0.032516,"CLP":897.220722,"CNY":7.629455,"COP":4552.699997,"CRC":729.299999,"CUC":1.17713,"CUP":31.193945,"CVE":110.265,"CZK":25.650126,"DJF":209.42,"DKK":7.435978,"DOP":67.041,"DZD":158.506,"EGP":18.448,"ERN":17.661952,"ETB":52.1316,"EUR":1,"FJD":2.450373,"FKP":0.850784,"GBP":0.856188,"GEL":3.631493,"GGP":0.850784,"GHS":7.0096,"GIP":0.850784,"GMD":60.273592,"GNF":11505.999992,"GTQ":9.1168,"GYD":245.89,"HKD":9.145599,"HNL":27.909,"HRK":7.537404,"HTG":112.818,"HUF":360.202196,"IDR":17039.133307,"ILS":3.853458,"IMP":0.850784,"INR":87.610848,"IQD":1716.309999,"IRR":49563.059029,"ISK":148.589574,"JEP":0.850784,"JMD":181.512,"JOD":0.834632,"JPY":130.136476,"KES":127.3998,"KGS":99.187374,"KHR":4788.999997,"KMF":492.751086,"KPW":1059.417007,"KRW":1356.195466,"KWD":0.354203,"KYD":0.9803,"KZT":501.18,"LAK":11238.899992,"LBP":1778.899999,"LKR":234.6838,"LRD":201.999951,"LSL":17.469058,"LTL":3.475759,"LVL":0.712035,"LYD":5.3076,"MAD":10.5543,"MDL":21.2921,"MGA":4482.629997,"MKD":61.625,"MMK":1936.288599,"MNT":3352.6011,"MOP":9.4135,"MRO":420.235207,"MUR":50.738709,"MVR":18.132206,"MWK":952.304999,"MXN":23.610227,"MYR":4.975145,"MZN":74.889455,"NAD":17.469053,"NGN":484.393382,"NIO":41.302,"NOK":10.432949,"NPR":140.083,"NZD":1.688005,"OMR":0.453243,"PAB":1.1763,"PEN":4.6271,"PGK":4.1304,"PHP":59.124,"PKR":189.2175,"PLN":4.574387,"PYG":8129.199994,"QAR":4.285976,"RON":4.922174,"RSD":117.55,"RUB":86.952479,"RWF":1184.709999,"SAR":4.415746,"SBD":9.474008,"SCR":17.513,"SDG":524.415744,"SEK":10.230143,"SGD":1.602475,"SHP":0.850784,"SLL":12065.58289,"SOS":688.621448,"SRD":25.04584,"STD":24248.670845,"SVC":10.293,"SYP":1480.082937,"SZL":17.3954,"THB":38.760581,"TJS":13.4164,"TMT":4.119955,"TND":3.28714,"TOP":2.660491,"TRY":10.070823,"TTD":7.9897,"TWD":33.016264,"TZS":2727.979998,"UAH":31.8119,"UGX":4166.699997,"USD":1.17713,"UYU":51.554,"UZS":12487.639991,"VEF":251705969439.0777,"VND":27064.99998,"VUV":129.624026,"WST":3.003631,"XAF":655.957,"XAG":0.046748,"XAU":0.000653,"XCD":3.181253,"XDR":0.8273,"XOF":655.957,"XPF":119.718358,"YER":294.404447,"ZAR":17.473401,"ZMK":10595.586778,"ZMW":24.7094,"ZWL":379.036141}}

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