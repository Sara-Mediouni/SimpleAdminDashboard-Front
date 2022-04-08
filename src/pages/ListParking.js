 
import React from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../Dashboard/SideNav';

class ListParking extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        user: null,
        parking : [],
        errMsg:"",

        vehicules:[],
        query:""
        
        
    }
  }

  getVehiculeDetails(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem('token'));


    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/api/vehicules/details?id="+this.state.id, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result);

          this.setState({vehicules:result.data})
          console.log(this.state.vehicules)
      })

      .catch(error => console.log('error', error));
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


      this.getListParking();
  }


  getListParking(){
      let url = "http://localhost:3000/api/vehicules/parking/list";

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

    this.setState({parking: result.data})
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

    fetch("http://localhost:3000/api/Parking/delete", requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result.success === true) {

            this.getListParking();
        }else{
            this.setState({errMsg:"Something went wrong while deleting the vehicule"})
        }
    })
    .catch(error => console.log('error', error));
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

  deleteParking(id){
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

    fetch("http://localhost:3000/api/parking/delete", requestOptions)
    .then(response => response.json())
    .then(result => {
        if (result.success === true) {

            this.getListParking();
        }else{
            this.setState({errMsg:"Something went wrong while deleting the vehicule"})
        }
    })
    .catch(error => console.log('error', error));
  }
 



  render(){
    return (
        <div id="wrapper">

        <SideNav />

        <div id="content-wrapper" class="d-flex flex-column">
 
            <div id="content">

                
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                     
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                     
                     
                    <ul class="navbar-nav ml-auto">

                         

                         

                         

                        <div class="topbar-divider d-none d-sm-block"></div>

                         
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                                    {
                                        this.state.user === null ?
                                        'chargement...':
                                        this.state.user.fullname
                                    }
                                </span>
                                
                            </a>
                           
                             
                        </li>

                    </ul>

                </nav>
                 
                <div class="container-fluid">

                    
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 "style={{fontFamily:"fantasy",color:"#006466"}}><h4>Parking</h4></h1>
                       
                    </div>

                   
                   
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold"style={{fontFamily:"fantasy",color:"#006466"}}>List</h6>
                        </div>


                        <div class="card-body">
                            <div class="table-responsive">
                                
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                    
                                        <tr>
                                            <th>Start</th>
                                            <th>Bloc</th>
                                            <th>Amount</th>
                                            <th>End</th> 
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                 
                                    <tbody> 
                                   

                                        { 
                                             this.state.parking.map((v)=>{
                                               
                                                   return(
                                                   <tr>
                                                    
                                                    <td>{v.Debut}</td>
                                                    <td>{v.Bloc}</td>
                                                    <td>{v.montant}</td>
                                                    <td>{v.Fin}</td>
                                                    
                                                    <td><button style={{width:"100px",background:"#006466" ,color:"#f0efeb", border:"#f0efeb",marginRight:15}} className="btn btn-danger btn-sm" onClick={ ()=>{this.deleteVehicule(v._id)} } >Delete</button>

                                                            <br/></td>
                                                    </tr>
                                                            );
                                            })}
                                
                                                     
                                                   
                                                
                                               
                                                
                                                


                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>



                </div> 

            </div> 
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; My Parc 2022</span>
                    </div>
                </div>
            </footer> 

        </div> 

    </div>
    );
  }
}

export default ListParking;
