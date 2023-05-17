// import React from 'react';

const OrderCards = ({ order, orders, HandleDelete, HandleConfirm }) => {
    const { _id, uname, email, phone, address, name, num, price, url, status } = order;

    return (
        <div className="card card-side bg-purple-50 shadow-xl" style={{ width: '600px', margin: '10px' }}>
            <figure><img style={{ width: '200px', height: '220px', borderRadius: '8px' }} src={url} alt="coffeeImg" /></figure>
            <div className="card-body flex">
                <div className="text-left text-gray-600 mb-2">
                    <h2 className="card-title text-violet-600">{name}</h2>
                    <p className="text-lg">Customer Name: <span className="font-medium">{uname}</span></p>
                    <p className="">Address: {address}</p>
                    <p className="">Phone: {phone}</p>
                    <p className="">Email: {email}</p>
                    <p className="">Number of Orders: <b>{num}</b></p>
                    <p className="">Total Price: <b>{price * num} BDT</b></p>
                </div>
                
                <div className="card-actions" style={{ width: '250px' }}>

                    {status === 'confirm' ? <span className="font-bold text-success">Order Confirmed &nbsp;</span>:
                    <><button className="btn btn-sm btn-primary" onClick={() => HandleConfirm(_id)}>Confirm Order</button>
                    <button className="btn btn-sm btn-error" onClick={() => HandleDelete(_id)}>Delete</button>
                    </>
                    }
                    {/* <button className="btn btn-sm btn-error" onClick={() => HandleDelete(_id)}>Delete</button> */}

                </div>
            </div>
        </div>

    );
};

export default OrderCards;