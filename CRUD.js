// przekazywanie textu do htmla
//document.getElementById("text").innerHTML = "TEKST Z PLIKU JS";


var taskList = ["10","2","3"];

function viewTasks() {
  let html = '';
  for(let i of taskList) {
      html += "<li>"+i+"<button onclick='removeTask("+i+")'>Usun to kurwo</button></li>";
  }
  // html = "<li>10</li><li>2</li><li>3</liaaa>"
  document.getElementById("list").innerHTML = html;
}

function removeTask(elementToBeRemoved) {
  taskList = taskList.filter(function(element) {
    return element != elementToBeRemoved;
  });
  viewTasks();
}

function addTask() {
  let userInput = document.getElementById("msg").value;
  document.getElementById("msg").value=''; // czyszczenie inputa
  taskList.push(userInput);
  viewTasks();
}

