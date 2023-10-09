import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PharmacistRegistration from './pages/pharmacistUploadToRegister'
import SearchByPharmacistId from './pages/SearchByPharmacistId'
import PharmacistDeleteForm from  './components/pharmacistDeleteForm'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <div className="pages">
        <Routes>
          <Route
            path="/pharmacistUploadToRegister"
            element={<PharmacistRegistration />}
          />

          <Route
            path="/PharmacistDelete"
            element={<PharmacistDeleteForm />}
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
