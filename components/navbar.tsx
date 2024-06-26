"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingCart } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"
import { siteConfig } from "@/config/site"
import Image from "next/image"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"

export function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const {cartCount} = useShoppingCart()

    function onSearch(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const searchQuery = formData.get('search')
        router.replace(`products/?search=${searchQuery}`)
    }

    return (
    <header className="sticky top-0 z-40 w-full border-b bg-white bg-opacity-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-1 px-6 sm:space-x-0">
            <div className="flex gap-3 md:gap-4">
                <div className="flex items-center space-x-2">
                <a href="https://ayaanmayooq.vercel.app/" target="_blank">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="h-10 w-10 rounded-lg invert border border-slate-800"
                />
                </a>
                <Link href="/" className="">
                    <span className="inline-block font-medium">
                    {siteConfig.name}
                    </span>
                </Link>
                </div>

                <Link href="/products" className="flex items-center ml-2 text-gray-500 hover:text-gray-900 hover:font-medium">
                    <span className="inline-block m-auto">
                    Store
                    </span>
                </Link>
            </div>



            <form onSubmit={onSearch} className="items-center lg:inline-flex ">
                <Input
                    id="search"
                    name="search"
                    type="search"
                    autoComplete="off"
                    placeholder="Search products..."
                    className="h-9 lg:w-[400px] bg-slate-100 placeholder-gray-700"
                />
            </form>

            <div className="flex items-center space-x-1 justify-self-end">
                <Link href="/cart">
                    <Button size="sm" variant="ghost">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="ml-2 text-sm font-bold">{cartCount}</span>
                    <span className="sr-only">Cart</span>
                    </Button>
                </Link>
                {/* <ThemeToggle /> */}
            </div>
        </div>

    </header>
    )
}