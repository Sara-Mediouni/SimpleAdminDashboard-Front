 
import React from 'react';
import { Link } from 'react-router-dom';
import SideNav from '../Dashboard/SideNav';

class VehiculesAddPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        user: null, 

        marque:"",
        errMsgMarque:"",

        model:"",
        pf:0,
        color:"",
        registrationPlate:"",
        cinOwner:"",
        fullnameOwner:"",


        // server res
        messageRes:"",
        isInserted: false
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


  addVehicule(){
      let vehicule = this.state;

        //delete vehicule.user;

       if (vehicule.marque != '') {
           if (vehicule.model != '') {
               // ...
               var myHeaders = new Headers();
               myHeaders.append("Content-Type", "application/json");
               myHeaders.append("Authorization", localStorage.getItem('token'));
           
               var raw = JSON.stringify(vehicule);
       
               var requestOptions = {
               method: 'POST',
               headers: myHeaders,
               body: raw,
               redirect: 'follow'
               };
       
               fetch("http://localhost:3000/api/vehicules/add", requestOptions)
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
               .catch(error => console.log('error', error));
           }
       }else{
           this.setState({errMsgMarque:"marque est obligatoire"})
       }
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
                        <h1 class="h3 mb-0 "style={{fontFamily:"fantasy",color:"#006466"}}>Parc vehicules</h1>
                        <Link to="/vehicules"   class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-arrow-left fa-sm text-white-50"></i> Return</Link>
                    </div>



                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold "style={{color:"#a01a58"}}>Ajout d'un vehicule</h6>
                        </div>
                        <div class="card-body">
                             <form onSubmit={ (e)=>{
                                 e.preventDefault();
                                 this.addVehicule()
                             } } >
                                 <div className="mb-3">
                                    <label>Brand</label>
                                    <input type="text" className="form-control" value={ this.state.marque } onChange={ (e)=>{ this.setState({marque:e.target.value}) } } />
                                    <p className="text-danger">{this.state.errMsgMarque}</p>
                                 </div>
                                 <div className="mb-3">
                                    <label>Model</label>
                                    <input type="text" className="form-control" value={ this.state.model } onChange={ (e)=>{ this.setState({model:e.target.value}) } } />
                                 </div>
                                 <div className="mb-3">
                                    <label>Puissance</label>
                                    <input type="number" className="form-control" value={ this.state.pf } onChange={ (e)=>{ this.setState({pf:e.target.value}) } } />
                                 </div>
                                 <div className="mb-3">
                                    <label>Color</label>
                                    <input type="color" className="form-control" value={ this.state.color } onChange={ (e)=>{ this.setState({color:e.target.value}) } } />
                                 </div>
                                 <div className="mb-3">
                                    <label>Plaque d'immatriculation</label>
                                    <input type="text" className="form-control" value={ this.state.registrationPlate } onChange={ (e)=>{ this.setState({registrationPlate:e.target.value}) } } />
                                 </div>
                                 <div className="mb-3">
                                    <label>CIN prop</label>
                                    <input type="text" className="form-control" value={ this.state.cinOwner } onChange={ (e)=>{ this.setState({cinOwner:e.target.value}) } } />
                                 </div>
                                 <div className="mb-3">
                                    <label>Owner</label>
                                    <input type="text" className="form-control" value={ this.state.fullnameOwner } onChange={ (e)=>{ this.setState({fullnameOwner:e.target.value}) } } />
                                 </div>
                                 <div className="mb-3">
                                   <button className="btn "style={{background:"#5c4d7d" ,color:"#f0efeb", border:"#f0efeb",marginRight:15}} type="submit">Add </button>
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
  }
}

export default VehiculesAddPage;
