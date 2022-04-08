import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Depositsum from './SumDeposit';


class Deposits extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        user: null,
        interventions : [],
        errMsg:"",

        
        query:"",

        
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


      this.getListInteventions();
  }


  getListInteventions(){
      let url = "http://localhost:3000/api/vehicules/inteventions/list?id="+this.state.id;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", localStorage.getItem('token'));
      
   
      var requestOptions = {
        method: 'GET',
        headers: myHeaders, 
        redirect: 'follow'
      };
      
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => { 
            console.log(result);

            this.setState({interventions:result.data})
         })
        .catch(error => console.log('error', error));
  }

 


render() {
  return (
    <div>
      <Title>Recent Orders</Title>
      
     
     
      {this.state.interventions.map((i)=>{
              var sum = 0;
            sum+=i.amount;
            if(sum!=0)
             { return ( 
             
                  <div>
                    {sum}
                  </div> 
                  
             
              );}else return (console.log('erreur de calcul'));})}
              
           
      <div>
        
        <Link id="link" href="/vehicules/intervention/list" >
          View Details
        </Link>
      </div>
      </div>
    
  );
}}
export default Deposits;