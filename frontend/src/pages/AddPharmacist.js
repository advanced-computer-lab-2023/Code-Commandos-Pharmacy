import {useState} from "react";
import PatientDetails from "../components/PatientDetails";
import PharmacistDetails from "../components/PharmacistDetails";

const AddPharmacist = ()=> {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [hourlyRate, setHourlyRate] = useState('')
    const [affiliation, setAffiliation] = useState('')
    const [educationalBackground, setEducationalBackground] = useState('')
    const [pharmacist, setPharmacist] = useState(null)

    const handleAddPharmacist = async () => {
        try{
            const pharmacist = {username: username, name: name, email: email, password: password, dateOfBirth: dateOfBirth, hourlyRate: hourlyRate, affiliation: affiliation, educationalBackground: educationalBackground}
            const response = await fetch('api/pharmacist/addPharmacist',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(pharmacist)
            });
            if (response.ok){
                const result = await response.json();
                setPharmacist(result)
            }
            else {
                const errorMessage = await response.text();
                alert(errorMessage)
                throw new Error(errorMessage)
            }
        }
        catch (error){
            alert(error.message)
        }
    };


    return (
        <div className="container mt-4">
            <h1 className="mb-4">Add a Pharmacist</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Username:
                </label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
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
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email:
                </label>
                <input
                    type="text"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    type="password" // Use type "password" for password input
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth:
                </label>
                <input
                    type="date" // Use type "date" for date input
                    id="dateOfBirth"
                    className="form-control"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="hourlyRate" className="form-label">
                    Hourly Rate:
                </label>
                <input
                    type="text"
                    id="hourlyRate"
                    className="form-control"
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
                    id="affiliation"
                    className="form-control"
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
                    id="educationalBackground"
                    className="form-control"
                    value={educationalBackground}
                    onChange={(e) => setEducationalBackground(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleAddPharmacist}>
                Add
            </button>

            <div className="results mt-4">
                {pharmacist && <PharmacistDetails pharmacist={pharmacist}/>}
            </div>
        </div>
    );
};

export default AddPharmacist