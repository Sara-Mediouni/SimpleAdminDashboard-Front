import * as React from 'react';
class Depositsum extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          user: null,
          interventions : [],
          errMsg:"",
         s:0,
          
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

         
        this.state.interventions.map((i)=>{
       var sum = 0;
            
            if(this.state.s==0)
             { return ( 
             
                  <div>
                    {this.state.s}
                  </div> 
                  
             
              );}
              
          })


    );}}
    export default Depositsum;

  