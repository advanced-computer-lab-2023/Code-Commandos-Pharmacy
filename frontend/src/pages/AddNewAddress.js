import { useState } from "react";
import { useParams } from "react-router-dom";
// this to add new address in case I already registered
const EditPatient = () => {
  const [addresses, setAddresses] = useState([{ street: "", city: "", country: "" }]);
  //const { patientName } = useParams();

  const handleAddAddress = () => {
    setAddresses([...addresses, { street: "", city: "", country: "" }]);
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/patient/addPatientAddresses/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addresses }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Patient addresses updated successfully");
      } else {
        alert(await response.text());
        console.log('Update Failed: ', response.status);
      }
    } catch (error) {
      alert(error.message);
      console.log('Error', error);
    }
  };

  return (
    <div className="container container-form">
      <h2 className="title-form">Add New Address </h2>
      <form onSubmit={handleEdit}>
        {addresses.map((address, index) => (
          <div key={index} className="form-row row">
            
            <div className="col">
              <input
                type="text"
                required="true"
                value={address.street}
                onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                className="form-control"
                placeholder="Street"
              />
            </div>
            <div className="col">
              <input
                type="text"
                required="true"
                value={address.city}
                onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="col">
              <input
                type="text"
                required="true"
                value={address.country}
                onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                className="form-control"
                placeholder="Country"
              />
            </div>
            <div className="col">
            <button type="button" className="btn btn-secondary" onClick={handleAddAddress}>
          Add Address
             </button>
            </div>
          </div>
        ))}
        
        <button type="submit" className="btn submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditPatient;
