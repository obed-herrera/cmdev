import { createSlice } from "@reduxjs/toolkit";

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const WorkersSlice = createSlice({
  name: "workers",
  initialState: {
    list: [
      { worker_first_name: "Obed",
       worker_second_name: "Isaias",
       worker_middle_name: "Herrera",
       worker_last_name: "Toruno",
       id: nextID() },
       { worker_first_name: "Obed",
       worker_second_name: "Isaias",
       worker_middle_name: "Herrera",
       worker_last_name: "Toruno",
       id: nextID() },
       { worker_first_name: "Obed",
       worker_second_name: "Isaias",
       worker_middle_name: "Herrera",
       worker_last_name: "Toruno",
       id: nextID() },
       { worker_first_name: "Obed",
       worker_second_name: "Isaias",
       worker_middle_name: "Herrera",
       worker_last_name: "Toruno",
       id: nextID() },
       { worker_first_name: "Obed",
       worker_second_name: "Isaias",
       worker_middle_name: "Herrera",
       worker_last_name: "Toruno",
       id: nextID() },
       { worker_first_name: "Obed",
       worker_second_name: "Isaias",
       worker_middle_name: "Herrera",
       worker_last_name: "Toruno",
       id: nextID() },
       
    ],
    loading: false,
  },
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.list.push(action.payload);
    },
    remove: (state, action) => {
      const removedIds = action.payload;
      state.list = state.list.filter((worker) => {
        return !removedIds.includes(worker.id);
      });
    },
    update: (state, action) => {
      state.list = state.list.map((worker) => {
        if (worker.id === action.payload.id) {
          return action.payload;
        }
        return worker;
      });
    },
  },
});

export const { add, remove, update } = WorkersSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    //dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWorker = (state) => state.workers.list;
export const selectLoading = (state) => state.workers.loading;

export default WorkersSlice.reducer;