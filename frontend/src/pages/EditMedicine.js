import {useState} from "react";
import {useParams} from "react-router-dom";
import Swal from "sweetalert2";

const EditMedicine = () => {

    // To store the updated details and price entered by the user
    const [details, setDetails] = useState('')
    const [price, setPrice] = useState('')

    const {medicineName} = useParams()


    const handleEdit = async (e) => {
        e.preventDefault();

        // Set the input in details and price in the medicine with name medicineName

        try {
            const response = await fetch(`/api/medicine/updateDetailsAndPrice/${medicineName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ details, price }),
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Medicine updated successfully',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
                console.log('Update Failed: ', response.status);
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


    return (
        <body>
        <div className="container container-form">
            <h2 className="title-form">Edit {medicineName}</h2>
            <form onSubmit={handleEdit}>
                <div className="form-row row">
                    <div className="col">
                        <input type="text" onChange={(e) => setDetails(e.target.value)} value={details}
                               className="form-control" placeholder="New Details"/>
                    </div>
                    <div className="col">
                        <input type="number" onChange={(e) => setPrice(e.target.value)} value={price}
                               className="form-control" placeholder="New Price"/>
                    </div>
                </div>
                <button type="submit" className="btn submit-btn">Submit</button>
            </form>
        </div>
        </body>
    )
}
export default EditMedicine