const TASK_API = BASE_URL + "/tasks";
const ADMIN_USERS_API = BASE_URL + "/admin/users";
const ADMIN_TASKS_API = BASE_URL + "/admin/tasks";

// ---------------- AUTH CHECK ----------------
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("welcome").innerText =
        "Welcome " + localStorage.getItem("username");

    const role = localStorage.getItem("role");

    if (role === "ADMIN") {
        document.getElementById("adminSection").innerHTML = `
            <div class="card">
                <h2>ADMIN PANEL</h2>
                <button onclick="loadAllUsers()">Load Users</button>
                <button onclick="loadAllTasks()">Load Tasks</button>
                <div id="adminData"></div>
            </div>
        `;
    }

    fetchTasks();
});

// ---------------- TASKS ----------------
window.fetchTasks = async function () {

    const response = await fetch(TASK_API, {
        headers: authHeaders()
    });

    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        taskList.innerHTML += `
        <div class="task-card">
            <div>${task.title}</div>
            <div>${task.completed ? "Done" : "Pending"}</div>

            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="toggleTask(${task.id}, '${task.title}', ${task.completed})">
                Toggle
            </button>
        </div>
        `;
    });
};

window.createTask = async function () {

    const title = document.getElementById("taskTitle").value;
    const completed = document.getElementById("completed").checked;

    await fetch(TASK_API, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ title, completed })
    });

    document.getElementById("taskTitle").value = "";
    fetchTasks();
};

window.deleteTask = async function (id) {

    await fetch(`${TASK_API}/${id}`, {
        method: "DELETE",
        headers: authHeaders()
    });

    fetchTasks();
};

window.toggleTask = async function (id, title, status) {

    await fetch(`${TASK_API}/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({
            title,
            completed: !status
        })
    });

    fetchTasks();
};

// ---------------- ADMIN ----------------
window.loadAllUsers = async function () {

    const res = await fetch(ADMIN_USERS_API, {
        headers: authHeaders()
    });

    const users = await res.json();

    document.getElementById("adminData").innerHTML =
        users.map(u => `
            <div class="card">
                <p>${u.username}</p>
                <p>${u.role}</p>
            </div>
        `).join("");
};

window.loadAllTasks = async function () {

    const res = await fetch(ADMIN_TASKS_API, {
        headers: authHeaders()
    });

    const tasks = await res.json();

    document.getElementById("adminData").innerHTML =
        tasks.map(t => `
            <div class="card">
                <p>${t.title}</p>
                <p>${t.completed ? "Done" : "Pending"}</p>
            </div>
        `).join("");
};

// ---------------- LOGOUT ----------------
window.logout = function () {
    localStorage.clear();
    window.location.href = "login.html";
};