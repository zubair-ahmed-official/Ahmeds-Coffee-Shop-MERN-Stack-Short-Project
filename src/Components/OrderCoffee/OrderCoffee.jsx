// import React from 'react';

import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";

const OrderCoffee = () => {
    const { user } = useContext(AuthContext);
    const orderCoffee = useLoaderData();
    const { name, price, url } = orderCoffee;
    const HandleOrderCoffee = event => {
        event.preventDefault();
        const uname = event.target.uname.value;
        const phone = event.target.phone.value;
        const email = event.target.email.value;
        const address = event.target.address.value;
        const name = event.target.name.value;
        const price = event.target.price.value;
        const num = event.target.num.value;
        const url = event.target.url.value;

        const orderedCoffee = { uname, phone,email, address, name, price, num, url }
        console.log(orderedCoffee);

        fetch(`https://ahmeds-coffee-express.vercel.app/orderCoffee`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(orderedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Coffee Ordered',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
            )
    }
    return (
        <div className="">
            <h2 style={{ fontSize: '30px', fontWeight: '700', marginTop: '30px' }}> Order Coffee: {name}</h2>
            <br></br>
            <img className="m-auto" style={{width:'180px', borderRadius:'8px'}} src={url}></img>
            <form onSubmit={HandleOrderCoffee}>
                <div className="grid grid-cols-5 mt-10" >
                    <div className="" >
                        <span>Name: </span>
                        <input name="uname" type="text" placeholder="" className="input input-bordered" defaultValue={user.displayName} />
                    </div>

                    <div className="">
                        <span>Phone: </span>
                        <input name="phone" type="number" placeholder="" className="input input-bordered" />
                    </div>

                    <div className="" style={{ display: 'none' }}>
                        <span>Email: </span>
                        <input name="email" type="email" placeholder="" className="input input-bordered" defaultValue={user.email} readOnly/>
                    </div>

                    <div className="">
                        <span>Address: </span>
                        <input name="address" type="text" placeholder="" className="input input-bordered" />
                    </div>

                    <div className="" style={{ display: 'none' }}>
                        <span>Coffee: </span>
                        <input name="name" type="text" placeholder="" className="input input-bordered" defaultValue={name} readOnly />
                    </div>

                    <div className="" style={{ display: 'none' }}>
                        <span>Photo Url: </span>
                        <input name="url" type="text" placeholder="" className="input input-bordered" defaultValue={url} readOnly />
                    </div>

                    <div className="">
                        <span>Number of Coffees: </span>
                        <input name="num" type="number" placeholder="" className="input input-bordered" defaultValue='1' />
                    </div>

                    <div className="">
                        <span>Price: </span>
                        <input name="price" type="number" placeholder="" className="input input-bordered" defaultValue={price} readOnly />
                    </div>


                </div>
                <br></br>
                <button className="btn btn-block">Order Coffee</button>
            </form>
        </div>
    );
};

export default OrderCoffee;