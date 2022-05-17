/* eslint-disable @next/next/no-script-component-in-head */
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script';
import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ clearCart, addtoCart, removeFromCart, cart, subtTotal }) => {
  const router = useRouter()
  const [checkout, setCheckout] = useState({ city: '', state: '' });
  const [checkoutbtn, setCheckoutbtn] = useState(true);
  const PaymentHandle = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    // get transaction token
    const data = { cart, subtTotal, oid, email: checkout.email, phone: checkout.phone, address: checkout.address, pincode: checkout.pincode, name: checkout.name };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST_URI}/api/pretransaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let res = await a.json();
    let txtToken = res.body.txnToken;
    let config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": txtToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subtTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
        }
      }
    };
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
    });
  }
  const handleChange = (e) => {
    setCheckout({ ...checkout, [e.target.name]: e.target.value });
    if (e.target.name === 'pincode') {
      if (e.target.value.length === 6) {
        fetch(`${process.env.NEXT_PUBLIC_HOST_URI}/api/pincode`).then(res => res.json()).then(data => {
          if (Object.keys(data).includes(e.target.value)) {
            setCheckout({ ...checkout, state: data[e.target.value][1], city: data[e.target.value][0], [e.target.name]: e.target.value });
          } else {
            setCheckout({ ...checkout, state: '', city: '', [e.target.name]: e.target.value });
          }
        })
      }
    }
    setTimeout(() => {
      if (checkout.name && checkout.email && checkout.address && checkout.phone && checkout.pincode) {
        setCheckoutbtn(false);
      } else {
        setCheckoutbtn(true);
      }
    }, 100);
  }
  useEffect(() => {
    if (!localStorage.getItem('cart')) {
      router.push('/');
    }
  }, [cart, router])

  return (
    <>
      <Head>
        <title>Easy Buysell - Checkout</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />
      <div className="container m-auto">
        <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
        <h2 className="font-bold text-xl">1. Delivery Details</h2>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="name" name="name" required onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" required onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label htmlFor="Address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea id="Address" name="address" required onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="Phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input type="number" id="Phone" required name="phone" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="Pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input type="number" id="Pincode" required name="pincode" onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="City" className="leading-7 text-sm text-gray-600">City</label>
              <input type="text" id="City" name="city" defaultValue={checkout.city} readOnly={true} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="State" className="leading-7 text-sm text-gray-600">State</label>
              <input type="text" id="State" name="state" defaultValue={checkout.state} readOnly={true} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>


        <h2 className="font-bold text-xl">2. Review Cart Items</h2>
        <div className="sideCart bg-pink-100 p-6 my-4">
          <ol className='list-decimal'>
            {Object.keys(cart).length <= 0 && <p className='my-4 text-base text-center'>Your cart is empty</p>}
            {Object.keys(cart).map((k) => {
              return <li key={k}>
                <div className="item flex my-3">
                  <div className='font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                  <div className='w-1/3 font-semibold justify-center items-center flex'><AiOutlineMinusCircle className='text-2xl' onClick={() => { removeFromCart(k, 1) }} /><span className='mx-2'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { addtoCart(k, 1) }} className='text-2xl' /></div>
                </div>
              </li>
            })}
          </ol>
          <span className='total'>Subtotal: ₹{subtTotal}</span>
        </div>
        <div className="mx-2">
          <button onClick={() => { PaymentHandle() }} disabled={checkoutbtn} className="flex mr-1 disabled:bg-pink-200 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded"><BsFillBagCheckFill className='m-1' />Pay ₹{subtTotal}</button>
        </div>
      </div>
    </>
  )
}

export default Checkout