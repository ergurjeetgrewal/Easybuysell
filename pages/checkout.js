import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = ({ clearCart, addtoCart, removeFromCart, cart, subtTotal }) => {
  return (
    <>
      <Head>
        <title>Sellanywhere - Checkout</title>
      </Head>
      <div className="container m-auto">
        <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
        <h2 className="font-bold text-xl">1. Delivery Details</h2>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label htmlFor="Address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea id="Address" name="Address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="Phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input type="number" id="Phone" name="Phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="Pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input type="number" id="Pincode" name="Pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="City" className="leading-7 text-sm text-gray-600">City</label>
              <input type="text" id="City" name="City" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="State" className="leading-7 text-sm text-gray-600">State</label>
              <input type="text" id="State" name="State" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
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
                  <div className='font-semibold'>{cart[k].name}</div>
                  <div className='w-1/3 font-semibold justify-center items-center flex'><AiOutlineMinusCircle className='text-2xl' onClick={() => { removeFromCart(k, 1) }} /><span className='mx-2'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { addtoCart(k, 1) }} className='text-2xl' /></div>
                </div>
              </li>
            })}
          </ol>
          <span className='total'>Subtotal: ₹{subtTotal}</span>
        </div>
        <div className="mx-2">
          <button className="flex mr-1 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded"><BsFillBagCheckFill className='m-1' />Pay ₹{subtTotal}</button>
        </div>
      </div>
    </>
  )
}

export default Checkout