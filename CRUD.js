// przekazywanie textu do htmla
//document.getElementById("text").innerHTML = "TEKST Z PLIKU JS";
(function() {
  let dupsko = 'asd';
console.log(dupsko)
})()

var taskList = ["10","2","3"];

function viewTasks() {
  let html = '';
  for(let i of taskList) {
      html += "<li>"+i+"<button onclick='removeTask("+i+")'>Usun to kurwo</button></li>";
  }
  // html = "<li>10</li><li>2</li><li>3</li>"
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

/*//versja 1 - ciąg znaków, dopisywanie kolejnego
function addTask() {
  //var node = document.createElement("li");                 // Create a <li> node
  //var textnode = document.createTextNode(document.getElementById("msg"))  // Create a text node
//node.appendChild(textnode);                              // Append the text to <li>
 // document.getElementById("list").appendChild(node);     // Append <li> to <ul> with id="myList"
  
 document.getElementById("list").innerHTML += document.getElementById("msg").value
}   */
