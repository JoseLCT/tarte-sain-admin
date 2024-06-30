import { Order } from "../models/objects/Order";
import api from "./Interceptors";

export const OrderService = {
    list: () => {
        return new Promise<Order[]>((resolve, reject) => {
            api.get('orders')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    get: (id: number) => {
        return new Promise<Order>((resolve, reject) => {
            api.get(`orders/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    changeStatus: (orderId: number, status: string) => {
        return new Promise<Order>((resolve, reject) => {
            api.put(`orders/${orderId}/change-status?status=${status}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}