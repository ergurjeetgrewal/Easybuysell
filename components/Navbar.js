import React, { useRef } from 'react'
import Link from 'next/link';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { BsFillBagCheckFill } from "react-icons/bs";

const Navbar = ({ clearCart, addtoCart, removeFromCart, cart, subtTotal }) => {
  const ref = useRef()
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    } else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  return (
    <>
      <div className='sticky top-0 bg-white z-10'>
        <header className="text-gray-600 body-font shadow-md mb-2 ">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link href={'/'}><a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">Sell Anywhere</span>
            </a>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              <Link href={'/tshirts'}><a className="mr-5 hover:text-gray-900 font-bold">Tshirts</a></Link>
              <Link href={'/mugs'}><a className="mr-5 hover:text-gray-900 font-bold">Mugs</a></Link>
              <Link href={'/hoodies'}><a className="mr-5 hover:text-gray-900 font-bold">Hoodies</a></Link>
              <Link href={'/stickers'}><a className="mr-5 hover:text-gray-900 font-bold">Stickers</a></Link>
            </nav>
            <div className='flex'> 
              <button onClick={toggleCart} className="inline-flex items-center bg-pink-100 border-0 py-1 px-3 mr-2 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                <AiOutlineShoppingCart className='text-xl' />
              </button>
              <Link href={'/login'} passHref><button className="inline-flex items-center bg-pink-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                <FiLogIn className='text-xl' />
              </button></Link>
            </div>
            <div ref={ref} className="w-72 h-[100vh] sidecart absolute top-0 right-0 bg-pink-100 py-10 px-8 transition-transform transform translate-x-full">
              <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
              <span onClick={toggleCart} className="absolute top-5 right-2"><AiFillCloseCircle className='cursor-pointer text-xl text-pink-500' /></span>
              <ol className='list-decimal'>
                {Object.keys(cart).length <= 0 && <p className='my-4 text-base text-center'>Your cart is empty</p>}
                {Object.keys(cart).map((k) => {
                  return <li key={k}>
                    <div className="item flex my-3">
                      <div className='w-2/3 font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                      <div className='w-1/3 font-semibold justify-center items-center flex'><AiOutlineMinusCircle className='text-2xl' onClick={() => { removeFromCart(k, 1) }} /><span className='mx-2'>{cart[k].qty}</span><AiOutlinePlusCircle onClick={() => { addtoCart(k, 1) }} className='text-2xl' /></div>
                    </div>
                  </li>
                })}
              </ol>
              <p className='total mb-2 font-bold'>Subtotal: ₹{subtTotal}</p>
              <div className="flex">
                <Link href={'/checkout'} passHref><button className="flex mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                <button onClick={clearCart} className="flex mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

export default Navbar