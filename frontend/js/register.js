const API = "http://localhost:8080/auth/register";

async function register() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");

    if(password !== confirmPassword){
        message.innerText = "Passwords do not match";
        return;
    }

    const response = await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username,
            password
        })
    });

    if(response.ok){
        message.innerText =
            "Successfully registered. Redirecting to login...";

        setTimeout(()=>{
            window.location.href = "login.html";
        },2000);

    }else{
        message.innerText = "Registration failed";
    }
}