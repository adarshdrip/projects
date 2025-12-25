let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');

  if (id === 'tasks') renderTasks();
  if (id === 'status') renderStatus();
}

function goHome() {
  showScreen('home');
}

// ADD TASK
function addTask() {
  let name = document.getElementById("taskName").value;
  if (!name) return alert("Enter task name");

  tasks.push({
    name,
    history: Array(10).fill(0)
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("taskName").value = "";
  alert("Task added");
}

// SEE TASKS
function renderTasks() {
  let div = document.getElementById("taskList");
  div.innerHTML = "";

  if (tasks.length === 0) {
    div.innerHTML = "<p>No task entered</p>";
    return;
  }

  tasks.forEach((t, i) => {
    div.innerHTML += `
      <div>
        <input type="checkbox" id="c${i}">
        ${t.name}
        <button onclick="submitTask(${i})">Submit</button>
        <span id="s${i}"></span>
      </div>
    `;
  });
}

function submitTask(i) {
  let check = document.getElementById("c" + i);
  if (!check.checked) return alert("Check the box first");

  tasks[i].history.shift();
  tasks[i].history.push(1);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("s" + i).innerHTML =
    "<span class='green'>Submitted</span>";
}

// STATUS
function renderStatus() {
  let div = document.getElementById("statusList");
  div.innerHTML = "";

  if (tasks.length === 0) {
    div.innerHTML = "<p>No task entered</p>";
    return;
  }

  tasks.forEach((t, i) => {
    div.innerHTML += `
      <button onclick="showGraph(${i})">${t.name}</button><br>
    `;
  });
}

// GRAPH
function showGraph(i) {
  showScreen('graph');
  document.getElementById("graphTitle").innerText = tasks[i].name;

  let ctx = document.getElementById("chart").getContext("2d");
  ctx.clearRect(0, 0, 300, 150);

  tasks[i].history.forEach((v, index) => {
    let height = v ? 100 : 20;
    ctx.fillRect(index * 28, 150 - height, 20, height);
  });
}
