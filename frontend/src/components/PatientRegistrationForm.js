import { useState } from 'react'
import PatientDetails from "./PatientDetails";

const PatientRegistrationForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  //const [emergencyContact, setEmergencyContact] = useState('')
  const [ecFullName, setEcFullName] = useState('')
  const [ecMobileNumber, setEcMobileNumber] = useState('')
  const [ecRelation, setEcRelation] = useState('')
  const [addresses, setAddresses] = useState([{ street: '', city: '', country: '' }]);

    const [newPatient, setNewPatient] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const patient = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, gender: gender, mobileNumber: mobileNumber, emergencyContact: {fullName: ecFullName, mobileNumber: ecMobileNumber, relationToPatient: ecRelation},addresses}

    try {

      const response = await fetch('/api/patient/createPatient', {
        method: 'POST',
        body: JSON.stringify(patient),
        headers: {
          'Content-Type': 'application/json'
        }
      })


      if (!response.ok) {
        alert(await response.text())
      }
      if (response.ok) {
        const json = await response.json()
        setName('')
        setUsername('')
        setEmail('')
        setPassword('')
        setGender('')
        setMobileNumber('')
        setEcFullName('')
        setEcMobileNumber('')
        setEcRelation('')
        setNewPatient(json)
        alert("Registered successfully ")
      }
    }
    catch (error){
      alert(error.message)
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Registration:</h1>
      <form className="create" onSubmit={handleSubmit}>
        {/* ... previous form inputs ... */}
        <h3>Addresses:</h3>
        {addresses.map((address, index) => (
          <div className="row mb-3" key={index}>
            <div className="col">
              <input
                type="text"
                required
                value={address.street}
                onChange={(e) => {
                  const updatedAddresses = [...addresses];
                  updatedAddresses[index].street = e.target.value;
                  setAddresses(updatedAddresses);
                }}
                className="form-control"
                placeholder="Street"
              />
            </div>
            <div className="col">
              <input
                type="text"
                required
                value={address.city}
                onChange={(e) => {
                  const updatedAddresses = [...addresses];
                  updatedAddresses[index].city = e.target.value;
                  setAddresses(updatedAddresses);
                }}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="col">
              <input
                type="text"
                required
                value={address.country}
                onChange={(e) => {
                  const updatedAddresses = [...addresses];
                  updatedAddresses[index].country = e.target.value;
                  setAddresses(updatedAddresses);
                }}
                className="form-control"
                placeholder="Country"
              />
            </div>
          </div>
        ))}
        <button className="btn btn-primary" onClick={() => setAddresses([...addresses, { street: '', city: '', country: '' }])}>
          Add Address
        </button>
  
        <button className="btn btn-primary">Register</button>
      </form>
      {newPatient && <PatientDetails patient={newPatient} />}
    </div>
  );
 };