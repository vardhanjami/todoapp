const BASE_URL = "https://todoapp-gxde.onrender.com";

// AUTH
const LOGIN_API = `${BASE_URL}/auth/login`;
const REGISTER_API = `${BASE_URL}/auth/register`;

// TASKS 
const TASK_API = `${BASE_URL}/tasks`;
const ADMIN_USERS_API = `${BASE_URL}/admin/users`;
const ADMIN_TASKS_API = `${BASE_URL}/admin/tasks`;

// TOKEN
function getToken() {
    return localStorage.getItem("token");
}

// AUTH HEADERS
function authHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    };
}