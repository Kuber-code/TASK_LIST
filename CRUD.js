// przekazywanie textu do htmla
//document.getElementById("text").innerHTML = "TEKST Z PLIKU JS";

//czyszenie localstorage
//localStorage.clear();
//var taskList = ['10','2','3'];
var n=2;
console.log('pierwsze wywołanie po resecie strony:');
console.log(taskList);
console.log(localStorage);
//if(localStorage.getItem('localList') === undefined || localStorage.getItem('localList') === null || localStorage.getItem('localList') === '')
if(localStorage.getItem('localList') === undefined  || localStorage.getItem('localList') === null)
{
  var taskList = ['10','20','30'];
  }
    else
    {
    var taskList = localStorage.getItem('localList');
    }
    console.log(' wywołanie ' +n+' po przejściu ifa:');
    console.log(taskList);
    console.log(localStorage);
    n++;

function viewTasks() {
  let html = '';

  for(let i in taskList) {
    const task = taskList[i];
    html += `<li>${task}
       <button onclick='removeTask("${i}")'>Delete this</button>
       <button onclick='editTask("${i}")'>Edit task with text from box</button>
       </li>`;

    // to zakomentowane i to poniżej działa tak samo

    //html += "<li>" + task + "<button onclick='removeTask(" + i + ")'>Delete this</button><button onclick='editTask(" + i + ")'>Edit task with text from box</button></li>";
  }
  document.getElementById('list').innerHTML = html;

  //zapisywanie listy do localstore
  localStorage.setItem('locatList', JSON.stringify(taskList));
  
  console.log(' wywołanie' +n+'po pętli for:');
  console.log(taskList);
  console.log(localStorage);
  n++;
}

function removeTask(indexToBeRemoved) {
  taskList.splice(indexToBeRemoved, 1);
  //console.error('Nie usuwaj mnie!');
  //console.warn(':((((');
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
  viewTasks();
}


//
//let total = 0, count = 1;
//while (count <= 10) {
// total += count;
//count += 1;}
//console.log(total);
//
