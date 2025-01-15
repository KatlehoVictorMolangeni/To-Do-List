document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById('taskInput');
    const addTask = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks(){
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? "completed" : ""}`;
            li.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                   <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
            </div>`;
            taskList.appendChild(li);
        });
    }

    addTask.addEventListener("click", () =>{
        const taskText = taskInput.value.trim();
        if(taskText){
            tasks.push({text: taskText, completed:false});
            taskInput.value = "";
            saveTasks();
            renderTasks();
        }
    });

    window.toggleComplete = function(index){
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    window.deleteTask = function (index){
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    function saveTasks(){
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    renderTasks();

});