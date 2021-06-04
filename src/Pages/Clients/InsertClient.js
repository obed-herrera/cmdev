import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider, FormControl, FormHelperText, Grid, NativeSelect } from "@material-ui/core";
import {useStyles} from "./Clients";
import axios from "axios";
import {withStyles} from "@material-ui/core/styles";
import BackupIcon from '@material-ui/icons/Backup';
import "./ClientTable.css";

const styles = theme =>({
  dialogCustomizeWidth:{
    'max-width':'80%'
  }
});


export default function InsertClient({render}) {
  const baseUrl = "http://localhost:3001/Client/clients";
  const [open, setOpen] = React.useState(false);
  const [clientSeleccionado, setClientSeleccionado]=useState({ 
    id:'',
    sys_code:'',
    first_name:'',
    mid_name:'',
    last_name:'',
    secondary_last_name:'',
    national_id:'',
    phone:'',
    status_id:'',
    created_at:'',
    modified_at:'',
    disabled_at:''
});
const [client_address, setClient_Address] = useState({
  id: '',
  client_id:'',
  status_id:'',
  personal_reference:'',
  created_at:'',
  modified_at:'',
  disabled_at:''
})

const peticionPost=async()=>{
  await axios.post(baseUrl, clientSeleccionado)
  .then(response=>{
    setClientSeleccionado(data.concat(response.data));
    handleClose();
  }).catch(error=>{
    console.log(error);
  })
}

const data = useState([]);

/*const peticionPost=async()=>{
  var f = new clientSeleccionado();
  f.append("first_name", clientSeleccionado.first_name);
  f.append("mid_name", clientSeleccionado.mid_name);
  f.append("last_name", clientSeleccionado.last_name);
  f.append("secondary_last_name", clientSeleccionado.secondary_last_name);
  f.append("national_id", clientSeleccionado.national_id);
  f.append("sys_code", clientSeleccionado.sys_code);
  f.append("phone", clientSeleccionado.phone);
  f.append("status_id", clientSeleccionado.status_id);
  await axios.post(baseUrl, f)
  .then(response=>{
    setClientSeleccionado(clientSeleccionado.concat(response.data));
    handleClose();
  }).catch(error=>{
    console.log(error);
  })
}  */
  // Existing ID or random ID


  const handleClickOpen = () => {
    setOpen(true);
    setClientSeleccionado(clientSeleccionado);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*const handleSave = () => {
    const action = data ? update : add;
    dispatch(action({ client: clientSeleccionado || nextID() }));
    onSave && onSave();
    handleClose();
  };*/

  /*const [client, setClient]=useState({
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
  });*/

  const handleChange=e=>{
    setClientSeleccionado((clientSeleccionado)=>({
      ...clientSeleccionado,
      [e.target.name]: e.target.value
    }))
    console.log(clientSeleccionado);
  }

  const classes = useStyles();

  return (
    <>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        minWidth = 'md'
        maxWidth = 'xs'
      >
        <DialogTitle id="form-dialog-title">
          {"Agregar"} Cliente{" "}
        </DialogTitle>
        <Divider/>
        <DialogContent alignItems = 'center'>
        <Grid container md = 'auto'  position = 'center' style = {{padding:20}} item lg = {6}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="sys_code"
                  label="Codigo del Cliente"
                  fullWidth
                  onChange={handleChange}
                />
                </Grid>
        <Grid container lg = 'md' direction = 'columns' spacing = {2} style = {{padding:20}} alignItems = 'stretch'>   
                <Grid item lg ={6}>
                    <div className = "form-group">
                        <TextField
                            autoFocus
                            margin="dense"
                            name="first_name"
                            label="Primer Nombre"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="mid_name"
                            label="Segundo Nombre"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="last_name"
                            label="Primer Apellido"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="secondary_last_name"
                            label="Segundo Apellido"
                            fullWidth
                            onChange={handleChange}
                        />
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item lg ={6}> 
                <TextField
                  autoFocus
                  margin="dense"
                  name="national_id"
                  label="Cedula del Cliente"
                  fullWidth
                  onChange={handleChange}
                />  
                <TextField
                  autoFocus
                  margin="dense"
                  name="phone"
                  label="Telefono del Cliente"
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  name="personal_reference"
                  label="Dirección del Cliente"
                  fullWidth
                  onChange={handleChange}
                />                               
                </Grid>
            </Grid>
        </DialogContent>
        {/*<Divider/>
        <input  align = "center" type = "file" name = "client_file" class = "client_file" multiple onChange = {()=>handleChange}/>
        <br/><br/>
        <Button color = "secondary">Insertar Archivos</Button>*/}
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