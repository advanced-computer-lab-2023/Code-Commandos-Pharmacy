import {BrowserRouter, Routes, Route} from "react-router-dom"
// pages & components
import ViewAvailableMedicines from "./pages/ViewAvailableMedicines";
import SelectQuantityAndSales from "./pages/SelectQuantityAndSales";
import Navbar from "./components/Navbar";
import SearchMedicineByName from "./pages/SearchMedicineByName";
import PharmacistRegistration from './pages/registerAsPharmacist';
import PatientRegistration from './pages/registerAsPharmacyPatient';

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
