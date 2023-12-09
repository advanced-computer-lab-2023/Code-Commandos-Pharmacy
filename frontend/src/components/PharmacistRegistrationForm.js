import { useState } from 'react'
import PatientDetails from "./PatientDetails";
import PharmacistRequestDetails from "./PharmacistRequestDetails";
import {useNavigate} from "react-router-dom";

const PharmacistRegistrationForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [educationalBackground, setEducationalBackground] = useState('')
  const [newRequest, setNewRequest] = useState(null);
  const [IDFile, setIDFile] = useState(null);
  const [workLicenseFile, setWorkLicenseFile] = useState(null);
  const [pharmacyDegreeFile, setPharmacyDegreeFile] = useState(null);
  const [IDID, setIDID] = useState(null);
  const [LicenseID, setLicenseID] = useState(null);
  const [DegreeID, setDegreeID] = useState(null);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!IDID || !LicenseID || !DegreeID){
      alert("You need to submit the three files before you confirm registration")
      return
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('hourlyRate', hourlyRate);
    formData.append('affiliation', affiliation);
    formData.append('educationalBackground', educationalBackground);
    formData.append('ID', IDID);
    formData.append('workLicense', LicenseID);
    formData.append('pharmacyDegree', DegreeID);

    const jsonFormData = {};
    formData.forEach((value, key) => {
      jsonFormData[key] = value;
      console.log(key, value)
    });

    try {

      const response = await fetch('/api/pharmacistRequest/addPharmacistRequest', {
        method: 'POST',
        body: JSON.stringify(jsonFormData),
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
        setHourlyRate('')
        setAffiliation('')
        setEducationalBackground('')
        setNewRequest(json)
        alert("Request submitted successfully ")
        navigate('/Login')
      }
    }
    catch (error) {
      alert(error)
    }
  }
  const handleIDSubmit = async () => {
    setIDID(await handleFileSubmit(IDFile));

  };

  const handleWorkLicenseSubmit = async () => {
    setLicenseID(await handleFileSubmit(workLicenseFile));

  };

  const handlePharmacyDegreeSubmit = async () => {
    setDegreeID(await handleFileSubmit(pharmacyDegreeFile));
  };
  const handleFileSubmit = async (file) => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }
    if(!username){
      alert("You have to enter username before submitting the files")
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/file/addSingleFileGuest/'+username, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage);
        throw new Error(errorMessage);
      } else {
        alert('File is uploaded successfully');
        const fileId = await response.json();
        return fileId;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
      <div className="container mt-4">
        <div className="">
          <div className=" margin-left-pharm">
            <h1 className="margin-reg-adjust">Apply as a pharmacist to join the platform:</h1>
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
              <hr />
              <div className="mb-3">
                <label htmlFor="IDFile" className="form-label">
                  Upload your ID:
                </label>
                <input
                    required={true}
                    type="file"
                    className="form-control"
                    id="IDFile"
                    onChange={(e) => setIDFile(e.target.files[0])}
                />
                <button type="button" className="btn btn-primary" onClick={handleIDSubmit}>
                  Submit ID
                </button>
              </div>

              <hr />
              <div className="mb-3">
                <label htmlFor="LicensesFile" className="form-label">
                  Upload Work License:
                </label>
                <input
                    required={true}
                    type="file"
                    className="form-control"
                    id="LicensesFile"
                    onChange={(e) => setWorkLicenseFile(e.target.files[0])}
                />
                <button type="button" className="btn btn-primary" onClick={handleWorkLicenseSubmit}>
                  Submit Work License
                </button>
              </div>
              <hr />
              <div className="mb-3">
                <label htmlFor="DegreeFile" className="form-label">
                  Upload Pharmacy Degree:
                </label>
                <input
                    required={true}
                    type="file"
                    className="form-control"
                    id="DegreeFile"
                    onChange={(e) => setPharmacyDegreeFile(e.target.files[0])}
                />
                <button type="button" className="btn btn-primary" onClick={handlePharmacyDegreeSubmit}>
                  Submit Pharmacy Degree
                </button>
              </div>
              <hr />
              <button className="btn btn-primary p-2 width-adjust-button mb-3">Register</button>
            </form>
          </div>
          <div className="col-6">

          </div>
        </div>

        {newRequest && <PharmacistRequestDetails pharmacistRequest={newRequest} />}
      </div>
  );
}

export default PharmacistRegistrationForm