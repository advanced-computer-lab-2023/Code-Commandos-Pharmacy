import React, {useState} from "react";
import "../css/style.css"
import '../css/login.css';
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const isLogged = window.localStorage.getItem("logged");
    const handleLogin = async () => {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            window.localStorage.setItem("logged", true)
            navigate('/Home')
            window.location.reload()
        }
        if (!response.ok) {
            alert(await response.text())
        }
    };

    const handleReset = () => {
        console.log("here")
        navigate('/EnterEmailReset')
        window.location.reload()
    }
    // if (!isLogged) {
    return (
        <body className="my-custom-background">
        <div className="container ">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card box login-card">
                        <h4 className="login-header-edit">Login</h4>
                        <h5 className="welcome-text-edit">Welcome to El7a2ni</h5>

                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control input-danger fontMed"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control input-danger"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <br/>
                                <button
                                    type="button"
                                    className="btn btn-block buttons login-btn"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                                <br/>

                                <p className="text-center">
                                    <Link className="link-edit" to="/EnterEmailReset">Forgot Password?</Link>
                                </p>
                                <p className="text-center">
                                    <Link className="link-edit" to="/Register">Sign Up</Link>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <img src={require('../images/final-logo.gif')} alt="Sold Out" className="logo-edit" />
                </div>
            </div>
        </div>
        </body>

    );
    // } else {
    //     return (
    //         <div>
    //             <Home />
    //         </div>
    //     );
    // }
};

export default Login;