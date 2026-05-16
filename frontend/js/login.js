const LOGIN_API = `${BASE_URL}/auth/login`;

window.login = async function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

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
        } catch (e) {
            console.log("Non JSON response:", text);
        }

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);

            const payload = JSON.parse(atob(data.token.split('.')[1]));
            localStorage.setItem("role", payload.role);

            window.location.href = "dashboard.html";

        } else {
            document.getElementById("message").innerText =
                data.message || "Login failed";
        }

    } catch (err) {
        console.error(err);
        document.getElementById("message").innerText =
            "Server not reachable";
    }
};