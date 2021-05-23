import { Button, Dialog, DialogActions, DialogContent, Divider, FormControl, FormHelperText, NativeSelect, TextField } from "@material-ui/core";
import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import axios from "axios";

export default function InsertLine({data, render}){
    const baseUrl = "http://localhost:3001/LoanArea/loanarea";
    const [open, setOpen] = React.useState(false);

    const peticionPost=async()=>{
        await axios.post(baseUrl, loanArea)
        .then(response=>{
          setLoanArea(data.concat(response.data));
          handleClose();
        }).catch(error=>{
          console.log(error);
        })
      }

    const handleClickOpen = () =>{
        setOpen(true);
        setLoanArea(loanArea);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [loanArea, setLoanArea] = useState({
        id_credi_loan_area:'',
        name:'',
        credi_loan_area_state:''
    });

    const handleChange = e =>{
        const {name, value} = e.target;
        setLoanArea((prevState)=>({
            ...prevState,
            [name]: value
        }))
        console.log(loanArea);
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
                    {data = "Agregar"} Area de Prestamo {" "}
                </DialogTitle>
                <Divider/>
                <DialogContent>
                        <div className = "form-group">
                        <TextField
                                autoFocus
                                margin = "dense"
                                name = "name"
                                label = "Nombre del Area"
                                fullWidth
                                onChange = {handleChange}
                            />
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    className={classes.selectEmpty}
                                    name="credi_loan_area_state"
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'credi_loan_area_state' }}
                                >
                                    <option value="" disabled>
                                    Estado del area
                                    </option>
                                    <option value={'0'}>Activo</option>
                                    <option value={'1'}>Inactivo</option>
                                </NativeSelect>
                                <FormHelperText>Estado del area</FormHelperText>
                            </FormControl>
                        </div>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick = {handleClose} color = "primary">
                        Cancelar
                    </Button>
                    <Button onClick = {peticionPost} color = "primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}