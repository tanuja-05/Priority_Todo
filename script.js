const inputbox = document.getElementById("input-box");
const prioritySelect = document.getElementById("priority-select");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        li.classList.add(prioritySelect.value);
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        insertTaskInOrder(li);
        dataStorage();
    }
    inputbox.value = "";
}

function insertTaskInOrder(task) {
    const tasks = Array.from(listContainer.children);
    let inserted = false;

    for (let i = 0; i < tasks.length; i++) {
        if (getPriorityValue(task) < getPriorityValue(tasks[i])) {
            listContainer.insertBefore(task, tasks[i]);
            inserted = true;
            break;
        }
    }

    if (!inserted) {
        listContainer.appendChild(task);
    }
}

function getPriorityValue(task) {
    if (task.classList.contains('high')) return 1;
    if (task.classList.contains('medium')) return 2;
    if (task.classList.contains('low')) return 3;
    return 4;
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        dataStorage();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        dataStorage();
    }
}, false);

function dataStorage() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    // Add click event listeners to delete buttons again
    Array.from(listContainer.children).forEach(task => {
        task.querySelector("span").addEventListener("click", (e) => {
            e.target.parentElement.remove();
            dataStorage();
        });
    });
}
function updateTime() {
    const datetime = document.getElementById("datetime");
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    datetime.innerHTML = `${formattedDate} ${formattedTime}`;
}

showTask();
updateTime();
setInterval(updateTime, 1000);