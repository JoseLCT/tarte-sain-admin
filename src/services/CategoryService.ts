import { Category } from "../models/objects/Category";
import api from "./Interceptors";

export const CategoryService = {
    list: () => {
        return new Promise<Category[]>((resolve, reject) => {
            api.get('categories/')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    create: (category: Category) => {
        return new Promise<Category>((resolve, reject) => {
            api.post('categories/', category)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    update: (category: Category) => {
        return new Promise<Category>((resolve, reject) => {
            api.put(`categories/${category.id}/`, category)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    delete: (categoryId: number) => {
        return new Promise((resolve, reject) => {
            api.delete(`categories/${categoryId}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    get: (id: number) => {
        return new Promise<Category>((resolve, reject) => {
            api.get(`categories/${id}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },

    
}