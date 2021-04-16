import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, update } from "./LinesSlice";
import { useDispatch } from "react-redux";
import { nextID } from "./LinesSlice";
import { FormControl, FormHelperText, Grid, NativeSelect } from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import './InsertLine.css';

export default function InsertLine({ data, render, onSave }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const defaultImg = data && data.img;
  const defaultName = data && data.name;
  // Existing ID or random ID
  const id = data && data.id;

  const [img, setImg] = React.useState(defaultImg);
  const [name, setName] = React.useState(defaultName);

  const handleClickOpen = () => {
    setOpen(true);
    setName(defaultName);
    setImg(defaultImg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const action = data ? update : add;
    dispatch(action({ name, id: id || nextID(), img }));
    onSave && onSave();
    handleClose();
  };

  const [line, setLine]=useState({
    id_credi_line: '',
    credi_line_code: '',
    credi_line_client: '',
    credi_line_item: '',
    credi_line_item_price: '',
    credi_line_item_quantity:'',
    credi_line_total:'',
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setLine((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(line);
  }

  const [state, setState] = React.useState({
    client_line: '',
  });

  const classes = useStyles();

  return (
    <>
      {render(handleClickOpen)}
      <Dialog contentClassName = "custom-modal-style-line"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth = "xs"
      >
        <DialogTitle id="form-dialog-title">
          {data ? "Editar" : "Agregar"} Linea{" "}
        </DialogTitle>
        <DialogContent>
        <Grid style = {{padding:20}}>
                <Grid item xs ={9}>
                    <div className = "form-group">
                    <TextField
                            autoFocus
                            margin="dense"
                            id="credi_line_code"
                            label="Codigo de la Linea"
                            fullWidth
                            value={line.credi_line_code}
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="credi_line_client"
                            label="Cliente"
                            fullWidth
                            value={line.credi_line_client}
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="credi_line_item"
                            label="Item"
                            fullWidth
                            value={line.credi_line_item}
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="credi_line_item_price"
                            label="Producto"
                            fullWidth
                            value={line.credi_line_item_price}
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="credi_line_quantity"
                            label="Cantidad"
                            fullWidth
                            value={line.credi_line_quantity}
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
              </Grid>
        </DialogContent>
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