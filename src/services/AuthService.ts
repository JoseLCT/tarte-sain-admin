import { LoginResponse } from "../models/responses/LoginResponse";
import axios from "axios";

export const AuthService = {
    login: (username: string, password: string) => {
        const data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);
        return new Promise<LoginResponse>((resolve, reject) => {
            axios.post('https://tartesain.com/api/login/', data, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
}