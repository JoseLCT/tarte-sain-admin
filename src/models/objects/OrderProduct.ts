export interface OrderProduct {
    product: {
        id: number,
        name: string,
        img_url: string
    },
    quantity: number,
    price: string
}