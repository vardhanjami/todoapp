async function register() {

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
            body: JSON.stringify({
                username,
                password
            })
        });

        if (response.ok) {

            message.innerText = "Registered successfully... Redirecting";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

        } else {
            message.innerText = "Registration failed";
        }

    } catch (error) {
        message.innerText = "Server error";
        console.log(error);
    }
}