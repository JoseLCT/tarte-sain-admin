import { Order } from "../models/objects/Order";
import api from "./Interceptors";

export const OrderService = {
    list: () => {
        return new Promise<Order[]>((resolve, reject) => {
            api.get('orders/')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
}