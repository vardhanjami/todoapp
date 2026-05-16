const LOGIN_API = `${BASE_URL}/auth/login`;

window.login = async function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try {
        const response = await fetch(LOGIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const text = await response.text();

        let data = {};
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {}

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);

            const payload = JSON.parse(atob(data.token.split('.')[1]));
            localStorage.setItem("role", payload.role);

            window.location.href = "dashboard.html";

        } else {
            message.innerText = "Login failed";
        }

    } catch (err) {
        message.innerText = "Server error";
    }
};