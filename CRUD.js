//przekazywanie textu do htmla
//document.getElementById("text").innerHTML = "TEKST Z PLIKU JS";

//czyszenie localstorage
//localStorage.clear();
//document.addEventListener(scriptLoad(), function() {});
//document.addEventListener("DOMContentLoaded", function() {
//...tutaj pobieramy elementy...
//const btn = document.getElementById('addTaskButton');
//console.log(btn.innerText); //Kliknij mnie

var storage = (function(key) {
  if (key === undefined) {
    key = "localList";
  }
  var saveIternal = function(toSave) {
    localStorage.setItem(key, JSON.stringify(toSave));
  };
  return {
    save: saveIternal,
    loadOrElse: function(defaultValue) {
      var loadedValue = localStorage.getItem(key);
      if (loadedValue) {
        return JSON.parse(localStorage.getItem(key));
      } else {
        return defaultValue;
      }
    },
    clear: function() {
      localStorage.clear(key);
    }
  };
})();

var TaskListApp = (function(storage) {
  var defaultList = ["10", "20", "30"];
  var taskList = storage.loadOrElse(defaultList);

  function viewTasks() {
    var html = "";

    for (let i in taskList) {
      const task = taskList[i];
      html += `<li>${task}
         <button onclick='TaskListApp.remove("${i}")'>Delete this</button>
         <button onclick='TaskListApp.edit("${i}")'>Edit task with text from box</button>
         </li>`;

      // to zakomentowane i to poniżej działa tak samo

      //html += "<li>" + task + "<button onclick='removeTask(" + i + ")'>Delete this</button><button onclick='editTask(" + i + ")'>Edit task with text from box</button></li>";
    }
    document.getElementById("list").innerHTML = html;
    storage.save(taskList);
  }

  function removeTask(indexToBeRemoved) {
    taskList.splice(indexToBeRemoved, 1);
    //console.error('Nie usuwaj mnie!');
    //console.warn(':((((');
    viewTasks();
  }

  function addTask() {
    let userInput = document.getElementById("msg").value;
    document.getElementById("msg").value = ""; // czyszczenie inputa
    taskList.push(userInput);
    viewTasks();
  }

  var editTask = function(indexToBeRemoved) {
    taskList.splice(indexToBeRemoved, 1, document.getElementById("msg").value);
    document.getElementById("msg").value = ""; // czyszczenie inputa
    viewTasks();
  };

  function resetStorage() {
    storage.clear();
    taskList = [...defaultList];
    viewTasks();
  }

  return {
    view: function() {
      viewTasks();
    },
    add: addTask,
    edit: editTask,
    remove: removeTask,
    clear: resetStorage,
    defaultTaskList: resetStorage
  };
})(storage); // wstrzykiwane zaleznosci -- twoj storage (w tym przypadku local-storage)
//});
