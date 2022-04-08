
import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import img from "../Dashboard/images/illustration.svg";

class SignINPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: ''
        }
    }


    connect() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "username": this.state.username, "password": this.state.password });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/signin", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.succes === false) {
                    console.log("oups");
                    this.setState({ errorMessage: result.message })
                } else {
                    // connected
                    console.log(result);
                    localStorage.setItem('token', result.token);
                    this.props.history.push('/home');
                }
            })
            .catch(error => console.log('error', error));
    }


    render() {
        return (
            <div>
                <div class="container">

                    <div class="row justify-content-center">

                        <div class="col-xl-10 col-lg-12 col-md-9">

                            <div class="card o-hidden border-0 shadow-lg my-5">
                                <div class="card-body p-0">
                                    <div class="row">
                                        <div class="col-lg-6 d-none d-lg-block">


                                            <CardMedia
                                                style={{ height: 100,width:500, marginTop:'16%',paddingTop: '86.25%',position:'center' }}
                                                image={img}
                                                
                                                
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h1 class="h4 text-gray-900 mb-4"style={{fontFamily:"fantasy",color:"#006466"}}>Welcome Back   !</h1>
                                                </div>
                                                <form class="user" onSubmit={(e) => {
                                                    e.preventDefault();
                                                    this.connect();


                                                }}  >
                                                    <div class="form-group">
                                                        <input
                                                            onChange={(e) => { this.setState({ username: e.target.value }) }}

                                                            type="text" class="form-control form-control-user"
                                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address..." />
                                                    </div>
                                                    <div class="form-group">
                                                        <input
                                                            onChange={(e) => { this.setState({ password: e.target.value }) }}

                                                            type="password" class="form-control form-control-user"
                                                            id="exampleInputPassword" placeholder="Password" />
                                                    </div>
                                                    <div class="text-center">
                                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                                    </div>

                                                    <div class="custom-control custom-checkbox small">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck" />
                                                        <label class="custom-control-label" for="customCheck">Remember
                                                            Me</label>
                                                    </div>
                                                    <br />
                                                    <button type="submit" class="btn btn-primary btn-user btn-block">
                                                        Login
                                                    </button>


                                                    <a id="google"href="index.html" class="btn btn-google btn-user btn-block">
                                                        <i class="fab fa-google fa-fw"></i> Login with Google
                                                    </a>
                                                    <a id="fb" href="index.html" class="btn btn-facebook btn-user btn-block">
                                                        <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                                    </a>
                                                    {
                                                        this.state.errorMessage !== '' ?
                                                            <div className="mt-3 alert alert-danger">
                                                                {this.state.errorMessage}
                                                            </div>
                                                            :
                                                            <div></div>
                                                    }
                                                </form>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                
            </div>
        );
    }
}

export default SignINPage;
