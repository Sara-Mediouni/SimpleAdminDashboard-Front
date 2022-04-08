import Dashboard from "./Dashboard";
import * as React from 'react';

class DashboardPage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          user: null
      }
    }
    getConnectedUserData(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", localStorage.getItem('token'));
        
     
        var requestOptions = {
          method: 'GET',
          headers: myHeaders, 
          redirect: 'follow'
        };
        
        fetch("http://localhost:3000/api/user/connected", requestOptions)
          .then(response => response.json())
          .then(result => { this.setState({user:result}) })
          .catch(error => console.log('error', error));
      }
    
    
      componentDidMount(){
          this.getConnectedUserData();
      }
    render(){
        return (
          
<Dashboard/>

        );}}

        export default DashboardPage;
