import React from 'react';
import logo from './logo.svg';
import Axios from 'axios';
import TicketsHistoryDownloader from './TicketsHistoryDownloader';

class DepractionCheck extends React.Component {
  constructor(props){
    super(props);
    this.state = {wait: false, ticketsHistory : null};
    this.setWait = this.setWait.bind(this);
    this.changeTicketsHistory = this.changeTicketsHistory.bind(this);
  }

  setWait(w){
      this.setState({wait : w});
  }

  changeTicketsHistory(tickets){
    this.setState({ticketsHistory : tickets});
  }

  render(){
    const tickets = this.state.ticketsHistory;
    let infoBar; 
    if(!this.state.wait && tickets !== null && tickets.length > 0){
      const oldest = tickets.sort((a,b) => 
        a.bought - b.bought
      )[0];
      const firstBoughtDate = new Date(oldest.bought); 
      const cutOffDate = new Date(2014,8,1); 
      if(firstBoughtDate < cutOffDate){
        infoBar = (<div className="w3-panel w3-orange w3-animate-top">
            <h3>Oh no!</h3>
            <p>Musisz se wymienić kartę.</p>
            <p>Twoja karta została użyta po raz pierwszy nie później niż {firstBoughtDate.toDateString()}.</p>
          </div>); 
      }else {
        infoBar = (<div className="w3-panel w3-lime w3-animate-top">
          <h3>Udało się!</h3>
          <p>Nie musisz wymieniać karty. Yay!</p>
          <p>Twoja karta została użyta po raz pierwszy nie później niż {firstBoughtDate.toDateString()}.</p>
          </div> );
      }
    }
  
    const hasNoTickets = this.state.ticketsHistory === null 
      ? null : this.state.ticketsHistory.length === 0;

    return (
    <div className="w3-container" style={{'margin-top':'75px'}}>
      <h1 className="w3-xxxlarge w3-text-teal"><b>Czy twoja kkm-ka jest do wymiany?</b></h1>
      <hr style={{width:'50px',border:'5px solid teal'}} className="w3-round"/>
      <p>Wpisz numer swojej KKMki do pola poniżej i sprawdź czy ZTP uważa, że twoja KKMka jest do wyrzucenia.</p>
      <TicketsHistoryDownloader isWaiting={this.setWait} hasNoTickets={hasNoTickets} onTicketsHistoryChange={this.changeTicketsHistory}/>
      {infoBar}
    </div>
    );
  }
}

export default DepractionCheck;