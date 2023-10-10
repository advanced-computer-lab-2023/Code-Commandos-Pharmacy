import {BrowserRouter, Routes, Route} from "react-router-dom"

// pages & components
import ViewAvailableMedicines from "./pages/ViewAvailableMedicines";
import SelectQuantityAndSales from "./pages/SelectQuantityAndSales";
import Navbar from "./components/Navbar";
import SearchMedicineByName from "./pages/SearchMedicineByName";
import AddMedicine from "./pages/AddMedicine";
import EditMedicine from "./pages/EditMedicine";

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
            <Route path="/addMedicine" element={<AddMedicine/>} />
            <Route path="/editMedicine/:medicineName" element={<EditMedicine/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
