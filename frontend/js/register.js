const REGISTER_API = `${BASE_URL}/auth/register`;

window.register = async function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");

    if (!username || !password) {
        message.innerText = "All fields are required";
        return;
    }

    if (password !== confirmPassword) {
        message.innerText = "Passwords do not match";
        return;
    }

    try {
        const response = await fetch(REGISTER_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const text = await response.text();

        let data = {};
        try {
            data = text ? JSON.parse(text) : {};
        } catch (e) {
            console.log("Non-JSON response:", text);
        }

        if (response.ok) {

            message.innerText = "Registered successfully! Redirecting...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);

        } else {
            message.innerText = data.message || "Registration failed";
        }

    } catch (err) {
        console.error(err);
        message.innerText = "Server not reachable";
    }
};