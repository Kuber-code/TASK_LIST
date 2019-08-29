// przekazywanie textu do htmla
//document.getElementById("text").innerHTML = "TEKST Z PLIKU JS";

var taskList = ["10","2","3"];

function viewTasks() {
  let html = '';
  
  for(let i in taskList) {
    const task = taskList[i];
    //html += `<li>${task}
    //   <button onclick='removeTask("${i}")'>Delete this</button>
    //   <button onclick='editTask("${i}")'>Edit task with text from box</button>
    //   </li>`;

    // to zakomenntowane i to poniżej działa tak samo

    html += "<li>" + task + "<button onclick='removeTask(" + i + ")'>Delete this</button><button onclick='editTask(" + i + ")'>Edit task with text from box</button></li>";
  }
  // html = "<li>10</li><li>2</li><li>3</liaaa>"
  document.getElementById("list").innerHTML = html;
}

function removeTask(indexToBeRemoved) {
  taskList.splice(indexToBeRemoved, 1);
  console.error('Nie usuwaj mnie kurwiu!');
  console.warn('Śmieciu');
  viewTasks();
}

function addTask() {
  let userInput = document.getElementById("msg").value;
  //document.getElementById("msg").value=''; // czyszczenie inputa
  taskList.push(userInput);
  viewTasks();
}
function editTask(indexToBeRemoved) {
  taskList.splice(indexToBeRemoved, 1, document.getElementById("msg").value);
  //taskList.push(document.getElementById("msg").value);
  viewTasks();
  //document.getElementById("list").innerHTML = html;
}


