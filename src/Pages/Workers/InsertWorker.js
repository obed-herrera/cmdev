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

  const [user, setUser]=useState({
    id: '',
    username:'',
    password:''
  });

  const [worker, setWorker] = useState({
    id:'',
    user_id:'',
    first_name:'',
    mid_name:'',
    last_name:'',
    secondary_last_name:'',
    national_id:'',
    email:'',
    phone:'',
    created_at: new Date(),
    modified_at: new Date(),
    disabled_at: new Date()
  })

  const [user_address, setUserAddress] = useState({
    id:'',
    user_id:'',
    status_id:'',
    personal_reference:'',
    created_at: new Date(),
    modified_at: new Date(),
    disabled_at: new Date()
  });

  const [user_permissions, setUserPermissions] = useState({
    id:'',
    name:'',
    description:''
  });

  const handleChange=e=>{
    setUser((user)=>({
      ...user,
      [e.target.name]: e.target.value
    }))
    console.log(user);
  }

  const handleChangeWorker = e => {
    setWorker((worker) => ({
      ...worker,
      [e.target.name]: e.target.value
    }))
    console.log(worker);
  }

  const handleChangeAddress = e => {
    setUserAddress((user_address) => ({
      ...user_address,
      [e.target.name]: e.target.value
    }))
    console.log(user_address);
  }

  const classes = useStyles();

  return (
    <>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth = "md"
      >
        <DialogTitle id="form-dialog-title">
          {data ? "Editar" : "Agregar"} Trabajador{" "}
        </DialogTitle>
        <Divider/>
        <DialogContent>
          <Grid container width = '100%' spacing = {4} zeroMinWidth>
                  <Grid item lg ={3} spacing = {2}>
                    <div className = "form-group">
                        <TextField
                            autoFocus
                            margin="dense"
                            name="username"
                            label="Usuario"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="password"
                            label="Contraseña"
                            fullWidth
                            onChange={handleChange}
                        />
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "worker_first_name" onChange = {handleChange}/>*/}
                    </div>
                  
                  </Grid>
                  <Grid item lg ={3}>
                    <div className = "form-group">
                        <TextField
                            autoFocus
                            margin="dense"
                            name="first_name"
                            label="Primer Nombre"
                            fullWidth
                            onChange={handleChangeWorker}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="mid_name"
                            label="Segundo Nombre"
                            fullWidth
                            onChange={handleChangeWorker}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="last_name"
                            label="Primer Apellido"
                            fullWidth
                            onChange={handleChangeWorker}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="secondary_last_name"
                            label="Segundo Apellido"
                            fullWidth
                            onChange={handleChangeWorker}
                        />
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "worker_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                
                <Grid item lg ={3}> 
                        <TextField
                            autoFocus
                            margin="dense"
                            name="national_id"
                            label="Cedula del trabajador"
                            fullWidth
                            onChange={handleChangeWorker}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="user_id"
                            label="Codigo del trabajador"
                            fullWidth
                            onChange={handleChangeWorker}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="personal_reference"
                            label="Direccion de Casa"
                            fullWidth
                            onChange={handleChangeAddress}
                        />                                                      
                </Grid>
                <Grid item lg = {3}>
                  <div className = "form-group">
                  <TextField
                            autoFocus
                            margin="dense"
                            name="phone"
                            label="Telefono"
                            fullWidth
                            onChange={handleChangeWorker}
                        /> 
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={worker.worker_role}
                        name="worker_role"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'worker_role' }}
                      >
                        <option value="" disabled>
                          Rol del trabajador
                        </option>
                        <option value={'Activo'}>Administrador</option>
                        <option value={'Inactivo'}>Supervisor</option>
                        <option value={'Inactivo'}>Cobrador</option>
                      </NativeSelect>
                      <FormHelperText>Rol del Trabajador</FormHelperText>
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