import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../css/navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

const PharmacistNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("in handle logout");
        try {
            const response = await fetch('api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const message = await response.json();
                await Swal.fire({
                    icon: 'success',
                    title: 'Successfully logged out',
                    showConfirmButton: true
                });
                window.localStorage.removeItem("logged");
                navigate('/Login');
                window.location.reload();
            } else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Error',
                    text: errorMessage,
                    showCancelButton: true,
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Logout Error',
                text: error.message,
                showCancelButton: true,
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-light fixed-top">
                <div className="container">
                    <a className="navbar-brand col-4" href="#">
                        <img src={logo} class="logo" alt="Logo"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse items-nav col-8" id="navbarCollapse">
                        <ul class="navbar-nav">
                            <li className="nav-item">
                                <Link to="/PharmacistHome" className="nav-link">Home </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Blog</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    PharmacyARWA
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                                    <li>
                                        <Link to="/AddNewAddress" className="dropdown-item items-dropdown">Add New Address</Link>
                                    </li>
                                    <li>
                                        <Link to="/viewMyOrders" className="dropdown-item items-dropdown">My Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/viewMyCart" className="dropdown-item items-dropdown">Cart</Link>
                                    </li>


                                </ul>
                            </li>
                        </ul>
                        {/*<div className="nav-settings">*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"*/}
                        {/*         className="bi bi-gear" viewBox="0 0 16 16">*/}
                        {/*        <path*/}
                        {/*            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>*/}
                        {/*        <path*/}
                        {/*            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>*/}
                        {/*    </svg>*/}
                        {/*    <div className="nav-item dropdown">*/}
                        {/*        <a className="nav-link dropdown-toggle" href="#" id="settingsDrop" role="button"*/}
                        {/*           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                        {/*            Settings*/}
                        {/*        </a>*/}
                        {/*        <ul className="dropdown-menu" aria-labelledby="settingsDrop">*/}
                        {/*            <li>*/}
                        {/*                <Link to="/ChangePassword" className="dropdown-item">Change Password</Link>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}

                        {/*</div>*/}
                        <div className="nav-settings">
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="settingsDrop" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    My Account
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="settingsDrop">
                                    <li>
                                        <button className="logout-btn items-dropdown">Profile</button>
                                    </li>
                                    <li>
                                        <button className="logout-btn items-dropdown">Addresses</button>
                                    </li>
                                    <li>
                                        <Link to="/ChangePassword" className="dropdown-item margin-left-pass items-dropdown">Change Password</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="logout-btn items-dropdown">Log out</button>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>
            </nav>
        </header>
    )
}
export default PharmacistNavbar