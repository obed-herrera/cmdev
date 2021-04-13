import { createSlice } from "@reduxjs/toolkit";

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const LinesSlice = createSlice({
  name: "people",
  initialState: {
    list: [
      { name: "Joe", img: "/img/driver.png", id: nextID() },
      { name: "Mary", img: "/img/driver2.png", id: nextID() },
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
      state.list = state.list.filter((client) => {
        return !removedIds.includes(client.id);
      });
    },
    update: (state, action) => {
      state.list = state.list.map((client) => {
        if (client.id === action.payload.id) {
          return action.payload;
        }
        return client;
      });
    },
  },
});

export const { add, remove, update } = LinesSlice.actions;

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
export const selectLines = (state) => state.people.list;
export const selectLoading = (state) => state.people.loading;

export default LinesSlice.reducer;