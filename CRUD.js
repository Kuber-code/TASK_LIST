//przekazywanie textu do htmla
//document.getElementById("text").innerHTML = "TEKST Z PLIKU JS";

//czyszenie localstorage
//localStorage.clear();
//document.addEventListener(scriptLoad(), function() {});
document.addEventListener("DOMContentLoaded", function() {
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
      let list = document.getElementById("list");
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }

      for (let i in taskList) {
        const task = taskList[i];

        let listElement = document.createElement("li");
        let taskmsg = document.createTextNode(task);
        listElement.appendChild(taskmsg);

        let removeButton = document.createElement("input");
        removeButton.type = "button";
        removeButton.value = "Delete this";
        removeButton.addEventListener("click", () => TaskListApp.remove(i));
        listElement.appendChild(removeButton);

        let editButton = document.createElement("button");
        editButton.addEventListener("click", function() {
          TaskListApp.edit(i);
        });
        editButton.innerHTML = "Edit task with text from box";
        listElement.appendChild(editButton);

        // html += `<li>${task}
        //  <button onclick='TaskListApp.remove("${i}")'>Delete this</button>
        //  <button onclick='TaskListApp.edit("${i}")'>Edit task with text from box</button>
        //  </li>`;
        // to zakomentowane i to poniżej działa tak samo
        //html += "<li>" + task + "<button onclick='removeTask(" + i + ")'>Delete this</button><button onclick='editTask(" + i + ")'>Edit task with text from box</button></li>";
        list.appendChild(listElement);
      }

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
      taskList.splice(
        indexToBeRemoved,
        1,
        document.getElementById("msg").value
      );
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

  TaskListApp.view();

  document
    .getElementById("addTaskButton")
    .addEventListener("click", TaskListApp.add);

  document.getElementById("clearButton").addEventListener("click", () => {
    TaskListApp.clear(); //to samo
  });
});
