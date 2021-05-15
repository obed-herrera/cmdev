import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider, FormControl, FormHelperText, Grid, NativeSelect } from "@material-ui/core";
import axios from "axios";
import {useStyles} from "./Items";
//import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";

export default function InsertItem({ render}) {
  const baseUrl = "http://localhost:3001/Item/items";
  const [open, setOpen] = React.useState(false);

  const peticionPost=async()=>{
    await axios.post(baseUrl, item)
    .then(response=>{
      setItem(data.concat(response.data));
      handleClose();
    }).catch(error=>{
      console.log(error);
    })
  }

  const [data, setData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    setItem(item);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange=e=>{
    setItem((item)=>({
      ...item,
      [e.target.name]: e.target.value
    }))
    console.log(item);
  }

  const classes = useStyles();

  const [item, setItem]=useState({
    id_credi_item: '',
    credi_item_code:'',
    credi_item_name:'',
    credi_item_description:'',
    credi_item_cost:'',
    credi_item_price:'',
    credi_item_quantity:'',
    credi_item_state:''
  });

 /* const handleChange=e=>{
    const {name, value}=e.target;
    setItem((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(item);
  }*/

  //const classes = useStyles();

  return (
    <>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {data ? "Editar" : "Agregar"} Producto{" "}
        </DialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container lg = 'auto' spacing = {3} style = {{padding:20}}>
                <Grid item xs ={9}>
                    <div className = "form-group">
                        <TextField
                            autoFocus
                            margin="dense"
                            name="credi_item_code"
                            label="Codigo del Producto"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="credi_item_name"
                            label="Nombre del Producto"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="credi_item_description"
                            label="Descripcion"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="credi_item_cost"
                            label="Costo del Producto"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="credi_item_price"
                            label="Precio del Producto"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="credi_item_quantity"
                            label="Cantidad"
                            fullWidth
                            onChange={handleChange}
                        />
                        <FormControl className={classes.formControl}>
                          <NativeSelect
                            className={classes.selectEmpty}     
                            name="credi_item_state"
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'credi_item_state' }}
                          >
                            <option value="" disabled>
                              Estado del Producto
                            </option>
                            <option value={'0'}>Activo</option>
                            <option value={'1'}>Inactivo</option>
                          </NativeSelect>
                          <FormHelperText>Estado del Producto</FormHelperText>
                        </FormControl>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
            </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          {<Button onClick={peticionPost} color="primary">
            Guardar
        </Button>}
        </DialogActions>
      </Dialog>
    </>
  );
}