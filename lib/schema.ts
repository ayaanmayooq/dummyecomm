export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    slug: string;
    sellPrice: number;
    quantity: number;
  }

export interface Category {
    value: string;
    label: string;
  }