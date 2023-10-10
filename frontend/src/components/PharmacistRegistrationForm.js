import { useState } from 'react'
import PatientDetails from "./PatientDetails";
import PharmacistRequestDetails from "./PharmacistRequestDetails";

const PharmacistRegistrationForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [educationalBackground, setEducationalBackground] = useState('')
  const [error, setError] = useState(null)
    const [newRequest, setNewRequest] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault()

    const pharmacistRequest = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, hourlyRate: hourlyRate, affiliation: affiliation, educationalBackground: educationalBackground}

    try {

      const response = await fetch('/api/pharmacistRequest/addPharmacistRequest', {
        method: 'POST',
        body: JSON.stringify(pharmacistRequest),
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
        setHourlyRate('')
        setAffiliation('')
        setEducationalBackground('')
        setNewRequest(json)
        console.log('new pharmacist registration request added:', json)
      }
    }
    catch (error){
      alert(error.message)
    }

  }

  return (
      <div className="container mt-4">
        <h1 className="mb-4">Apply as a pharmacist to join the platform:</h1>
        <form className="create" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="hourlyRate" className="form-label">
              Hourly Rate:
            </label>
            <input
                type="number"
                className="form-control"
                id="hourlyRate"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="affiliation" className="form-label">
              Affiliation:
            </label>
            <input
                type="text"
                className="form-control"
                id="affiliation"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="educationalBackground" className="form-label">
              Educational Background:
            </label>
            <input
                type="text"
                className="form-control"
                id="educationalBackground"
                value={educationalBackground}
                onChange={(e) => setEducationalBackground(e.target.value)}
            />
          </div>

          <button className="btn btn-primary">Register</button>
          {error && <div className="error">{error}</div>}
        </form>
        {newRequest && <PharmacistRequestDetails pharmacistRequest={newRequest} />}
      </div>
  );
}

export default PharmacistRegistrationForm