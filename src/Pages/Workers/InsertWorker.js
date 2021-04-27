import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, update } from "./WorkersSlice";
import { useDispatch } from "react-redux";
import { nextID } from "./WorkersSlice";
import { Divider, FormControl, FormHelperText, Grid, NativeSelect } from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";

export default function InsertWorker({ data, render, onSave }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const defaultImg = data && data.img;
  // Existing ID or random ID
  const id = data && data.id;

  const [img, setImg] = React.useState(defaultImg);

  const handleClickOpen = () => {
    setOpen(true);
    setImg(defaultImg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const action = data ? update : add;
    dispatch(action({ worker, id: id || nextID(), img }));
    onSave && onSave();
    handleClose();
  };

  const [worker, setWorker]=useState({
    credi_worker_code: '',
    worker_first_name:'',
    worker_second_name:'',
    worker_middle_name:'',
    worker_last_name:'',
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setWorker((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(worker);
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
          {data ? "Editar" : "Agregar"} Trabajador{" "}
        </DialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="worker_first_name"
                            label="Primer Nombre"
                            fullWidth
                            value={worker.worker_first_name}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="worker_second_name"
                            label="Segundo Nombre"
                            fullWidth
                            value={worker.worker_second_name}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="worker_middle_name"
                            label="Primer Apellido"
                            fullWidth
                            value={worker.worker_middle_name}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="worker_last_name"
                            label="Segundo Apellido"
                            fullWidth
                            value={worker.worker_last_name}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        />
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "worker_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                <TextField
                            autoFocus
                            margin="dense"
                            id="client_national_id"
                            label="Cedula del workere"
                            fullWidth
                            value={worker.worker_national_id}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="worker_sys_code"
                            label="Codigo del workere"
                            fullWidth
                            value={worker.worker_sys_code}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="worker_home_address"
                            label="Direccion de Casa"
                            fullWidth
                            value={worker.worker_home_address}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="worker_business_address"
                            label="Direccion del Trabajo"
                            fullWidth
                            value={worker.worker_business_address}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        />                                  
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <TextField
                            autoFocus
                            margin="dense"
                            id="worker_phone"
                            label="Telefono del Trabajo"
                            fullWidth
                            value={worker.worker_phone}
                            onChange={(e) => {
                            setWorker(e.target.value);
                            }}
                        /> 
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={worker.worker_state}
                        name="worker_state"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'worker_state' }}
                      >
                        <option value="" disabled>
                          Estado del workere
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
                              value={state.worker_Line}
                              name="worker_line"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'worker_line' }}
                            >
                              <option value="" disabled>
                                Linea del workere
                              </option>
                              {lines.map((value)=>(
                                <option value = {value.worker_line} key = {value.id_credi_worker_line}>
                                  {value.worker_line}
                                </option>
                              ))}
                              
                            </NativeSelect>
                            <FormHelperText>Linea del workere</FormHelperText>
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