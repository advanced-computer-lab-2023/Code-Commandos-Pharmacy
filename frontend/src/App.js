import {BrowserRouter, Routes, Route} from "react-router-dom"

// pages & components
import ViewAvailableMedicines from "./pages/ViewAvailableMedicines";
import SelectQuantityAndSales from "./pages/SelectQuantityAndSales";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
            path="/medicines" element={<ViewAvailableMedicines/>}
            />
            <Route path="/quantityAndSales" element={<SelectQuantityAndSales/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
