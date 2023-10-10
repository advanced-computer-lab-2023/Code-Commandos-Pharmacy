import {BrowserRouter, Routes, Route} from "react-router-dom"

// pages & components
import ViewAvailableMedicines from "./pages/ViewAvailableMedicines";
import SelectQuantityAndSales from "./pages/SelectQuantityAndSales";
import Navbar from "./components/Navbar";
import SearchMedicineByName from "./pages/SearchMedicineByName";
import AddMedicine from "./pages/AddMedicine";

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
