import React, {useState} from "react";
import AdminDetails from "../components/AdminDetails";
import Swal from 'sweetalert2';

const AddAdmin = ()=> {
    const [username,setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [admin,setAdmin] = useState(null)
    const [email, setEmail] = useState('')

    const handleAddAdmin = async () => {
        try {
            const response = await fetch('api/admin/addAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username,password,email})

            });
            if (response.ok) {
                const result = await response.json();
                setAdmin(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Admin added successfully',
                });
            } else {
                const errorMessage = await response.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
                throw new Error(errorMessage);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
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
                    required={true}
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
                    required={true}
                    type="password"
                    id="password"
                    className="form-control"
                    value={password !== null ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email:
                </label>
                <input
                    required={true}
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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