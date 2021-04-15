import { createSlice } from "@reduxjs/toolkit";

let nextIdVal = 0;

export function nextID() {
  nextIdVal += 1;
  return nextIdVal;
}

export const LoansSlice = createSlice({
  name: "loan",
  initialState: {
    list: [
      { id: nextID(), credi_loan_code: "2556-256", credi_loan_client: "Obed Herrera", credi_loan_mount: "2500", credi_loan_money_type: "Cordoba", credi_loan_interest: "6%", credi_loan_line: "Montetabor" },
      { id: nextID(), credi_loan_code: "2556-256", credi_loan_client: "Obed Herrera", credi_loan_mount: "2500", credi_loan_money_type: "Cordoba", credi_loan_interest: "6%", credi_loan_line: "Montetabor" },
      { id: nextID(), credi_loan_code: "2556-256", credi_loan_client: "Obed Herrera", credi_loan_mount: "2500", credi_loan_money_type: "Cordoba", credi_loan_interest: "6%", credi_loan_line: "Montetabor" },
      { id: nextID(), credi_loan_code: "2556-256", credi_loan_client: "Obed Herrera", credi_loan_mount: "2500", credi_loan_money_type: "Cordoba", credi_loan_interest: "6%", credi_loan_line: "Montetabor" },
      { id: nextID(), credi_loan_code: "2556-256", credi_loan_client: "Obed Herrera", credi_loan_mount: "2500", credi_loan_money_type: "Cordoba", credi_loan_interest: "6%", credi_loan_line: "Montetabor" },
      { id: nextID(), credi_loan_code: "2556-256", credi_loan_client: "Obed Herrera", credi_loan_mount: "2500", credi_loan_money_type: "Cordoba", credi_loan_interest: "6%", credi_loan_line: "Montetabor" },
      { id: nextID(), credi_loan_code: "2556-256", credi_loan_client: "Obed Herrera", credi_loan_mount: "2500", credi_loan_money_type: "Cordoba", credi_loan_interest: "6%", credi_loan_line: "Montetabor" },
      { id: nextID(), credi_loan_code: "2556-256", credi_loan_client: "Obed Herrera", credi_loan_mount: "2500", credi_loan_money_type: "Cordoba", credi_loan_interest: "6%", credi_loan_line: "Montetabor" },
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
      state.list = state.list.filter((loan) => {
        return !removedIds.includes(loan.id);
      });
    },
    update: (state, action) => {
      state.list = state.list.map((loan) => {
        if (loan.id === action.payload.id) {
          return action.payload;
        }
        return loan;
      });
    },
  },
});

export const { add, remove, update } = LoansSlice.actions;

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
export const selectLoans = (state) => state.loan.list;
export const selectLoading = (state) => state.loan.loading;

export default LoansSlice.reducer;