import { User } from "../models/objects/User";
import api from "./Interceptors";

export const UserService = {
    list: () => {
        return new Promise<User[]>((resolve, reject) => {
            api.get('users/')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    create: (users: User) => {
        return new Promise<User>((resolve, reject) => {
            api.post('users/', users)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    update: (users: User) => {
        return new Promise<User>((resolve, reject) => {
            api.put(`users/${users.id}/`, users)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    delete: (usersId: number) => {
        return new Promise((resolve, reject) => {
            api.delete(`users/${usersId}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    get: (id: number) => {
        return new Promise<User>((resolve, reject) => {
            api.get(`users/${id}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },    
    me: () => {
        return new Promise<User>((resolve, reject) => {
            api.get('me/')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}