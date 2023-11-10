import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../css/navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";

const Navbar = () => {

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    const handleLogout = async () =>{
        console.log("in handle logout")
        removeCookie("token",{path:'/'});
        window.localStorage.removeItem("logged");
        navigate('/Login')
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-light fixed-top">
                <div className="container">
                    <a className="navbar-brand col-4" href="#">
                        <img src={logo} class="logo" alt="Logo"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse items-nav col-8" id="navbarCollapse">
                            <ul class="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Blog</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Pharmacy
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="servicesDropdown">

                                        <li>
                                            <Link to="/AddAdmin" className="dropdown-item">Add admin</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewAndRemovePatients" className="dropdown-item">View And Remove Patients</Link>
                                        </li>
                                        <li>
                                            <Link to="/PatientRegistration" className="dropdown-item">Patient Registration</Link>
                                        </li>
                                        <li>
                                            <Link to="/PharmacistRegistration" className="dropdown-item">Pharmacist Registration</Link>
                                        </li>
                                        <li>
                                            <Link to="/AddPharmacist" className="dropdown-item">Add Pharmacist</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewAndRemovePharmacists" className="dropdown-item">View And Remove Pharmacists</Link>
                                        </li>
                                        <li>
                                            <Link to="/ViewAllPharmacistRequests" className="dropdown-item">View All Pharmacist Requests</Link>
                                        </li>
                                        <li>
                                            <Link to="/viewAllAndSearchMedicineByName" className="dropdown-item">View Available Medicines</Link>
                                        </li>
                                        <li>
                                            <Link to="/quantityAndSales" className="dropdown-item">View Medicines Quantity and Sales</Link>
                                        </li>
                                        <li>
                                            <Link to="/addMedicine" className="dropdown-item">Add Medicine</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        <ul className="navbar-nav">
                            <li>
                                <button className="cart-button">
                                    <Link to="#" className="cart-link">
                                        <span className="cart-text">My Orders</span>
                                    </Link>
                                </button>
                            </li>
                        </ul>

                         <ul class="navbar-nav">
                                <li>
                                    <button className="cart-button">
                                        <Link to="#" className="cart-link">
                                            <span className="cart-text">Cart</span>
                                            <img className="cart-icon" src={require(`../images/addToCart.png`)} alt="Cart"/>
                                        </Link>
                                    </button>
                                </li>
                            </ul>
                        <ul className="navbar-nav">
                            <li>
                                <button onClick={handleLogout} className="buttonNav logout">Log out</button>
                            </li>
                            <li>
                                <button className="buttonNav">Sign Up</button>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Navbar