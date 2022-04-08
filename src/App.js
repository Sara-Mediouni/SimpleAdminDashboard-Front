import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';
import SideNav from './Dashboard/SideNav';
import SignINPage from './pages/Signin';
import VehiculesPage from './pages/Vehicules';
import VehiculesAddPage from './pages/VehiculeAdd';
import VehiculesUpdatePage from './pages/VehiculeUpdate';
import AddIntervention from './pages/AddIntervention';
import AddParking from './pages/Addparking';
import ListIntervention from './pages/ListInterventions';
import DashboardPage from './Dashboard/DashboardP';
import CustomerPage from './Dashboard/Customer';
import FilterMonth from './Dashboard/FilterMonth';
import FilterYear from './Dashboard/FilterYear';
import Single from './pages/SinglesInter';
import ListParking from './pages/ListParking';
import FilterYearend from './Dashboard/FilterYearend';
class App extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    return (
      
      <Router>

      
        <Switch >
        <Route path="/" component= { SignINPage } exact />
        <Route path="/signin" component= { SignINPage } exact />
        
        <Route path="/home" component= { DashboardPage } exact />
        <Route path="/Customer" component= { CustomerPage } exact />
        <Route path="/vehicules" component= { VehiculesPage } exact />
        <Route path="/vehicules/add" component= { VehiculesAddPage } exact />
        <Route path="/vehicules/update/:id" component= { VehiculesUpdatePage } exact />
        <Route path="/vehicules/intervention/add/:id" component= { AddIntervention } exact />
        <Route path="/vehicules/parking/add/:id" component= { AddParking } exact />
        <Route path="/FilterMonth" component= { FilterMonth } exact />
        <Route path="/FilterYear" component= { FilterYear } exact />
        <Route path="/FilterYearend" component= { FilterYearend } exact />
        <Route path="/vehicules/intervention/list/:id" component= { ListIntervention } exact />
        <Route path="/vehicules/intervention/list" component= { Single } exact />
        <Route path="/vehicules/parking/list" component= { ListParking} exact />


        

        
      
        
          
        </Switch>
      </Router>
    );
  }
}

export default App;
