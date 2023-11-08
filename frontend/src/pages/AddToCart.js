import {useState} from "react";
import useParams from "react-router-dom"
import MedicineDetails from "../components/MedicineDetails";

const AddToCart = ({medicine}) => {
    // Store the cart items in an array
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (selectedMedicine) => {
        const cartItem = {
            medicine: <MedicineDetails medicine={medicine} />,
        }
        // Add the cart item to the array
        setCartItems((prevCartItems) => [...prevCartItems, cartItem]);

    }
}
export default AddToCart