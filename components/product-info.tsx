"use client"

import { Button } from "@/components/ui/button"
import { Product } from "@/lib/schema"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
        product: Product
}

export function ProductInfo({ product }: Props) {
    // cosnt [quantity, setQuantity] = useState()
    const { addItem, cartDetails, incrementItem, setItemQuantity } = useShoppingCart()
    const isInCart = !!cartDetails?.[product.id]
    const discountPrice = product.price
    const [quantity, setQuantity] = useState(1);

    const cartStuff = Object.entries(cartDetails!).map(([_, product]) => product)


    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
          setQuantity(newQuantity);
        }
      };

      function addToCart() {
        const item = {
          ...product,
          sku: product.id,
          name: product.title,
          currency: "USD",
          price: product.price,
        };
      
        if (isInCart) {
            const existingItem = cartStuff.find((product) => product.id === item.id);
            const newQuantity = existingItem!.quantity + quantity;
            setItemQuantity(item.id, newQuantity);
        } else {
          addItem(item);
          setItemQuantity(item.id, quantity)
        }
        setQuantity(1);
        notify();
      }

    const notify = () => toast(`${product.title} added to cart`);

    return (
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true}/>

            <p className="mt-2">{product.brand}</p>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            
            <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base">{product.description}</div>
            </div>

            <div className="mt-3 flex">
                <p className="text-2xl tracking-tight">{formatCurrencyString({value: discountPrice, currency: "USD"})}</p>
                <p className="text-xl text-red-600 mx-3 m-auto">-{product.discountPercentage}%</p>
            </div>

            <div className="">
                <p className="">Price: <s>{formatCurrencyString({value: product.sellPrice, currency: "USD"})}</s></p>
            </div>

            <div className="mt-6">
                <h3 className="sr-only">In Stock:</h3>
                <div className="space-y-6 text-base">In Stock: {product.stock}</div>
            </div>

            <form className="mt-6">
                <div className="mt-4 flex">
                <div className="m-auto mr-4">
                <Input
                  id={`quantity-${product.id}-info`}
                  name={`quantity-${product.id}-info`}
                  type="number"
                  className="w-16"
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={(event) => handleQuantityChange(Number(event.target.value))}
                />
                </div>
                <Button
                    type="button"
                    onClick={addToCart}
                    className="w-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 hover:opacity-95 text-white disabled:bg-slate-900"
                >
                    Add to cart
                </Button>
                </div>
            </form>
        </div>
    )
}