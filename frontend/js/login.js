async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(LOGIN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        let data = null;

        try {
            data = await response.json();
        } catch (e) {
            console.log("No JSON response from backend");
        }

        if (response.ok) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);

            const payload = JSON.parse(atob(data.token.split('.')[1]));
            localStorage.setItem("role", payload.role);

            window.location.href = "dashboard.html";

        } else {
            document.getElementById("message").innerText =
                data?.message || "Invalid credentials";
        }

    } catch (error) {
        document.getElementById("message").innerText =
            "Server not reachable";
        console.log(error);
    }
}