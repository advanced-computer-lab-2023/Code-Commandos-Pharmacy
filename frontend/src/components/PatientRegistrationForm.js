import { useState } from 'react'
import PatientDetails from "./PatientDetails";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate()
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
        navigate('/Login')
      }
    }
    catch (error){
      alert(error.message)
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="margin-reg-adjust">Registration:</h1>
      <form className="create" onSubmit={handleSubmit}>
        {/* ... previous form inputs ... */}
        <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
                required
                type="text"
                className="form-control"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
                required
                type="text"
                className="form-control"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail:
              </label>
            <input
                required
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
                required
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth:
            </label>
            <input
                required
                type="date"
                className="form-control"
                id="dateOfBirth"
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender:</label><br />
            <input
                required
            type="radio"
            id="MALE"
            name="gender"
            onChange={(e) => setGender(e.target.id)}
        />
        <label htmlFor="MALE">Male</label><br />
        <input
            required
            type="radio"
            id="FEMALE"
            name="gender"
            onChange={(e) => setGender(e.target.id)}
        />
        <label htmlFor="FEMALE">Female</label><br />
      </div>
      <div className="mb-3">
        <label htmlFor="mobileNumber" className="form-label">
          Mobile Number:
        </label>
        <input
            required
            type="number"
            className="form-control"
            id="mobileNumber"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="ecFullName" className="form-label">
          Emergency Contact Full Name:
        </label>
        <input
            required
            type="text"
            className="form-control"
            id="ecFullName"
            onChange={(e) => setEcFullName(e.target.value)}
                value={ecFullName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ecMobileNumber" className="form-label">
              Emergency Contact Mobile Number:
            </label>
            <input
                required
                type="number"
                className="form-control"
                id="ecMobileNumber"
                onChange={(e) => setEcMobileNumber(e.target.value)}
                value={ecMobileNumber}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Relation to Emergency Contact:</label><br />
            <input
                required
                type="radio"
                id="HUSBAND"
                name="relation"
                onChange={(e) => setEcRelation(e.target.id)}
            />
            <label htmlFor="HUSBAND">Husband</label><br />
            <input
                required
                type="radio"
                id="WIFE"
                name="relation"
                onChange={(e) => setEcRelation(e.target.id)}
            />
            <label htmlFor="WIFE">Wife</label><br />
            <input
                required
                type="radio"
                id="CHILDREN"
                name="relation"
                onChange={(e) => setEcRelation(e.target.id)}
            />
            <label htmlFor="CHILDREN">Son/Daughter</label><br />
          </div>
        <br/>
        <br/>
        <button className="btn btn-primary p-2 width-adjust-button">Register</button>
        <br/>
      </form>
      {newPatient && <PatientDetails patient={newPatient} />}
      <br/>
    </div>
  );
 };

export default PatientRegistrationForm