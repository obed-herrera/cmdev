import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { render } from '@testing-library/react';
import React, { useState } from 'react';



export default function InsertExpenses({render}){
    const [open, setOpen] = useState(false);
    //const [expenses_date, setExpensesDate] = React.useState(new Date());
    const [expenses, setExpenses] = useState({
        id:'',
        beneficiary:'',
        concept:'',
        amount:'',
        expensed_at: new Date(),
        created_at: new Date(),
        modified_at: new Date(),
        disabled_at: new Date()
    });
    
    const data = useState([]);

    const handleClickOpen = () =>{
        setOpen(true);
        setExpenses(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }

    const handleChange=e=>{
        const {name, value} = e.target;
        setExpenses((expenses)=>({
          ...expenses,
          [name]: value,
        }))
        console.log(expenses);
    }

    /*const handleDateChange = (expenses_date) =>{
        setExpensesDate(expenses_date);
    }*/
    return(
        <div>
            {render(handleClickOpen)}
            <Dialog contentClassName = "custom-modal-style-client"
                open = {open}
                onClose = {handleClose}
                aria-labelledby = "form-dialo-title"
                maxWidth = "xs"
            >
                <DialogTitle id = "form-dialog-title">
                    {"Agregar"} Gasto {""}
                </DialogTitle>
                <DialogContent>
                    <Grid style = {{padding:20}}>
                        <div className = "form-group">
                            <TextField
                            autoFocus
                            margin = "dense"
                            name = "beneficiary"
                            label = "Beneficiario"
                            value = {expenses.beneficiary}
                            fullWidth
                            onChange = {handleChange}
                            />
                            <TextField
                            autoFocus
                            margin = "dense"
                            name = "concept"
                            label = "Concepto"
                            value = {expenses.concept}
                            fullWidth
                            onChange = {handleChange}
                            />
                            <KeyboardDatePicker
                            margin="normal"
                            name="expensed_at"
                            id = "expensed_at"
                            label="Fecha del gasto"
                            format="MM/dd/yyyy"
                            value = {expenses.expensed_at}
                            onChange = {handleChange}
                            KeyboardButtonProps={{
                              'aria-label': 'expensed_at',
                            }}
                            />
                            <TextField
                            autoFocus
                            margin = "dense"
                            name = "amount"
                            label = "Monto"
                            value = {expenses.amount}
                            fullWidth
                            onChange = {handleChange}
                            />
                        </div>
                    </Grid>
                </DialogContent>    
                <DialogActions>
                    <Button onClick = {handleClose} color = "primary">
                        Cancelar
                    </Button>
                    <Button onClick = {handleClose} color = "primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}