//czyszenie localstorage
//localStorage.clear();

document.addEventListener('DOMContentLoaded', function() {
  const storage = (function(key) {
    if (key === undefined) {
      key = 'localList';
    }
    const saveLocal = function(toSave) {
      localStorage.setItem(key, JSON.stringify(toSave));
    };
    return {
      save: saveLocal,
      loadOrElse: function(defaultValue) {
        const loadedValue = localStorage.getItem(key);
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

  const TaskListApp = (function(storage) {
    const defaultList = ['10', '20', '30'];
    let taskList = storage.loadOrElse(defaultList);

    function viewTasks() {
      const list = document.getElementById('list');
      while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
      }

      function addingRemoveButton(){
        const removeButton = document.createElement('input');
        removeButton.type = 'button';
        removeButton.value = 'Delete this';
        removeButton.addEventListener('click', () => TaskListApp.remove(i));
        listElement.appendChild(removeButton);
      }

      for (let i in taskList) {
        const task = taskList[i];

        const listElement = document.createElement('li');
        const taskmsg = document.createTextNode(task);
        listElement.appendChild(taskmsg);
      
        const removeButton = document.createElement('input');
        removeButton.type = 'button';
        removeButton.value = 'Delete this';
        removeButton.addEventListener('click', () => TaskListApp.remove(i));
        listElement.appendChild(removeButton);

        const editButton = document.createElement('button');
        editButton.addEventListener('click', function() {
          TaskListApp.edit(i);
        });
        editButton.innerHTML = 'Edit task with text from box';
        listElement.appendChild(editButton);

        // html += `<li>${task}
        //  <button onclick='TaskListApp.remove('${i}')'>Delete this</button>
        //  <button onclick='TaskListApp.edit('${i}')'>Edit task with text from box</button>
        //  </li>`;
        // to na górze i to poniżej działa tak samo
        //html += '<li>' + task + '<button onclick='removeTask(' + i + ')'>Delete this</button><button onclick='editTask(' + i + ')'>Edit task with text from box</button></li>';
        list.appendChild(listElement);
      }

      storage.save(taskList);
    }

    function removeTask(indexToBeRemoved) {
      taskList.splice(indexToBeRemoved, 1);
      viewTasks();
    }

    function addTask() {
      const userInput = document.getElementById('msg').value;
      inputCleaner();
      taskList.push(userInput);
      viewTasks();
    }

    function inputCleaner() {
      //const inputValue = document.getElementById('msg').value;
      //inputValue = ' ';
      document.getElementById('msg').value = ''; // czyszczenie inputa
    }

    const editTask = function(indexToBeRemoved) {
      taskList.splice(
        indexToBeRemoved,
        1,
        document.getElementById('msg').value
      );
      inputCleaner();
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

  document.getElementById('addTaskButton').addEventListener('click', TaskListApp.add); //to samo

  document.getElementById('clearButton').addEventListener('click', () => {TaskListApp.clear(); //to samo
  });
});
