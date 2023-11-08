import {useState} from "react";
import {useParams} from "react-router-dom";

const EditPatient = () => {
const [details, setDetails] = useState('')
const [addresses, setAddresses] = useState('')

const {patientId} = useParams()
const {patientName} = useParams()
const handleEdit = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch(`/api/patient/addPatientAddresses/${patientId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  addresses }),

            })

        if (response.ok) {
            const data = await response.json()
            alert("Patient updated successfully ")
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
        <h2 className="title-form">Edit {patientId}</h2>
        <form onSubmit={handleEdit}>
            <div className="form-row row">
                <div className="col">
                    <input type="text" required="true" onChange={(e) => setAddresses(e.target.value)} value={addresses}
                           className="form-control" placeholder="New Addresses"/>
                </div>
            </div>
            <button type="submit" className="btn submit-btn">Submit</button>
        </form>
    </div>
    </body>
)
}
export default EditPatient