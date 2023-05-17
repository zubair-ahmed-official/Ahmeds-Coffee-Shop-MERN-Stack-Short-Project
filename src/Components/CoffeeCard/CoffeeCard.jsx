// import React from 'react';

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const CoffeeCard = ({ coffee, coffees, setCoffees}) => {
    const { _id, name, price, url } = coffee;
    const { user, logOut } = useContext(AuthContext);
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
                fetch(`https://ahmeds-coffee-express.vercel.app/coffee/${_id}`,
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
                           const remaining = coffees.filter(cof=> cof._id !== _id)
                            setCoffees(remaining);
                            console.log(remaining)
                        }     
                    }
                    )
            }
        })
    }
    return (
        <div className="card card-side bg-purple-50 shadow-xl" style={{ width: '500px', margin: '10px' }}>
            <figure><img style={{ width: '160px', height: '150px', borderRadius: '8px' }} src={url} alt="coffeeImg" /></figure>
            <div className=" text-gray-500 card-body flex text-left">
                <div>
                    <h2 className="card-title text-violet-600">{name}</h2>
                    <p className="">Price: <b>{price} BDT</b></p>
                </div>
                <br></br>
                {user?<div className="card-actions"style={{ width: '250px'}}>
                    <Link to={`/UpdateCoffee/${_id}`}>
                        <button className="btn btn-sm btn-warning">Update</button>
                    </Link>
                    <Link to={`/OrderCoffee/${_id}`}>
                        <button className="btn btn-sm btn-success">Order</button>
                    </Link>
                    <button className="btn btn-sm btn-error" onClick={() => HandleDelete(_id)}>Delete</button>
                </div>:<span>Login to order, update and remove</span>}
            </div>
        </div>
    );
};

export default CoffeeCard;