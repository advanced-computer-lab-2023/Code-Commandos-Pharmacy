import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../css/navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

const AdminNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("in handle logout");
        try {
            window.localStorage.removeItem("logged");
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
                window.localStorage.removeItem("username")
                window.localStorage.removeItem("role");
                window.localStorage.removeItem("name");
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
                                <Link to="/AdminHome" className="nav-link">Home </Link>
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
                                    Pharmacy
                                </a>
                            </li>
                        </ul>

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
export default AdminNavbar