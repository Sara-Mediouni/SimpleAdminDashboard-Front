import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

class OrdersPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        user: null,
        vehicules : [],
        errMsg:"",


        query:""
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
      this.getParcVehicules();
  }


  getParcVehicules(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem('token'));

 
    var requestOptions = {
      method: 'GET',
      headers: myHeaders, 
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/api/vehicules/list", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)

        if (result.success === true) {
            this.setState({
                vehicules: result.data
            })
        }
      })
      .catch(error => console.log('error', error));
  }


  deleteVehicule(id){
    // API delete

    console.log(id);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem('token'));

    var raw = JSON.stringify({"id":id});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/api/vehicules/delete", requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result.success === true) {

            this.getParcVehicules();
        }else{
            this.setState({errMsg:"Something went wrong while deleting the vehicule"})
        }
    })
    .catch(error => console.log('error', error));
  }

render(){
  return (
    <div >
                                
    
      <Title >Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
         
            <TableCell style={{fontFamily:"fantasy",color:"#a3b18a"}}>Owner</TableCell>
            <TableCell style={{fontFamily:"fantasy",color:"#a3b18a"}}>CIN</TableCell>
            <TableCell style={{fontFamily:"fantasy",color:"#a3b18a"}}>Brand</TableCell>
            <TableCell style={{fontFamily:"fantasy",color:"#a3b18a"}}>Interventions</TableCell>
            
          </TableRow>
            
        </TableHead>
        <TableBody>
          
        {
             this.state.vehicules.filter((v)=> v.registrationPlate.indexOf(this.state.query) != -1 ).map((v)=>{
            for (let i = 0; i < 2; i++)
            return(<TableRow >
              <TableCell>{v.fullnameOwner}</TableCell>
              <TableCell>{v.cinOwner}</TableCell>
              <TableCell>{v.marque}</TableCell>
              
              <TableCell> <a id="link2" href= {"/vehicules/intervention/list/"+v._id} >List</a> </TableCell>
              </TableRow>);})}
        
            
          
        </TableBody>
      </Table>
      <Link  id="link3" href="/vehicules" >
        See more orders
      </Link>
    
    </div>
  );
}}

export default OrdersPage;