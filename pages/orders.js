import React, { useEffect, useState } from 'react'
// import Order from '../models/Order';
import mongoose from "mongoose";
import { useRouter } from 'next/router'
import Link from 'next/link';


const Orders = ({ user }) => {
    const [orders, setOrders] = useState({})
    const router = useRouter();
    useEffect(() => {
        const ordersfetch = async () => {
            let data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URI}/api/myorders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            let json = await data.json()
            setOrders(json)
        }
        if (!localStorage.getItem('token')) {
            router.push('/login')
        } else {
            ordersfetch()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="container mx-auto min-h-screen">
                <h1 className='font-bold text-center'>Orders</h1>
                <div className="items mt-2">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Order Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Track
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 && <tr><td colSpan="5" className="text-center">No orders</td></tr>}
                                {orders.length > 0 && orders.map((order) => {
                                    return (<tr key={order._id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {order.orderId}
                                        </th>
                                        <td className="px-6 py-4">
                                            {order.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            ₹{order.total}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/order?orderId=${order.orderId}`}><a>Track</a></Link>
                                        </td>
                                    </tr>)

                                })}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </>
    )
}

// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readyState) {
//         await mongoose.connect(process.env.MONGO_URI);
//     }
//     let placedorders = await Order.find({});
//     console.log(placedorders);
//     return {
//         props: { placedorders: JSON.stringify(placedorders) },
//     }
// }

export default Orders