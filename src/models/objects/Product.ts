import { ProductImage } from "./ProductImage";

export interface Product {
    id?: number;
    name: string;
    price: number;
    description: string;
    img_url?: string;
    categories?: number[];
    images?: ProductImage[];
}