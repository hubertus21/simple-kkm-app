import React from 'react';
import logo from './logo.svg';
import Axios from 'axios';
import TicketsHistoryDownloader from './TicketsHistoryDownloader';

class TicketsList extends React.Component {
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
    const dateToString = dt => {
        dt = new Date(dt);
        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        return `${day}-${month}-${year}`;
    };
    const tickets = this.state.ticketsHistory;
    let items; 
    if(!this.state.wait && tickets !== null && tickets.length > 0){
        items = tickets.map(t => (
            <li>Typ : {t.ticketType}<br/>
                Kupiony : {dateToString(t.bought)}<br/>
                Nr klienta : {t.clientNr}<br/>
                Ważny : {dateToString(t.startDate)} - {dateToString(t.endDate)}
            </li>
        ));
    }
  
    const hasNoTickets = this.state.ticketsHistory === null 
      ? null : this.state.ticketsHistory.length === 0;

    return (
    <div className="w3-container" style={{'margin-top':'75px'}}>
      <h1 className="w3-xxxlarge w3-text-teal"><b>Jakie bilety kupowałeś?</b></h1>
      <hr style={{width:'50px',border:'5px solid teal'}} className="w3-round"/>
      <p>Wpisz numer swojej KKMki do pola poniżej i sprawdź historię biletów na niej.</p>
      <TicketsHistoryDownloader isWaiting={this.setWait} hasNoTickets={hasNoTickets} onTicketsHistoryChange={this.changeTicketsHistory}/>
      <ul class="w3-ul w3-card-4">{items}</ul>
    </div>
    );
  }
}

export default TicketsList;