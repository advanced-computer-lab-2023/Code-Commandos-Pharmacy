import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PharmacistRegistration from './pages/pharmacistUploadToRegister'
import SearchByPharmacistId from './pages/SearchByPharmacistId'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <div className="pages">
        <Routes>
          <Route
            path="/pharmacistUploadToRegister"
            element={<pharmacistUploadToRegister />}
          />


          <Route
            path="/SearchByPharmacistId"
            element={<SearchByPharmacistId />}
          />
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
