import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, update } from "./LinesSlice";
import { useDispatch } from "react-redux";
import { nextID } from "./LinesSlice";
import { FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, NativeSelect, Select } from "@material-ui/core";
import './InsertLine.css';
import AsyncSelect from 'react-select';
import axios from "axios";
import { AirlineSeatReclineNormalTwoTone } from "@material-ui/icons";
import { SelectFetch } from 'react-select-fetch';
import { AsyncPaginate } from "react-select-async-paginate";

const useStyles = makeStyles((theme)=>({
  formControl: {
      margin: theme.spacing(1),
      minWidth:120,
  },
  selectEmpty:{
      marginTop: theme.spacing(2),
  },
}));

/*const options = [
  {value: 'line_credi_client', label:'Obed'},
]*/

/*async function loadOptions(search, loadedOptions){
  const response = await fetch(`http://localhost:3001/Client/getClient/?search=${search}&offset=${loadedOptions.lenght}`);
  const responseJSON = await response.json();

  return{
    options: responseJSON.client,
    hasMore: responseJSON.has_more,
  };
}*/


export default function InsertLine({render}) {
  const lineAPI = "http://localhost:3001/Line/lineaction";
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [client, setClient] = useState({
    id:'',
    first_name:''
  });
  const [item, setItem] = useState([]);
  const classes = useStyles();

  /*const peticionGetClient = async()=>{
    await axios.get(clientAPI)
    .then(response=>{
      setClient(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    peticionGetClient();
  }, [])*/

  const data = useState([]);

  const peticionPost=async()=>{
    await axios.post(lineAPI, line)
    .then(response=>{
      setLine(data.concat(response.data));
      handleClose();
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
    setLine(line);
  };

  const handleChange=e=>{
    setLine((line)=>({
      ...line,
      [e.target.name]: e.target.value
    }))
    console.log(line);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [line, setLine]=useState({
    id_credi_line_action: '',
    id_credi_client: '',
    id_credi_item:'',
    quantity:'',
    credi_line_term:''
  });

  /*const handleChange=e=>{
    const {name, value}=e.target;
    setLine((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(line);
  }*/


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
                            name="credi_line_action"
                            label="Codigo de accion de linea"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="id_credi_client"
                            label="Cliente"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="id_credi_item"
                            label="Producto"
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="quantity"
                            label="Cantidad"
                            fullWidth
                            onChange={handleChange}
                        />
                        <FormControl variant = "outlined" className = {classes.formControl}>
                            <InputLabel id = "credi_line_term">Plazo</InputLabel>
                            <Select
                                labelId = "credi_line_term"
                                id = "credi_line_term"
                                name = "credi_line_term"
                                value = {line.credi_line_term}
                                onChange = {handleChange}
                                label = "Plazo"
                            >
                                <MenuItem value = "">
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value = {30}>1 Mes</MenuItem>
                                <MenuItem value = {60}>2 Meses</MenuItem>
                                <MenuItem value = {90}>3 Meses</MenuItem>
                                <MenuItem value = {120}>4 Meses</MenuItem>
                                <MenuItem value = {150}>5 Meses</MenuItem>
                                <MenuItem value = {180}>6 Meses</MenuItem>
                                <MenuItem value = {210}>7 Meses</MenuItem>
                                <MenuItem value = {240}>8 Meses</MenuItem>
                                <MenuItem value = {270}>9 Meses</MenuItem>
                                <MenuItem value = {300}>10 Meses</MenuItem>
                                <MenuItem value = {330}>11 Meses</MenuItem>
                                <MenuItem value = {360}>12 Meses</MenuItem>

                            </Select>
                        </FormControl>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
              </Grid>
        </DialogContent>
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