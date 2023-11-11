import { useState } from 'react';
import { useParams } from 'react-router-dom';

const EditMedicine = () => {
    const { medicineName } = useParams();
    const [newAmount, setNewAmount] = useState('');

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const amount = parseInt(newAmount); // Convert newAmount to a number

            if (isNaN(amount)) {
                alert('Please enter a valid amount');
                return;
            }

            const response = await fetch(`/api/cart/updateAmount/${medicineName}/${newAmount}`, {
                method: 'PUT',
            });

            if (response.ok) {
                const data = await response.json();
                alert('Amount updated successfully');
            } else {
                alert(await response.text());
                console.log('Amount Failed:', response.status);
            }
        } catch (error) {
            alert(error.message);
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