import { Button, Dialog, DialogActions, DialogContent, Divider, FormControl, FormHelperText, NativeSelect, TextField } from "@material-ui/core";
import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import axios from "axios";

export default function InsertLine({data, render}){
    const baseUrl = "http://localhost:3001/Line/lines";
    const [open, setOpen] = React.useState(false);

    const peticionPost=async()=>{
        await axios.post(baseUrl, line)
        .then(response=>{
          setLine(data.concat(response.data));
          handleClose();
        }).catch(error=>{
          console.log(error);
        })
      }

    const handleClickOpen = () =>{
        setOpen(true);
        setLine(line);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [line, setLine] = useState({
        id_credi_line:'',
        credi_line_name:'',
        credi_line_state:'',
        credi_line_code:''
    });

    const handleChange = e =>{
        const {name, value} = e.target;
        setLine((prevState)=>({
            ...prevState,
            [name]: value
        }))
        console.log(line);
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
                                name = "credi_line_code"
                                label = "Codigo de la linea"
                                fullWidth
                                onChange = {handleChange}
                            />
                            <TextField
                                autoFocus
                                margin = "dense"
                                name = "credi_line_name"
                                label = "Nombre de la linea"
                                fullWidth
                                onChange = {handleChange}
                            />
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    className={classes.selectEmpty}
                                    name="credi_line_state"
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'credi_line_state' }}
                                >
                                    <option value="" disabled>
                                    Estado de la linea
                                    </option>
                                    <option value={'0'}>Activo</option>
                                    <option value={'1'}>Inactivo</option>
                                </NativeSelect>
                                <FormHelperText>Estado de la linea</FormHelperText>
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