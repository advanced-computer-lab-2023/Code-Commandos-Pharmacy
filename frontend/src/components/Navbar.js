import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
import '../css/navbar.css';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async () =>{
        console.log("in handle logout")
        try {
            const response = await fetch('api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const message = await response.json()
                alert(message)
            }
            else {
                alert(await response.text())
            }
        }
        catch (error){
            alert(error.message)
        }
        window.localStorage.removeItem("logged");
        navigate('/Login')
        window.location.reload()
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Blog
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="servicesDropdown">

                                    <li>
                                        <Link to="/MonthlySales/December" className="dropdown-item">Pharmacy Sales Report</Link>
                                    </li>
                                </ul>
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
                                        <Link to="/ViewArchivedMedicines" className="dropdown-item">Archived Medicines</Link>
                                    </li>
                                    <li>
                                        <Link to="/quantityAndSales" className="dropdown-item">View Medicines Quantity and Sales</Link>
                                    </li>
                                    <li>
                                        <Link to="/addMedicine" className="dropdown-item">Add Medicine</Link>
                                    </li>
                                    <li>
                                        <Link to="/AddNewAddress" className="dropdown-item">Add New Address</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li>
                                <button className="cart-button">
                                    <Link to="/viewMyOrders" className="cart-link">
                                        <span className="cart-text">My Orders</span>
                                    </Link>
                                </button>
                            </li>
                        </ul>

                         <ul className="navbar-nav">
                                <li>
                                    <button className="cart-button">
                                        <Link to="/viewMyCart" className="cart-link">
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
                        <div className="nav-settings">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 className="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="settingsDrop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Settings
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="settingsDrop">
                                    <li>
                                        <Link to="/ChangePassword" className="dropdown-item">Change Password</Link>
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
export default Navbar