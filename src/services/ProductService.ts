import { Product } from "../models/objects/Product";
import api from "./Interceptors";

export const ProductService = {
    list: () => {
        return new Promise<Product[]>((resolve, reject) => {
            api.get('products')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    create: (product: Product) => {
        return new Promise<Product>((resolve, reject) => {
            api.post('products', product)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    update: (product: Product) => {
        return new Promise<Product>((resolve, reject) => {
            api.put(`products/${product.id}`, product)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    delete: (productId: number) => {
        return new Promise((resolve, reject) => {
            api.delete(`products/${productId}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    get: (id: number) => {
        return new Promise<Product>((resolve, reject) => {
            api.get(`products/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    uploadImage: (productId: number, image: File) => {
        const formData = new FormData();
        formData.append('file', image);
        return new Promise<Product>((resolve, reject) => {
            api.post(`products/${productId}/image`, formData)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    uploadGalleryImage: (productId: number, image: File) => {
        const formData = new FormData();
        formData.append('file', image);
        return new Promise<Product>((resolve, reject) => {
            api.post(`products/${productId}/gallery`, formData)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    deleteGalleryImage(imageId: number) {
        return new Promise((resolve, reject) => {
            api.delete(`products/gallery/${imageId}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
    
}