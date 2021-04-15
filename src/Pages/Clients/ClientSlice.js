import { createSlice } from "@reduxjs/toolkit";

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const ClientSlice = createSlice({
  name: "clients",
  initialState: {
    list: [
      { client_first_name: "Obed",
       client_second_name: "Isaias",
       client_middle_name: "Herrera",
       client_last_name: "Toruno",
       client_national_id: "201-160398-0002U",
       client_sys_code: "2015-0272",
       client_home_address: "Granada",
       client_business_address: "Carretera Norte",
       id: nextID() },
       { client_first_name: "Luisangel",
       client_second_name: "Martin",
       client_middle_name: "Marcia",
       client_last_name: "Palma",
       client_national_id: "201-160398-0002U",
       client_sys_code: "2015-0273",
       client_home_address: "Managua",
       client_business_address: "Carretera Norte",
       id: nextID() },
       { client_first_name: "Luisangel",
       client_second_name: "Martin",
       client_middle_name: "Marcia",
       client_last_name: "Palma",
       client_national_id: "201-160398-0002U",
       client_sys_code: "2015-0273",
       client_home_address: "Managua",
       client_business_address: "Carretera Norte",
       id: nextID() },
       { client_first_name: "Luisangel",
       client_second_name: "Martin",
       client_middle_name: "Marcia",
       client_last_name: "Palma",
       client_national_id: "201-160398-0002U",
       client_sys_code: "2015-0273",
       client_home_address: "Managua",
       client_business_address: "Carretera Norte",
       id: nextID() },
       { client_first_name: "Luisangel",
       client_second_name: "Martin",
       client_middle_name: "Marcia",
       client_last_name: "Palma",
       client_national_id: "201-160398-0002U",
       client_sys_code: "2015-0273",
       client_home_address: "Managua",
       client_business_address: "Carretera Norte",
       id: nextID() },
       { client_first_name: "Luisangel",
       client_second_name: "Martin",
       client_middle_name: "Marcia",
       client_last_name: "Palma",
       client_national_id: "201-160398-0002U",
       client_sys_code: "2015-0273",
       client_home_address: "Managua",
       client_business_address: "Carretera Norte",
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

export const { add, remove, update } = ClientSlice.actions;

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
export const selectClient = (state) => state.clients.list;
export const selectLoading = (state) => state.clients.loading;

export default ClientSlice.reducer;