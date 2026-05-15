const LOGIN_API = "http://localhost:8080/auth/login";

async function login(){

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const response = await fetch(LOGIN_API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    if(response.ok){

        localStorage.setItem("token", data.token);

        localStorage.setItem("username", username);

        // EXTRACT ROLE FROM JWT
        const payload = JSON.parse(atob(data.token.split('.')[1]));

        localStorage.setItem("role", payload.role);

        window.location.href = "dashboard.html";

    }else{

        document.getElementById("message").innerText =
            "Invalid credentials";
    }
}