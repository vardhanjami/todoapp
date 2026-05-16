const BASE_URL = "https://todoapp-gxde.onrender.com";

const LOGIN_API = `${BASE_URL}/auth/login`;
const REGISTER_API = `${BASE_URL}/auth/register`;

function getToken() {
    return localStorage.getItem("token");
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    };
}