const REGISTER_API = `${BASE_URL}/auth/register`;

window.register = async function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

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
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            message.innerText = "Registered successfully!";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);
        } else {
            message.innerText = "Registration failed";
        }

    } catch (err) {
        message.innerText = "Server error";
    }
};