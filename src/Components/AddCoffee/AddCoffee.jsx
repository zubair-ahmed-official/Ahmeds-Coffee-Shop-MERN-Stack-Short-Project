// import React from 'react';

import Swal from "sweetalert2";

const AddCoffee = () => {

    const HandleAddCoffee = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const price = event.target.price.value;
        const url = event.target.url.value;

        const newCoffee = { name, price, url }
        console.log(newCoffee);

        fetch('https://ahmeds-coffee-express.vercel.app/coffee', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Coffee Added',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    // event.target.reset();
                }
            }
            )
    }

    return (
        <div className="">
            <h2 style={{fontSize:'30px', fontWeight: '700', marginTop:'30px'}}>Add Coffee</h2>
            <br></br>
            <form onSubmit={HandleAddCoffee}>
                <div className=" flex justify-between">

                    <div className="">
                        <span>Coffee: </span>
                        <input name="name" type="text" placeholder="" className="input input-bordered" />
                    </div><br></br>
                    <div className="">
                        <span>Price: </span>
                        <input name="price" type="number" placeholder="" className="input input-bordered" />
                    </div><br></br>
                    <div className="">
                        <span>Coffee Image URL: </span>
                        <input name="url" type="text" placeholder="" className="input input-bordered" />
                    </div>
                </div>
                <br></br>
                <button className="btn btn-block">Add Coffee</button>
            </form>
        </div>
    );
};

export default AddCoffee;