import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Tshirts = () => {
  return (
    <>
      <Head>
        <title>Sellanywhere - Tshirts</title>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <Link href={''} passHref><div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-1">
              <a className="block relative  rounded overflow-hidden">
                <img alt="ecommerce" className="h-[30vh] md:h-[34vh] block md:m-0 m-auto" src="https://m.media-amazon.com/images/I/81D76vnOAsS._UL1500_.jpg" />
              </a>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirt</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">Wear the code</h2>
                <p className="mt-1">₹499.0</p>
                <p className="mt-1">S, M, L, XL, XXL</p>
              </div>
            </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tshirts