import {useState} from "react";
import {useParams} from "react-router-dom";

const EditPatient = () => {
const [address, setAddress] = useState('')

const {patientID} = useParams()

const handleEdit = async (e) => {
    e.preventDefault()

    // Set the input in details and price in the medicine with name medicineName

    try {
        const response = await fetch(`/api/patient/addPatientAddress/${patientId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  address }),

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



}