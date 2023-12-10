import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";

const AddMedicine = () => {
    // create a state for each attribute
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [details, setDetails] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [sideEffects, setSideEffects] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [medicinalUse, setMedicinalUse] = useState('')
    const [imageUploadFile, setImageUploadFile] = useState(null);
    const [imageUploadID, setImageUploadID] = useState(null);
    const [ingredients, setIngredients] = useState([])

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageUploadFile(file);
        console.log(file.name)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageUploadID) {
            Swal.fire({
                icon: 'warning',
                title: 'Image Upload',
                text: 'You have to submit the image first',
            });
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('details', details);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('manufacturer', manufacturer);
        formData.append('ingredients', ingredients);
        formData.append('sideEffects', sideEffects);
        formData.append('expiryDate', expiryDate);
        formData.append('medicinalUse', medicinalUse);
        formData.append('imageUploadFile', imageUploadFile);
        formData.append('imageUploadID', imageUploadID);
        const jsonFormData = {};
        formData.forEach((value, key) => {
            jsonFormData[key] = value;
            console.log(key, value);
        });

        try {
            const response = await fetch('/api/medicine/addMedicine', {
                method: 'POST',
                body: JSON.stringify(jsonFormData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: await response.text(),
                });
            }
            if (response.ok) {
                setName('');
                setDescription('');
                setDetails('');
                setPrice('');
                setQuantity('');
                setManufacturer('');
                setIngredients([]);
                setSideEffects('');
                setExpiryDate('');
                setMedicinalUse('');
                setImageUploadFile(null);
                Swal.fire({
                    icon: 'success',
                    title: 'Added successfully',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    const handleImageSubmit = async () => {
        setImageUploadID( await handleFileSubmit( imageUploadFile));
    };

    const handleFileSubmit = async ( file) => {
        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/file/addSingleFile', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                alert(errorMessage);
                throw new Error(errorMessage);
            } else {
                alert('File is uploaded successfully');
                const fileId = await response.json();
                return fileId;
            }
        } catch (error) {
            alert(error.message);
        }
    };

    // 1) I need to save the value written in the form : Onchange
    // 2) I need to trigger the addMedicine when I submit : OnSubmit
    return (
        <div className="container container-form">
            <h2 className="title-form">Add Medicine</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                </div>
                <div className="form-row row">
                    <div className="form-group">
                        <label htmlFor="ingredients"></label>
                        {ingredients.map((ingredient, index) => (
                            <input
                                type="text"
                                className="form-control"
                                key={index}
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                            />
                        ))}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddIngredient}
                        >
                            Add Ingredient
                        </button>
                    </div>
                </div>
                <div className="form-row row mt-4">
                    <div className="mb-3">
                        <label htmlFor="imageFile" className="form-label">
                            Upload medicine image
                        </label>
                        <input
                            required={true}
                            type="file"
                            className="form-control"
                            id="imageUploadFile"
                            onChange={  (e) => setImageUploadFile(e.target.files[0])}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleImageSubmit}>
                            Submit image
                        </button>

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
            <img className="heart-workout-edit" src={require(`../images/heart-gig.gif`)} alt="Pharmacy"/>

        </div>
    )
}
export default AddMedicine