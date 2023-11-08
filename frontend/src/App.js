import {BrowserRouter, Routes, Route} from "react-router-dom"
// pages & components
import ViewAvailableMedicines from "./pages/ViewAvailableMedicines";
import SelectQuantityAndSales from "./pages/SelectQuantityAndSales";
import Navbar from "./components/Navbar";
import SearchMedicineByName from "./pages/SearchMedicineByName";
import PharmacistRegistration from './pages/registerAsPharmacist';
import PatientRegistration from './pages/registerAsPharmacyPatient';
import AddAdmin from "./pages/AddAdmin";
import ViewAndRemovePatients from "./pages/ViewAndRemovePatients";
import AddPharmacist from "./pages/AddPharmacist";
import ViewAndRemovePharmacists from "./pages/ViewAndRemovePharmacists";
import ViewAllPharmacistRequests from "./pages/ViewAllPharmacistRequests";
import AddMedicine from "./pages/AddMedicine";
import EditMedicine from "./pages/EditMedicine";
import EditPatient from "./pages/EditPatient";
import PaymentMethod from "./pages/PaymentMethod";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
            path="/viewAvailableMedicines" element={<ViewAvailableMedicines/>} />
            <Route path="/quantityAndSales" element={<SelectQuantityAndSales/>} />
            <Route path="/viewAllAndSearchMedicineByName" element={<SearchMedicineByName/>} />
              <Route
                  path="/PharmacistRegistration"
                  element={<PharmacistRegistration />}
              />
              <Route
                  path="/PharmacyPatientRegistration"
                  element={<PatientRegistration />}
              />
            <Route
              path="/AddAdmin"
              element={<AddAdmin/>}
            />
            <Route
              path="/ViewAndRemovePatients"
              element={<ViewAndRemovePatients/>}
            />
            <Route
                path="/AddPharmacist"
                element={<AddPharmacist/>}
            />
            <Route
                path="/ViewAndRemovePharmacists"
                element={<ViewAndRemovePharmacists/>}
            />
            <Route
                path="/ViewAllPharmacistRequests"
                element={<ViewAllPharmacistRequests/>}
            />
            <Route path="/addMedicine" element={<AddMedicine/>} />
            <Route path="/editMedicine/:medicineName" element={<EditMedicine/>}/>
            <Route path="/editPatient/:patientName" element={<EditPatient/>}/>
            <Route path="/paymentMethod" element={<PaymentMethod/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;