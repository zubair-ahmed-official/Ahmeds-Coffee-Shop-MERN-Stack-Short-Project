// import React from 'react';

import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
    const coffeeData = useLoaderData();
    const { _id, name, price, url } = coffeeData;
    const HandleUpdateCoffee = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const price = event.target.price.value;
        const url = event.target.url.value;

        const updatedCoffee = { name, price, url }
        console.log(updatedCoffee);
        
        fetch(`https://ahmeds-coffee-express.vercel.app/coffee/${_id}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Coffee Updated',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            }
            )
    }
    return (
        <div className="">
        <h2 style={{ fontSize: '30px', fontWeight: '700', marginTop: '30px' }}>Update Coffee</h2>
        <br></br>
        <form onSubmit={HandleUpdateCoffee}>
            <div className=" flex justify-between">
                <div className="">
                    <span>Coffee: </span>
                    <input name="name" type="text" placeholder="" className="input input-bordered" defaultValue={name} />
                </div><br></br>
                <div className="">
                    <span>Price: </span>
                    <input name="price" type="number" placeholder="" className="input input-bordered"  defaultValue={price}/>
                </div><br></br>
                <div className="">
                    <span>Coffee Image URL: </span>
                    <input name="url" type="text" placeholder="" className="input input-bordered"  defaultValue={url}/>
                </div>
            </div>
            <br></br>
            <button className="btn btn-block">Update Coffee</button>
        </form>
    </div>
    );
};

export default UpdateCoffee;