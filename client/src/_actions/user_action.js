import Axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types.js';

export function loginUser(dataToSubmit) {

    const request = Axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
};


export function registerUser(dataToSubmit) {

    const request = Axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}


export function auth() {

    const request = Axios.get('/api/users/auth') //get 메소드는 바디 부분이 필요 없음
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}