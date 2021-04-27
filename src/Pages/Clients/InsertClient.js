import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, update } from "./ClientSlice";
import { useDispatch } from "react-redux";
import { nextID } from "./ClientSlice";
import { Divider, FormControl, FormHelperText, Grid, NativeSelect } from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";

export default function InsertClient({ data, render, onSave }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const defaultImg = data && data.img;
  const defaultField = data && data.field;
  // Existing ID or random ID
  const id = data && data.id;

  const [img, setImg] = React.useState(defaultImg);
  const [setField] = React.useState(defaultField);

  const handleClickOpen = () => {
    setOpen(true);
    setImg(defaultImg);
    setField(defaultField);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const action = data ? update : add;
    dispatch(action({ client, id: id || nextID(), img }));
    onSave && onSave();
    handleClose();
  };

  const [client, setClient]=useState({
    id_credi_client: '',
    client_first_name: '',
    client_second_name: '',
    client_middle_name: '',
    client_last_name: '',
    client_national_id: '',
    client_sys_code: '',
    client_home_address: '',
    client_business_address: '',
    client_state: '',
    client_line: '',
    client_phone: '',
    client_creation_date: new Date()
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setClient((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(client);
  }

  const classes = useStyles();

  return (
    <>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {data ? "Editar" : "Agregar"} Cliente{" "}
        </DialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="client_first_name"
                            label="Primer Nombre"
                            fullWidth
                            value={client.client_first_name}
                            onChange={(e) => {
                            setField(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="client_second_name"
                            label="Segundo Nombre"
                            fullWidth
                            value={client.client_second_name}
                            onChange={(e) => {
                            setField(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="client_middle_name"
                            label="Primer Apellido"
                            fullWidth
                            value={client.client_middle_name}
                            onChange={(e) => {
                            setField(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="client_last_name"
                            label="Segundo Apellido"
                            fullWidth
                            value={client.client_last_name}
                            onChange={(e) => {
                            setField(e.target.value);
                            }}
                        />
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                <TextField
                            autoFocus
                            margin="dense"
                            id="clieYnt_national_id"
                            label="Cedula del Cliente"
                            fullWidth
                            value={client.client_national_id}
                            onChange={(e) => {
                            setClient(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="client_sys_code"
                            label="Codigo del Cliente"
                            fullWidth
                            value={client.client_sys_code}
                            onChange={(e) => {
                            setClient(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="client_home_address"
                            label="Direccion de Casa"
                            fullWidth
                            value={client.client_home_address}
                            onChange={(e) => {
                            setClient(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="client_business_address"
                            label="Direccion del Trabajo"
                            fullWidth
                            value={client.client_business_address}
                            onChange={(e) => {
                            setClient(e.target.value);
                            }}
                        />                                  
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <TextField
                            autoFocus
                            margin="dense"
                            id="client_phone"
                            label="Telefono del Trabajo"
                            fullWidth
                            value={client.client_phone}
                            onChange={(e) => {
                            setClient(e.target.value);
                            }}
                        /> 
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={client.client_state}
                        name="client_state"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'client_state' }}
                      >
                        <option value="" disabled>
                          Estado del Cliente
                        </option>
                        <option value={'Activo'}>Activo</option>
                        <option value={'Inactivo'}>Inactivo</option>
                      </NativeSelect>
                      <FormHelperText>Estado del Trabajador</FormHelperText>
                    </FormControl>
                     {/* <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={state.client_Line}
                              name="client_line"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'client_line' }}
                            >
                              <option value="" disabled>
                                Linea del Cliente
                              </option>
                              {lines.map((value)=>(
                                <option value = {value.client_line} key = {value.id_credi_client_line}>
                                  {value.client_line}
                                </option>
                              ))}
                              
                            </NativeSelect>
                            <FormHelperText>Linea del Cliente</FormHelperText>
                          </FormControl>
                              </div>*/}
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