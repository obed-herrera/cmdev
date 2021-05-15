import { Button, Dialog, DialogActions, DialogContent, Divider, TextField } from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, nextID, update } from "./LoansSlice";

export default function InsertPayment({data, render, onSave}){
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () =>{
        setOpen(true);
        setUser(user);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const action = data ? update : add;
        dispatch(action({user: user || nextID()}));
        onSave && onSave();
        handleClose();
    }

    const [user, setUser] = useState({
        id_credi_payment:'',
        credi_payment_mount:''
    });

    /*const handleChange = e =>{
        const {name, value} = e.target;
        setUser((prevState)=>({
            ...prevState,
            [name]: value
        }))
        console.log(user);
    }*/


    return(
        <div>
            {render(handleClickOpen)}
            <Dialog
                open = {open}
                onClose = {handleClose}
                aria-labelledby = "form-dialog-title"
            >
                <DialogTitle id = "form-dialog-title">
                    {data = "Agregar"} Pago {" "}
                </DialogTitle>
                <Divider/>
                <DialogContent>
                        <div className = "form-group">
                            <TextField
                                autoFocus
                                margin = "dense"
                                id = "credi_payment_mount"
                                label = "Abono"
                                fullWidth
                                value = {user.credi_payment_mount}
                                onChange = {(e)=>{
                                    setUser(e.target.value);
                                }}
                            />
                        </div>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick = {handleClose} color = "primary">
                        Cancelar
                    </Button>
                    <Button onClick = {handleSave} color = "primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}