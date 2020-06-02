import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import DepractionCheck from './DeprecationCheck';
import Main from './Main';
import TicketsList from './TicketsList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sidebarOpen : false, ticketsHistory : null};
    this.switchSidebar = this.switchSidebar.bind(this);
  }

  switchSidebar(ev){
      const val = !this.state.sidebarOpen;
      this.setState({sidebarOpen : val});
  }

  render(){
    const sidebarStyle = this.state.sidebarOpen ? 'block' : 'none' ;
    return (
      <div className="App" >
        <Router>
        <nav className="w3-sidebar w3-teal w3-collapse w3-top w3-large w3-padding" style={{'display' : sidebarStyle, 'z-index' : '3', width:'300px', 'font-weight':'bold'}}><br/>
          <a href="javascript:void(0)" onClick={this.switchSidebar} className="w3-button w3-hide-large w3-display-topleft" style={{width:'100%','font-size':'22px'}}>&times;</a>
          <div className="w3-container">
            <h3 className="w3-padding-64"><b>Apka scyzoryk KKM</b></h3>
          </div>
          <div className="w3-bar-block">
            <Link to="/" onClick={this.switchSidebar} className="w3-bar-item w3-button w3-hover-white">Strona Główna</Link> 
            <Link to="/dpcheck" onClick={this.switchSidebar} className="w3-bar-item w3-button w3-hover-white">Do wymiany?</Link> 
            <Link to="/list" onClick={this.switchSidebar} className="w3-bar-item w3-button w3-hover-white">Bilety na karcie?</Link> 
          </div>
        </nav>
        <header className="w3-container w3-top w3-hide-large w3-teal w3-xlarge w3-padding">
          <a href="javascript:void(0)" className="w3-button w3-teal w3-margin-right" onClick={this.switchSidebar}>☰</a>
          <span>Apka scyzoryk KKM</span>
        </header>

        <div className="w3-overlay w3-hide-large" onClick={this.switchSidebar} style={{cursor:"pointer",'display' : sidebarStyle}} title="close side menu"></div>
        
        <div id="content" className="w3-main" style={{'margin-left':'340px','margin-right':'40px'}}>
        <Switch>
            <Route path="/list">
              <TicketsList />
            </Route>
            <Route path="/dpcheck">
              <DepractionCheck />
            </Route>
            <Route path="/">
              <Main />
            </Route>

          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;