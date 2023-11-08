import {BrowserRouter, Routes, Route} from "react-router-dom"
// pages & components
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
import AddToCart from "./pages/AddToCart";
import MyCart from "./pages/MyCart";

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
                  path="/PatientRegistration"
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
            <Route path="/addMedicineToCart/:medicineName" element={<AddToCart/>}/>
            <Route path="/myCart" element={<MyCart/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
