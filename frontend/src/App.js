import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PharmacistRegistration from './pages/registerAsPharmacist';
import PatientRegistration from './pages/registerAsPharmacyPatient';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <div className="pages">
        <Routes>
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
