const TASK_API = "http://localhost:8080/tasks";

const ADMIN_USERS_API = "http://localhost:8080/admin/users";

const ADMIN_TASKS_API = "http://localhost:8080/admin/tasks";

document.getElementById("welcome").innerText =
    "Welcome " + localStorage.getItem("username");

if(!localStorage.getItem("token")){
    window.location.href = "login.html";
}

const role = localStorage.getItem("role");

if(role === "ADMIN"){

    document.getElementById("adminSection").innerHTML = `

        <div class="card" style="margin-top:20px;">

            <h2>ADMIN PANEL</h2>

            <p>You have administrator access.</p>

            <button onclick="loadAllUsers()">
                Load All Users
            </button>

            <button onclick="loadAllTasks()">
                Load All Tasks
            </button>

            <div id="adminData"></div>

        </div>
    `;
}

async function fetchTasks(){

    const response = await fetch(TASK_API,{
        headers:authHeaders()
    });

    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task=>{

taskList.innerHTML += `

    <div class="task-card ${task.completed ? 'completed-task' : ''}">

        <div class="task-title">
            ${task.title}
        </div>

        <p class="${task.completed ? 'completed' : 'pending'}">

            ${task.completed ? 'Completed' : 'Pending'}

        </p>

        <div class="actions">

            <button class="delete-btn"
                onclick="deleteTask(${task.id})">

                Delete

            </button>

            <button class="toggle-btn"
                onclick="toggleTask(
                    ${task.id},
                    '${task.title}',
                    ${task.completed}
                )">

                Toggle

            </button>

        </div>

    </div>
`;
    });
}

async function createTask(){

    const title =
        document.getElementById("taskTitle").value;

    const completed =
        document.getElementById("completed").checked;

    await fetch(TASK_API,{

        method:"POST",

        headers:authHeaders(),

        body:JSON.stringify({
            title,
            completed
        })
    });

    document.getElementById("taskTitle").value = "";

    fetchTasks();
}

async function deleteTask(id){

    await fetch(TASK_API + "/" + id,{

        method:"DELETE",

        headers:authHeaders()
    });

    fetchTasks();
}

async function toggleTask(id,title,currentStatus){

    await fetch(TASK_API + "/" + id,{

        method:"PUT",

        headers:authHeaders(),

        body:JSON.stringify({

            title:title,

            completed:!currentStatus
        })
    });

    fetchTasks();
}

async function loadAllUsers(){

    const response = await fetch(ADMIN_USERS_API,{
        headers:authHeaders()
    });

    const users = await response.json();

    let html = "<h3>Users</h3>";

    users.forEach(user=>{

        html += `

            <div class="card" style="margin-top:10px;">

                <p><b>ID:</b> ${user.id}</p>

                <p><b>Username:</b> ${user.username}</p>

                <p><b>Role:</b> ${user.role}</p>

            </div>
        `;
    });

    document.getElementById("adminData").innerHTML = html;
}

async function loadAllTasks(){

    const response = await fetch(ADMIN_TASKS_API,{
        headers:authHeaders()
    });

    const tasks = await response.json();

    let html = "<h3>All Tasks</h3>";

    tasks.forEach(task=>{

        html += `

            <div class="card" style="margin-top:10px;">

                <p><b>Task:</b> ${task.title}</p>

                <p>
                    <b>Status:</b>
                    ${task.completed ? "Completed" : "Pending"}
                </p>

            </div>
        `;
    });

    document.getElementById("adminData").innerHTML = html;
}

function logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    localStorage.removeItem("role");

    window.location.href = "login.html";
}
function toggleTheme(){

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem("theme","light");

    }else{

        localStorage.setItem("theme","dark");
    }
}

window.onload = ()=>{

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "light"){

        document.body.classList.add("light-mode");
    }
};
fetchTasks();