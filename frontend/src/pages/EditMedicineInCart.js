import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Swal from "sweetalert2";

const EditMedicine = () => {
    const { medicineName } = useParams();
    const [newAmount, setNewAmount] = useState('');
    const navigate = useNavigate()

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const amount = parseInt(newAmount); // Convert newAmount to a number

            if (isNaN(amount)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Invalid Amount',
                    text: 'Please enter a valid amount',
                });
                return;
            }

            const response = await fetch(`/api/cart/updateAmount/${medicineName}/${newAmount}`, {
                method: 'PUT',
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Amount updated successfully',
                }).then(() => {
                    navigate('/viewMyCart');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
                console.log('Amount Failed:', response.status);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
            console.log('Error', error);
        }
    };

    const handleChange = (e) => {
        setNewAmount(e.target.value);
    };

    return (
        <div className="container container-form">
            <h2 className="title-form">Edit {medicineName}</h2>
            <form onSubmit={handleEdit}>
                <div className="form-row row">
                    <div className="col">
                        <input
                            type="text"
                            required
                            value={newAmount}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="New Amount"
                        />
                    </div>
                </div>
                <button type="submit" className="btn submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditMedicine;