import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Titulo from "./components/Titulo";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      //Chamar api
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        { method: "GET" }
      );
      // pegar os dados que ela retorna
      const data = await response.json();

      //Armazenar os dados no state
      setTasks(data);
    };
    // Chamar a funcao
    // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });
    setTasks(newTasks);
  }

  function deleteTaskOnClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTextSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      // Como os campos do objeto task são iguais aos do parametro, eu nao preciso repetir os nomes
      // title: title,
      // description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Titulo>Gerenciador de tarefas</Titulo>
        <AddTask onAddTextSubmit={onAddTextSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          deleteTaskOnClick={deleteTaskOnClick}
        />
      </div>
    </div>
  );
}

export default App;
