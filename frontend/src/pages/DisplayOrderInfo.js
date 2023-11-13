import {useEffect, useState} from "react";
import OrderInfo from "../components/OrderInfo";

const DisplayOrderInfo = () => {
    const [orders,setOrders] = useState(null)
    useEffect( () => {
            const fetchOrders = async () => {
                try {
                    const response = await fetch('/api/order/getOrders')
                    const json = await response.json()
                    if (response.ok) {
                        setOrders(json)
                    }
                    else {
                        alert(await response.text())
                    }
                }
                catch (error){
                    alert(error.message)
                }
            }
            fetchOrders()
        }, []
    )
    return(
        <body>
        <h2 className="left-part">My Orders</h2>
        <div className="medicines-quantity-sales">
            {orders && orders.map((order) => (
                <OrderInfo
                    id={order.orderId}
                    status={order.status}
                    numberOfItems={order.totalNumberOfItems}
                    totalPrice={order.totalPrice}
                    paymentOption={order.paymentOption}
                />
            ))}
        </div>
        </body>
    )
}
export default DisplayOrderInfo