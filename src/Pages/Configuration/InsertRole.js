import { Button, Dialog, DialogActions, DialogContent, Divider, FormControl, FormHelperText, NativeSelect, TextField } from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, nextID, update } from "./UserSlice";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";

export default function InsertRole({data, render, onSave}){
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
        id_credi_role:'',
        role_name:'',
        role_state:''
    });

    const handleChange = e =>{
        const {name, value} = e.target;
        setUser((prevState)=>({
            ...prevState,
            [name]: value
        }))
        console.log(user);
    }

    const classes = useStyles();

    return(
        <div>
            {render(handleClickOpen)}
            <Dialog
                open = {open}
                onClose = {handleClose}
                aria-labelledby = "form-dialog-title"
            >
                <DialogTitle id = "form-dialog-title">
                    {data = "Agregar"} Rol {" "}
                </DialogTitle>
                <Divider/>
                <DialogContent>
                        <div className = "form-group">
                            <TextField
                                autoFocus
                                margin = "dense"
                                id = "role_name"
                                label = "Nombre del Rol"
                                fullWidth
                                value = {user.role_name}
                                onChange = {(e)=>{
                                    setUser(e.target.value);
                                }}
                            />
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    className={classes.selectEmpty}
                                    value={user.role_state}
                                    name="role_state"
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'role_state' }}
                                >
                                    <option value="" disabled>
                                    Estado del Rol
                                    </option>
                                    <option value={'Activo'}>Activo</option>
                                    <option value={'Inactivo'}>Inactivo</option>
                                </NativeSelect>
                                <FormHelperText>Estado del Rol</FormHelperText>
                            </FormControl>
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