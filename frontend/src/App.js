import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import ViewAvailableMedicines from "./pages/ViewAvailableMedicines";
import SelectQuantityAndSales from "./pages/SelectQuantityAndSales";
import Navbar from "./components/Navbar";
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
            <Route path="/Login" element={logged ? <Navigate to="/Home" replace /> : <Login/>}/>
            <Route path="/Home" element={<Home/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
