import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import ViewAvailableMedicines from "./pages/ViewAvailableMedicines";
import SelectQuantityAndSales from "./pages/SelectQuantityAndSales";
import SearchMedicineByName from "./pages/SearchMedicineByName";
import PharmacistRegistration from './pages/registerAsPharmacist';
import PatientRegistration from './pages/registerAsPatient';
import AddAdmin from "./pages/AddAdmin";
import ViewAndRemovePatients from "./pages/ViewAndRemovePatients";
import AddPharmacist from "./pages/AddPharmacist";
import ViewAndRemovePharmacists from "./pages/ViewAndRemovePharmacists";
import ViewAllPharmacistRequests from "./pages/ViewAllPharmacistRequests";
import AddMedicine from "./pages/AddMedicine";
import EditMedicine from "./pages/EditMedicine";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EnterEmailReset from "./components/EnterEmailReset";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import MyCart from "./pages/MyCart";
import EditMedicineInCart from "./pages/EditMedicineInCart";
import PlaceOrder from "./pages/PlaceOrder"
import AddNewAddress from "./pages/AddNewAddress";
import PaymentCancel from "./pages/PaymentCancel"
import PaymentSuccess from "./pages/PaymentSuccess"
import DisplayOrderInfo from "./pages/DisplayOrderInfo";


function App() {

    const logged = window.localStorage.getItem("logged");

    return (
        <div className="App">
            <BrowserRouter>
                {logged ? <Home/> : <Login />}
                <div className="pages">
                    <Routes>
                        <Route path="/viewAvailableMedicines" element={<ViewAvailableMedicines/>} />
                        <Route path="/quantityAndSales" element={<SelectQuantityAndSales/>} />
                        <Route path="/viewAllAndSearchMedicineByName" element={<SearchMedicineByName/>} />
                        <Route path="/PharmacistRegistration" element={<PharmacistRegistration />}/>
                        <Route path="/PatientRegistration" element={<PatientRegistration />}/>
                        <Route path="/AddAdmin" element={<AddAdmin/>}/>
                        <Route path="/ViewAndRemovePatients" element={<ViewAndRemovePatients/>}/>
                        <Route path="/AddPharmacist" element={<AddPharmacist/>}/>
                        <Route path="/ViewAndRemovePharmacists" element={<ViewAndRemovePharmacists/>}/>
                        <Route path="/ViewAllPharmacistRequests" element={<ViewAllPharmacistRequests/>}/>
                        <Route path="/addMedicine" element={<AddMedicine/>} />
                        <Route path="/editMedicine/:medicineName" element={<EditMedicine/>}/>
                        <Route path="/EnterEmailReset"  element={<EnterEmailReset/>}/>
                        <Route path="/ResetPassword"  element={<ResetPassword/>}/>
                        <Route path="/ChangePassword"  element={<ChangePassword/>}/>
                        <Route path="/editMedicine/:medicineName" element={<EditMedicine/>}/>
                        <Route path="/viewMyCart" element={<MyCart/>}/>
                        <Route path="/editMedicineInCart/:medicineName" element={<EditMedicineInCart/>}/>
                        <Route path="/placeOrder" element={<PlaceOrder/>}/>
                        <Route path="/viewMyOrders" element={<DisplayOrderInfo/>}/>
                        <Route path="/paymentSuccess" element={<PaymentSuccess/>}/>
                        <Route path="/paymentCancel" element={<PaymentCancel/>}/>
                        <Route path="/AddNewAddress" element={<AddNewAddress/>}/>
                        <Route path="/Login" element={logged ? <Navigate to="/Home" replace /> : <Navigate to="/Login" replace /> }/>
                        <Route path="/Home" element={<Home/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
