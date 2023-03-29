import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/http";

export const fetchTasks = createAsyncThunk(
  "fetchTasks",
  async (a, { rejectWithValue }) => {
    try {
      const response = await axios.get("/tasks");
      return { task: response.data };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

let id = 0;
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push({
        id: ++id,
        task: action.payload.task,
        complete: false,
      });
    },
    removeTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks.splice(index, 1);
    },
    completeTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index].complete = true;
    },
  },
  extraReducers: {
    [fetchTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload.task;
      state.loading = false;
    },
    [fetchTasks.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchTasks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { getTasks, addTask, removeTask, completeTask } =
  taskSlice.actions;
export default taskSlice.reducer;
// console.log(taskSlice);

// Actions
// export const addTask = createAction("ADD_TASK");
// export const removeTask = createAction("REMOVE_TASK");
// export const completeTask = createAction("COMPLETE_TASK");

// export const fetchTodo = () => {
//   return async function (dispatch, getState) {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/todos/1"
//     );
//     const task = await response.json();
//     dispatch(addTask(task.title));
//   };
// };

// Reducer

// export default createReducer([], {
//   [addTask.type]: (state, action) => {
//     state.push({
//       id: ++id,
//       task: action.payload.task,
//       complete: false,
//     });
//   },
//   [removeTask.type]: (state, action) => {
//     const index = state.findIndex((task) => task.id === action.payload.id);
//     state.splice(index, 1);
//   },
//   [completeTask.type]: (state, action) => {
//     const index = state.findIndex((task) => task.id === action.payload.id);
//     state[index].complete = true;
//   },
// });

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case addTask.type:
//       return [
//         ...state,
//         {
//           id: ++id,
//           task: action.payload.task,
//           complete: false,
//         },
//       ];
//     case removeTask.type:
//       return state.filter((task) => task.id !== action.payload.id);

//     case completeTask.type:
//       return state.map((task) =>
//         task.id === action.payload.id
//           ? {
//               ...task,
//               complete: true,
//             }
//           : task
//       );
//     default:
//       return state;
//   }
// }
