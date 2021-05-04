import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, update } from "./ItemSlice";
import { useDispatch } from "react-redux";
import { nextID } from "./ItemSlice";
import { Divider, Grid } from "@material-ui/core";
//import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";

export default function InsertItem({ data, render, onSave }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const defaultImg = data && data.img;
  const defaultField = data && data.field;
  // Existing ID or random ID
  const id = data && data.id;

  const [img, setImg] = React.useState(defaultImg);
  const [ setField] = React.useState(defaultField);

  const handleClickOpen = () => {
    setOpen(true);
    setImg(defaultImg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const action = data ? update : add;
    dispatch(action({ item, id: id || nextID(), img }));
    onSave && onSave();
    handleClose();
  };

  const [item, setItem]=useState({
    id_item: '',
    item_code:'',
    item_name:'',
    item_description:'',
    item_quantity:'',
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
        maxWidth = "xs"
      >
        <DialogTitle id="form-dialog-title">
          {data ? "Editar" : "Agregar"} Producto{" "}
        </DialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing = {3} style = {{padding:20}}>
                <Grid item xs ={9}>
                    <div className = "form-group">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="item_code"
                            label="Codigo del Producto"
                            fullWidth
                            value={item.item_code}
                            onChange={(e) => {
                            setItem(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="item_name"
                            label="Nombre del Producto"
                            fullWidth
                            value={item.item_name}
                            onChange={(e) => {
                            setItem(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="item_description"
                            label="Descripcion"
                            fullWidth
                            value={item.item_description}
                            onChange={(e) => {
                            setItem(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="item_quantity"
                            label="Cantidad"
                            fullWidth
                            value={item.item_quantity}
                            onChange={(e) => {
                            setItem(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="item_price"
                            label="Precio"
                            fullWidth
                            value={item.item_price}
                            onChange={(e) => {
                            setItem(e.target.value);
                            }}
                        />
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
          {<Button onClick={handleSave} color="primary">
            Guardar
        </Button>}
        </DialogActions>
      </Dialog>
    </>
  );
}