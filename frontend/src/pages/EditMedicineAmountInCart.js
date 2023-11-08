import {useState} from "react";
import {useParams} from "react-router-dom";

const EditMedicineAmountInCart = () => {

    // To store the updated details and price entered by the user
    const [amount, setAmount] = useState('')

    const {medicineName} = useParams()

    const handleEdit = async (e) => {
        e.preventDefault()

        // Set the input in details and price in the medicine with name medicineName

        try {
            const response = await fetch(`/api/medicine/editAmount/${medicineName}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount }),

                })

            if (response.ok) {
                const data = await response.json()
                alert("Medicine updated successfully ")
            } else {
                alert(await response.text())
                console.log('Update Failed: ', response.status)
            }
        } catch (error) {
            alert(error.message)
            console.log('Error', error)
        }
    }


    return (
        <body>
        <div className="container container-form">
            <h2 className="title-form">Edit {medicineName}'s Amount</h2>
            <form onSubmit={handleEdit}>
                <div className="form-row row">
                    <div className="col">
                        <input type="text" required="true" onChange={(e) => setAmount(e.target.value)} value={amount}
                               className="form-control" placeholder="New Amount"/>
                    </div>
                </div>
                <button type="submit" className="btn submit-btn">Submit</button>
            </form>
        </div>
        </body>
    )
}
export default EditMedicineAmountInCart