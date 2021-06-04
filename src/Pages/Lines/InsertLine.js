import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import { Divider, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, NativeSelect, Select} from "@material-ui/core";
import './InsertLine.css';
//import  Select from 'react-select';
import axios from "axios";
import AsyncSelect from 'react-select/async';
import FinderSelect from 'react-finderselect';
import 'react-finderselect/dist/index.css'

const useStyles = makeStyles((theme)=>({
  formControl: {
      margin: theme.spacing(1),
      minWidth:120,
  },
  formControl2:{
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty:{
      marginTop: theme.spacing(2),
  },
}));

export default function InsertLine({render}) {
  const lineAPI = "http://localhost:3001/Client/getClient";
  const itemAPI = "http://localhost:3001/Item/items";
  const clientAPI = "http://localhost:3001/Line/lines";

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const [dataLine, setDataLine] = useState([]);

  const peticionGetClient = async()=>{
    await axios.get(lineAPI)
    .then((response)=>{
      console.log(response)
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionGetLine = async()=>{
    await axios.get(clientAPI)
    .then((response)=>{
      console.log(response)
      setDataLine(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const loadOptions = (data) =>{
    setData(data);
  };

  /*const peticionGetItem = async()=>{
    await axios.get(itemAPI)
    .then((response)=>{
      console.log(response)
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }*/

  useEffect(()=>{
    peticionGetLine();
  }, [])

  useEffect(()=>{
    peticionGetClient();
  }, [])

  /*useEffect(()=>{
    peticionGetItem();
    return()=>{
      setData({});
    };
  }, [])*/

  //const data = useState([]);

  /*const handleInputChange = value => {
    setValue(value);
  };*/

  /*const peticionPost=async()=>{
    await axios.post(lineAPI, line)
    .then(response=>{
      setLine(data.concat(response.data));
      handleClose();
    }).catch(error=>{
      console.log(error);
    })
  }*/

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
    id_credi_line:'',
    quantity:'',
    credi_line_term:'',
    credi_line_payment_freq:''
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
          {"Agregar"} Accion de Linea{" "}
        </DialogTitle>
        <DialogContent>
        <Grid style = {{padding:20}} spacing = {2}>
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
                        <div>
                        <FormControl variant = "outlined" className = {classes.formControl}>
                            <InputLabel id = "id_credi_client">Clientes</InputLabel>
                        <Select
                                labelId = "id_credi_client"
                                id = "id_credi_client"
                                name = "id_credi_client"
                                value = {line.id_credi_client}
                                onChange = {handleChange}
                                label = "Cliente"
                            >
                               {data.map((client)=>{
                                 return(
                                   <MenuItem key = {client.id} value = {client.id}>
                                     {client.first_name}{' '}{client.last_name}
                                   </MenuItem>
                                 );
                               })}
                              </Select>
                              </FormControl>
                              <FormControl variant = "outlined" className = {classes.formControl}>
                            <InputLabel id = "id_credi_line">Linea</InputLabel>
                        <Select
                                labelId = "id_credi_line"
                                id = "id_credi_line"
                                name = "id_credi_line"
                                value = {line.id_credi_line}
                                onChange = {handleChange}
                                label = "Cliente"
                            >
                               {dataLine.map((line)=>{
                                 return(
                                   <MenuItem key = {line.id_credi_line} value = {line.id_credi_line}>
                                     {line.credi_line_name}
                                   </MenuItem>
                                 );
                               })}
                              </Select>
                              </FormControl>
                            </div>
                            <div>
                            
                            <TextField
                              autoFocus
                              margin = "dense"
                              name = "quantity"
                              label = "Cantidad"
                              fullWidth
                              onChange = {handleChange}
                            />
                            </div>
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
                                margin = "dense"
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
                        <FormControl variant = "outlined" className = {classes.formControl2}>
                            <InputLabel id = "credi_line_payment_freq">Frequencia de Pago</InputLabel>
                            <Select
                                labelId = "credi_line_payment_freq"
                                id = "credi_line_payment_freq"
                                name = "credi_line_payment_freq"
                                value = {line.credi_line_payment_freq}
                                onChange = {handleChange}
                                label = "Frequencia de Pago"
                            >
                                <MenuItem value = "">
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value = {30}>Diario</MenuItem>
                                <MenuItem value = {60}>Dia de por medio</MenuItem>
                                <MenuItem value = {90}>Semanal</MenuItem>
                                <MenuItem value = {120}>Quincenal</MenuItem>
                                <MenuItem value = {150}>Mensual</MenuItem>
                            </Select>
                        </FormControl>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
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
          {<Button onClick={handleClose} color="primary">
            Guardar
        </Button>}
        </DialogActions>
      </Dialog>
    </>
  );
}