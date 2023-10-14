import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddMedicine = () => {
    // create a state for each attribute
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [details, setDetails] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [sideEffects, setSideEffects] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [medicinalUse, setMedicinalUse] = useState('')
    const [image, setImage] = useState('')
    const [sales, setSales] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()

        const medicine = {
            name,
            description,
            details,
            price,
            quantity,
            manufacturer,
            ingredients,
            sideEffects,
            expiryDate,
            medicinalUse,
            image,
            sales
        }
        try {
            console.log(medicine)
            const response = await fetch('/api/medicine/addMedicine', {
                method: 'POST',
                //We can't send the object, we have to send a JSON
                body: JSON.stringify(medicine),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                alert(await response.text())
            }
            if (response.ok) {
                setName('')
                setDescription('')
                setDetails('')
                setPrice('')
                setQuantity('')
                setManufacturer('')
                setIngredients('')
                setSideEffects('')
                setExpiryDate('')
                setMedicinalUse('')
                setImage('')
                setSales('')
                alert("Added successfully ")
            }
        }
        catch (error){
            alert(error.message)
        }
    }


    // 1) I need to save the value written in the form : Onchange
    // 2) I need to trigger the addMedicine when I submit : OnSubmit
    return (
        <body>
        <div className="container container-form">
            <h2 className="title-form">Add Medicine</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row row">
                    <div className="col">
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name}
                               className="form-control" placeholder="Name"/>
                    </div>
                    <div className="col">
                        <input type="number" onChange={(e) => setPrice(e.target.value)} value={price}
                               className="form-control" placeholder="Price"/>
                    </div>
                </div>
                <div className="form-row row">
                    <div className="form-group">
                        <label htmlFor="description"></label>
                        <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description" id="description" rows="3"></textarea>
                    </div>
                </div>
                <div className="form-row row">
                    <div className="form-group">
                        <label htmlFor="details"></label>
                        <textarea className="form-control" onChange={(e) => setDetails(e.target.value)} value={details} placeholder="Details" id="details" rows="3"></textarea>
                    </div>
                </div>
                <div className="form-row row mt-4">
                    <div className="col">
                        <input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity}
                               className="form-control" placeholder="Quantity"/>
                    </div>
                    <div className="col">
                        <input type="text" onChange={(e) => setManufacturer(e.target.value)} value={manufacturer}
                               className="form-control" placeholder="Manufacturer"/>
                    </div>
                    <div className="col">
                        <input type="number" onChange={(e) => setSales(e.target.value)} value={sales}
                               className="form-control" placeholder="Sales"/>
                    </div>
                </div>
                <div className="form-row row">
                    <div className="form-group">
                        <label htmlFor="ingredients"></label>
                        <textarea className="form-control" onChange={(e) => setIngredients(e.target.value)} value={ingredients} placeholder="Ingredients" id="ingredients" rows="3"></textarea>
                    </div>
                </div>
                <div className="form-row row mt-4">
                    <div className="col">
                        <input type="text" onChange={(e) => setImage(e.target.value)} value={image}
                               className="form-control" placeholder="Image"/>
                    </div>
                    <div className="col">
                        <select
                            value={medicinalUse}
                            onChange={(e) => setMedicinalUse(e.target.value)}
                            className="form-control"
                            placeholder="Medicinal Use"
                        >
                            <option value="">Select Medicinal Use</option>
                            <option value="PAIN-RELIEF">Pain Relief</option>
                            <option value="ANTI-INFLAMMATORY">Anti-Inflammatory</option>
                            <option value="ANTIPYRETIC">Antipyretic</option>
                            <option value="ANTIDEPRESSANT">Antidepressant</option>
                            <option value="ANTIDIABETIC">Antidiabetic</option>
                            <option value="ANTIEMETIC">Antiemetic</option>
                            <option value="MUSCLE RELAXANT">Muscle Relaxant</option>
                            <option value="SEDATIVE">Sedative</option>
                            <option value="VITAMIN">Vitamin</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="date" onChange={(e) => setExpiryDate(e.target.value)} value={expiryDate}
                               className="form-control" placeholder="Expiry Date"/>
                    </div>
                </div>
                <div className="form-row row">
                    <div className="form-group">
                        <label htmlFor="effects"></label>
                        <textarea className="form-control" onChange={(e) => setSideEffects(e.target.value)} value={sideEffects} placeholder="Side Effects" id="effects" rows="3"></textarea>
                    </div>
                </div>
                <button type="submit" className="btn submit-btn">Submit</button>
            </form>
        </div>
        </body>
    )
}
export default AddMedicine