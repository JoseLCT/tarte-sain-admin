import { Admin } from "../models/objects/Admin";
import { LoginResponse } from "../models/responses/LoginResponse";
import axios from "axios";

export const AuthService = {
    login: (adminname: string, password: string) => {
        const data = new URLSearchParams();
        data.append('username', adminname);
        data.append('password', password);
        return new Promise<LoginResponse>((resolve, reject) => {
            axios.post('https://tartesain.com/web-proxy/auth/login', data, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true,
            })
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    me: () => {
        return new Promise<Admin>((resolve, reject) => {
            axios.get('https://tartesain.com/proxy/me', {
                withCredentials: true,
            }).then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}