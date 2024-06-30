import { OrderProduct } from "./OrderProduct";

export interface Order {
    id?: number,
    address: string,
    delivery_date: string,
    phone_number: string,
    note: string,
    total_amount: string,
    status: string,
    products?: OrderProduct[]
}