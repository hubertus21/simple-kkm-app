import React from 'react';
import Axios from 'axios';

class TicketsHistoryDownloader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: '', waiting : false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }
  handleSubmit(event) {
    this.setState({waiting : true});
    this.props.isWaiting(true);
    Axios.get("/api/history/"+this.state.value).then((rsp) => {
      let tickets = rsp.data;
      this.props.onTicketsHistoryChange(tickets.tickets);
      this.props.isWaiting(false);
      this.setState({waiting : false});
    });
    event.preventDefault();
  }

  render(){
    const waiting = this.state.waiting;
    let submitBtnTxt = this.state.waiting ? "Oczekiwanie..." : "Sprawdź";
    let infoDisplayAlert = this.state.waiting ? "block" : "none";
    let errDisplayAlert = this.props.hasNoTickets != null && this.props.hasNoTickets && !waiting ? "block" : "none";
    return (
    <form className="w3-container" onSubmit={this.handleSubmit}>
        <label className="w3-text-teal"><b>Nr KKM - prawdopodobnie 11 znakowy.</b> Wpisz random, żeby wylosować odpowiedź, a najprostszym prawdziwym numerem jest 1</label>
        <input className="w3-input w3-border w3-light-grey" value={this.state.value} onChange={this.handleChange} type="text"/>
        <button className="w3-button w3-block w3-teal w3-hover-green" id="submitBtn">{submitBtnTxt}</button>
        <div className="w3-panel w3-blue w3-animate-top" id="alertSent" style={{display : infoDisplayAlert}}>
          <h3>Chwila cierpliwości!</h3>
          
          <p>Niestety serwery MPK są jakie są i potrafią kilkanaście sekund mielić.</p>
        </div>
        <div className="w3-panel w3-red w3-animate-top" id="alertErr" style={{display : errDisplayAlert}}>
          <h3>Oh no!</h3>
          <p>Coś poszło nie tak, ni ma biletów, wbiłeś dobry numer?</p>
        </div>
      </form>
    );
  }
}

export default TicketsHistoryDownloader;