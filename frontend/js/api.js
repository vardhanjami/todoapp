const BASE_URL = "https://todoapp-gxde.onrender.com";

// AUTH
const LOGIN_API = `${BASE_URL}/auth/login`;
const REGISTER_API = `${BASE_URL}/auth/register`;

// TOKEN HELPERS
function getToken() {
    return localStorage.getItem("token");
}

function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    };
}