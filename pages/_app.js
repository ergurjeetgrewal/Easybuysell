import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subtTotal, setSubtTotal] = useState(0)
  const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
    let subt = 0;
    let keys = Object.keys(cart);
    for (let i = 0; keys.length > i; i++) {
      subt += cart[keys[i]].price * cart[keys[i]].qty
    }
    setSubtTotal(subt)
  }
  const addtoCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = {
        qty: 1,
        price: price,
        name: name,
        size: size,
        variant: variant
      }
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const clearCart = () => {
    setCart({})
    saveCart({})
  }
  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in newCart) {
      console.log('clicked')
      newCart[itemCode].qty -= qty;
      if (newCart[itemCode].qty <= 0) {
        delete newCart[itemCode]
      }
    }
    setCart(newCart)
    saveCart(newCart)
  }
  useEffect(() => {
    try {
      if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        setCart(cart)
        let subt = 0;
        let keys = Object.keys(cart);
        for (let i = 0; keys.length > i; i++) {
          subt += cart[keys[i]].price * cart[keys[i]].qty
        }
        setSubtTotal(subt)
      }
      else {
        setCart({})
      }
    } catch (error) {
      console.log(error)
      localStorage.clear()
    }

  }, [])

  return <>
    <Navbar clearCart={clearCart} addtoCart={addtoCart} removeFromCart={removeFromCart} cart={cart} subtTotal={subtTotal}/>
    <Component {...pageProps} clearCart={clearCart} addtoCart={addtoCart} removeFromCart={removeFromCart} cart={cart} subtTotal={subtTotal}/>
    <Footer />
  </>
}

export default MyApp
