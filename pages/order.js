/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Order from '../models/Order';
import mongoose from "mongoose";

const Orderr = ({ order }) => {
  order = JSON.parse(order)
  const products = order.products;
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">Easybuysell.in</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
              <p className="leading-relaxed mb-4">Your order has been placed successfully. Your payment status is {order.status}</p>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 py-2 text-lg px-1">Description</a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Qty</a>
                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
              </div>
              {Object.keys(products).map((item) => {
                return <div className="flex border-gray-200 border-t py-2" key={products[item].slug}>
                  <span className="text-gray-500">{products[item].name}</span>
                  <span className="ml-auto text-gray-500">{products[item].qty}</span>
                  <span className="ml-auto text-gray-900">₹{products[item].price*products[item].qty}</span>
                </div>
              })}
              <div className="flex mt-4">
                <span className="title-font font-medium text-2xl text-gray-900">Subtotal ₹{order.total}</span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const { orderId } = context.query;
  if (mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findOne({ orderId: orderId });
  return {
    props: { order: JSON.stringify(order) },
  }
}

export default Orderr