import { createSlice } from "@reduxjs/toolkit";

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const ItemSlice = createSlice({
  name: "items",
  initialState: {
    list: [
      { item_code: "15-5659",
        item_name: "Shampoo para mujer",
        item_description: "Shampoo de mujer para pelo",
        item_quantity: "25",
       id: nextID() },
       { item_code: "15-5659",
        item_name: "Shampoo para mujer",
        item_description: "Shampoo de mujer para pelo",
        item_quantity: "25",
       id: nextID() },
       { item_code: "15-5659",
        item_name: "Shampoo para mujer",
        item_description: "Shampoo de mujer para pelo",
        item_quantity: "25",
       id: nextID() },
       { item_code: "15-5659",
        item_name: "Shampoo para mujer",
        item_description: "Shampoo de mujer para pelo",
        item_quantity: "25",
       id: nextID() },
       { item_code: "15-5659",
        item_name: "Shampoo para mujer",
        item_description: "Shampoo de mujer para pelo",
        item_quantity: "25",
       id: nextID() },
       { item_code: "15-5659",
        item_name: "Shampoo para mujer",
        item_description: "Shampoo de mujer para pelo",
        item_quantity: "25",
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
      state.list = state.list.filter((item) => {
        return !removedIds.includes(item.id);
      });
    },
    update: (state, action) => {
      state.list = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
  },
});

export const { add, remove, update } = ItemSlice.actions;

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
export const selectItem = (state) => state.items.list;
export const selectLoading = (state) => state.items.loading;

export default ItemSlice.reducer;