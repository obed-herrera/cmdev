import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@material-ui/core';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { render } from '@testing-library/react';
import React, { useState } from 'react';



export default function InsertExpenses({render}){
    const [open, setOpen] = useState(false);
    //const [expenses_date, setExpensesDate] = React.useState(new Date());
    const [expenses, setExpenses] = useState({
        credi_expenses_id:'',
        expenses_ben:'',
        expenses_concept:'',
        expenses_date: new Date().toISOString,
        expenses_mount:'',
        expenses_status:''
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
                            name = "expenses_ben"
                            label = "Beneficiario"
                            value = {expenses.expenses_ben}
                            fullWidth
                            onChange = {handleChange}
                            />
                            <TextField
                            autoFocus
                            margin = "dense"
                            name = "expenses_concept"
                            label = "Concepto"
                            value = {expenses.expenses_concept}
                            fullWidth
                            onChange = {handleChange}
                            />
                            <KeyboardDatePicker
                            margin="normal"
                            name="expenses_date"
                            id = "expenses_date"
                            label="Fecha del gasto"
                            format="MM/dd/yyyy"
                            value = {expenses.expenses_date}
                            onChange = {handleChange}
                            KeyboardButtonProps={{
                              'aria-label': 'expenses_date',
                            }}
                            />
                            <TextField
                            autoFocus
                            margin = "dense"
                            name = "expenses_mount"
                            label = "Monto"
                            value = {expenses.expenses_mount}
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