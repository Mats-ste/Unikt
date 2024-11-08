document.getElementById("addTaskButton").addEventListener("click", addTask)
document.getElementById("removeTaskButton").addEventListener("click", removeTask)

function addTask() {
let task = document.getElementById("taskInput").value;
let listItem = document.createElement("li")
listItem.textContent = task
document.getElementById("taskList").appendChild(listItem)
document.getElementById("taskInput").value = "";

}

function removeTask(){
    let task = document.getElementById("taskInput").value;
    let tasklist = document.getElementById("taskList");
    let listItems = tasklist.getElementsByTagName("li");

    for(let i = 0; i < listItems.length; i++){
        if(listItems[i].textContent === task) {
            tasklist.removeChild(listItems[i]);
            return

        }

    }


}