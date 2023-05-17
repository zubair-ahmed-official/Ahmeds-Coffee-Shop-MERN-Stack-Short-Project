// import React from 'react';

import { useNavigate } from "react-router-dom";

import OrderCards from "../OrderCards/OrderCards";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { getItem } from "localforage";

const Orders = () => {
    // const loadedOrders = useLoaderData();
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const url = `https://ahmeds-coffee-express.vercel.app/orderCoffee?email=${user?.email}`;
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setOrders(data)
                }
                else {
                    navigate('/')
                }
            })
    }, [url, navigate])

    const HandleDelete = _id => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://ahmeds-coffee-express.vercel.app/orderCoffee/${_id}`,
                    {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log('Deleted', data)

                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Coffee has been deleted.',
                                'success'
                            )
                            const remaining = orders.filter(o => o._id !== _id)
                            setOrders(remaining);
                            console.log(remaining)
                        }
                    }
                    )
            }
        })
    }

    const HandleConfirm = _id => {
        fetch(`https://ahmeds-coffee-express.vercel.app/orderCoffee/${_id}`,
            {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ status: 'confirm' })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Confirmed',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    const remaining = orders.filter(o => o._id !== _id)
                    const updated = orders.find(o => o._id === _id)
                    updated.status = 'confirm'
                    const newOrder = [updated, ...remaining]
                    setOrders(newOrder)
                }
            })
    }
    return (
        <div>
            <h2 className='text-3xl' style={{ marginTop: '30px', fontWeight: '700' }}>All Orders</h2>
            <p>Number of orders: {orders.length} </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
                {
                    orders.map(order =>
                        <OrderCards key={order._id} order={order} orders={orders} HandleDelete={HandleDelete} HandleConfirm={HandleConfirm}>
                        </OrderCards>)
                }
            </div>
        </div>
    );
};

export default Orders;