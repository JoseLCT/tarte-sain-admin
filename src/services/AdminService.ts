import { Admin } from "../models/objects/Admin";
import api from "./Interceptors";

export const AdminService = {
    list: () => {
        return new Promise<Admin[]>((resolve, reject) => {
            api.get('admins')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    create: (admins: Admin) => {
        return new Promise<Admin>((resolve, reject) => {
            api.post('admins', admins)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    update: (admins: Admin) => {
        return new Promise<Admin>((resolve, reject) => {
            api.put(`admins/${admins.id}`, admins)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    delete: (adminsId: number) => {
        return new Promise((resolve, reject) => {
            api.delete(`admins/${adminsId}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    get: (id: number) => {
        return new Promise<Admin>((resolve, reject) => {
            api.get(`admins/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    updateRole: (id: number, role: string) => {
        return new Promise<Admin>((resolve, reject) => {
            api.put(`admins/${id}/change-role`, { role })
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    updateOwn: (admins: Admin) => {
        return new Promise<Admin>((resolve, reject) => {
            api.put(`users/${admins.id}`, admins)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}