import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [cart, setCart] = useState({})
  const router = useRouter();
  const [subtTotal, setSubtTotal] = useState(0)
  const [user, setUser] = useState({ login: false })
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
        slug: itemCode,
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
  const fetchuser = () => {
    if (localStorage.getItem('token')) {
      setUser({ login: true,token: localStorage.getItem('token') })
    }
  }
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = { itemCode: { itemCode, qty, price, name, size, variant } };
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }
  useEffect(() => {
    fetchuser();
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
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
      localStorage.clear()
    }

  }, [router.events])

  return <>
    <LoadingBar
      color='#ec4899'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    <Navbar user={user} setUser={setUser} clearCart={clearCart} addtoCart={addtoCart} removeFromCart={removeFromCart} cart={cart} subtTotal={subtTotal} />
    <Component {...pageProps} user={user} setUser={setUser} setProgress={setProgress} buyNow={buyNow} clearCart={clearCart} addtoCart={addtoCart} removeFromCart={removeFromCart} cart={cart} subtTotal={subtTotal} />
    <Footer />
  </>
}

export default MyApp
