import {useState} from "react";
import AdminDetails from "../components/AdminDetails";

const AddAdmin = ()=> {
    const [username,setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [admin,setAdmin] = useState(null)

    const handleAddAdmin = async () => {
        try{
            const response = await fetch('api/admin/addAdmin',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({username,password})
            });
            if (response.ok){
                const result = await response.json();
                setAdmin(result)
                alert("Admin added successfully ")
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
            <h1 className="mb-4">Add an admin</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Username:
                </label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={username !== null ? username : ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input
                    type="text"
                    id="password"
                    className="form-control"
                    value={password !== null ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleAddAdmin}>
                Add
            </button>

            <div className="results mt-4">
                {admin && <AdminDetails admin={admin}/>}
            </div>
        </div>
    );
};

export default AddAdmin