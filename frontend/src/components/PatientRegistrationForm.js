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
  const [error, setError] = useState(null)
    const [newPatient, setNewPatient] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault()

    const patient = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, gender: gender, mobileNumber: mobileNumber, emergencyContact: {fullName: ecFullName, mobileNumber: ecMobileNumber, relationToPatient: ecRelation}}

    try {

      const response = await fetch('/api/pharmacyPatient/createPatient', {
        method: 'POST',
        body: JSON.stringify(patient),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.message)
        alert(await response.text())
      }
      if (response.ok) {
        setError(null)
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
        console.log('new patient registered:', json)
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
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
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
                type="radio"
                id="MALE"
                name="gender"
                onChange={(e) => setGender(e.target.id)}
            />
            <label htmlFor="MALE">Male</label><br />
            <input
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
                type="text"
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
                type="text"
                className="form-control"
                id="ecMobileNumber"
                onChange={(e) => setEcMobileNumber(e.target.value)}
                value={ecMobileNumber}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Relation to Emergency Contact:</label><br />
            <input
                type="radio"
                id="HUSBAND"
                name="relation"
                onChange={(e) => setEcRelation(e.target.id)}
            />
            <label htmlFor="HUSBAND">Husband</label><br />
            <input
                type="radio"
                id="WIFE"
                name="relation"
                onChange={(e) => setEcRelation(e.target.id)}
            />
            <label htmlFor="WIFE">Wife</label><br />
            <input
                type="radio"
                id="CHILDREN"
                name="relation"
                onChange={(e) => setEcRelation(e.target.id)}
            />
            <label htmlFor="CHILDREN">Son/Daughter</label><br />
          </div>
          <button className="btn btn-primary">Register</button>
          {error && <div className="error">{error}</div>}
        </form>
        {newPatient && <PatientDetails patient={newPatient} />}
      </div>
  );

}

export default PatientRegistrationForm