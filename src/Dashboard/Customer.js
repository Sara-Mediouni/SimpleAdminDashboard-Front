 
import * as React from 'react';
import SideNav from './SideNav';

import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
class CustomerPage extends React.Component{
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


  
  render(){
    return (
        <div id="wrapper">

        <SideNav/>

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
                                <PersonIcon></PersonIcon> {
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
                        <h1 class="h3 mb-0"style={{fontFamily:"fantasy",color:"#006466"}}>Customers</h1>
                        
                    </div>


                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 style={{fontFamily:"fantasy",color:"#006466"}}class="m-0 font-weight-bold">Search</h6>
                        </div>


                        <div class="card-body">
                            <div  >
                                <label style={{fontFamily:"fantasy",color:"#a01a58"}}><h4>CIN</h4></label>
                                <input type="search" className="form-control" onChange={ (e)=>{ this.setState({query:e.target.value})  } } />
                            </div>
                        </div>

                    </div>






                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 style={{fontFamily:"fantasy",color:"#a01a58"}}class="m-0 font-weight-bold ">List</h6>
                        </div>


                        <div class="card-body">
                            <div class="table-responsive">
                                
                                {
                                    this.state.errMsg !== '' ?
                                    <div className="alert alert-danger">
                                        { this.state.errMsg }
                                    </div>
                                    :
                                    <div></div>

                                }
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                    
                                        <tr><th>Owner's CIN</th>
                                            <th>Owner</th>
                                            <th>Marque</th>
                                            <th>Model</th>
                                            
                                            <th>Matricule</th>
                                            <th>Interventions</th>
                                             

                                        </tr>
                                    </thead>
                                 
                                    <tbody> 


                                        {
                                             this.state.vehicules.filter((v)=> v.cinOwner.indexOf(this.state.query) != -1 ).map((v)=>{
                                                return (
                                                    <tr> <td> {v.cinOwner}  </td>
                                                        <td> {v.fullnameOwner}  </td>
                                                        <td> {v.marque} </td>
                                                        <td> {v.model} </td>
                                                    
                                                        
                                                        <td> {v.registrationPlate}  </td>
                                                        <td> <Link  id="link2" to= {"/vehicules/intervention/list/"+v._id} >List</Link> </td>
                                                   
                                                        
                                                    </tr>
                                                );
                                            })
                                        }
                                        
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

export default CustomerPage;
