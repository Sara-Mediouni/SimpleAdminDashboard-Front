 
import React from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../Dashboard/SideNav';

class AddParking extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        user: null, 
        messageRes:'',
        Fin:'',
        Debut:'',
        montant:'0',
        Bloc:'',
        
        id: props.match.params.id,
        
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

          this.setState(result.data)
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
  }


AddParking(){
var d = new Date();
var datestring = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate() + "T" +
d.getHours() + ":" + d.getMinutes();

    const parking = {
        
        Fin:this.state.Fin,
        montant:this.state.montant,
        Debut:datestring ,
        Bloc:this.state.Bloc,
        vehicule_id:this.state.id,
        
    }
    let url = 'http://localhost:3000/api/vehicules/parking/add';
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",localStorage.getItem('token'));

var raw = JSON.stringify(parking);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(url, requestOptions)
.then(response => response.json())
.then(result =>{
    console.log(result)

    if (result.success === true) {
      this.setState({
          isInserted: true,
          messageRes:result.message
      })
  }
     
})
.catch(error => console.log('error', error));}
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
                        <h1 class="h3 mb-0 "style={{fontFamily:"fantasy",color:"#006466"}}>Parking</h1>
                        <Link to="/vehicules"   class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-arrow-left fa-sm text-white-50"></i> Return</Link>
                    </div>



                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold"style={{fontFamily:"fantasy",color:"#006466"}}>Add Vehicule to Parking</h6>
                        </div>
                        <div class="card-body">
                             <form onSubmit={ (e)=>{
                                 e.preventDefault();
                                 this.AddParking()
                             } } >
                                 <div className="mb-3">
                                    <label>End</label>
                                    <input type="datetime-local" className="form-control" value={ this.state.Fin } onChange={ (e)=>{ this.setState({Fin:e.target.value}) } } ></input>
                                    <p className="text-danger">{this.state.errMsgMarque}</p>
                                 </div>

                                 <div className="mb-3">
                                    <label>Amount(TD)</label>
                                    <input type="number" className="form-control" value={ this.state.montant } onChange={ (e)=>{ this.setState({montant:e.target.value}) } } />
                                    <p className="text-danger">{this.state.errMsgMarque}</p>
                                 </div>
                                 <div className="mb-3">
                                    <label>Bloc</label>
                                    <input type="number" className="form-control" value={ this.state.Bloc } onChange={ (e)=>{ this.setState({Bloc:e.target.value}) } } />
                                    <p className="text-danger">{this.state.errMsgMarque}</p>
                                 </div>
                                 <div className="mb-3">
                                     <button className="btn "  style={{background:"#5c4d7d" ,color:"#f0efeb", border:"#f0efeb",marginRight:15}} type="submit">Add </button>
                                 </div>

                                 
                                
                                 {
                                     this.state.messageRes != '' ?
                                        <div className="alert alert-success">
                                            { this.state.messageRes }
                                        </div>
                                      :<div></div>  
                                 }
                                 
                                 
                             </form>
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
  }}
export default AddParking;