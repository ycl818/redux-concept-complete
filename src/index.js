import store from "./store/configureStore";
import { addTask, removeTask, completeTask } from "./store/task";
import { addEmployee } from "./store/employee";
import axios from "axios";
import { getTasks } from "./store/task";
import { fetchTasks } from "./store/task";

const unsubsribe = store.subscribe(() => {
  console.log("Update", store.getState());
});

store.dispatch(fetchTasks());

// const gettingTasks = async () => {
//   // calling api

//   try {
//     const response = await axios.get("http://localhost:5000/api/tasks");
//     console.log(response);
//     store.dispatch(getTasks({ task: response.data }));
//   } catch (error) {
//     store.dispatch({ type: "SHOW_ERROR", payload: { error: error.message } });
//   }
// };

// gettingTasks();

//store.dispatch(addTask({ task: "Task1" }));
// store.dispatch(addTask({ task: "Task2" }));
// console.log(store.getState());

// store.dispatch(completeTask({ id: 2 }));

// store.dispatch(removeTask({ id: 1 }));
// // store.dispatch(fetchTodo());
// console.log(store.getState());
// store.dispatch(addEmployee({ name: "Harley" }));

// store.dispatch({ type: "SHOW_ERROR", payload: { error: "user not found" } });
