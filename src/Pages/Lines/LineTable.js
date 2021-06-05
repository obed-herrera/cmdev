import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import {TextField, Button, FormControl, Grid,  MenuItem, Select, InputLabel, DialogContentText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import "./LineTable.css";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InsertLine from './InsertLine';
import DoubleArrow from '@material-ui/icons/DoubleArrow';

const columns = [
    {
        title: 'Codigo de la Linea',
        field: 'id_credi_line_action'
    },
    {
        title: 'Cliente',
        field: 'id_credi_client'
    },
    {
        title: 'Producto',
        field: 'id_credi_item'
    },
    {
        title: 'Cantidad',
        field: 'id_credi_item'
    },
    {
        title: 'Total',
        field: 'id_credi_line_action_total'
    }
];

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const baseUrl = "http://localhost:3001/Line/lineaction";

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 1000,
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      margin: 'auto',

      overflowY: 'auto'
    },
    iconos:{
        cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    },
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


export default function LineTable(){
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [dataLine, setDataLine] = useState([]);
    const [clientSeleccionado, setClientSeleccionado]=useState({ 
        id:"",  
        first_name:"",
        mid_name:"",
        last_name:"",
        secondary_last_name:"",
        national_id:"",
        sys_code:"",
        phone:"",
        status_id:"",
        created_at:new Date(),
        modified_at: new Date(),
        disabled_at: new Date()
    });

    const [line, setLine]=useState({
      id_credi_line_action: '',
      id_credi_client: '',
      id_credi_item:'',
      id_credi_line:'',
      quantity:'',
      credi_line_term:'',
      credi_line_payment_freq:''
    });

    const [state, setState] = useState([]);

    const handleChange=e=>{
      setClientSeleccionado((clientSeleccionado)=>({
        ...clientSeleccionado,
        [e.target.name]: e.target.value
      }))
      console.log(clientSeleccionado);
    }

    const handleChangeLine=e=>{
      setLine((line)=>({
        ...line,
        [e.target.name]: e.target.value
      }))
      console.log(line);
    }
     
    
      const classes = useStyles();

      const handleClose = () => {
        setDialogOpen(false);
        setDialogOpenAdd(false);
      };

    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
         setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
    }

      const peticionPut=async()=>{
        await axios.put(baseUrl+"/"+clientSeleccionado.id, clientSeleccionado)
        .then(response=>{
          var dataNueva= data;
          dataNueva.map(client=>{
            if(client.id===clientSeleccionado.id){
              client.first_name=clientSeleccionado.first_name;
              client.second_name=clientSeleccionado.second_name;
              client.last_name=clientSeleccionado.last_name;
              client.secondary_last_name=clientSeleccionado.secondary_last_name;
              client.national_id=clientSeleccionado.national_id;
              client.sys_code=clientSeleccionado.sys_code;
              client.phone=clientSeleccionado.phone;
              client.status_id=clientSeleccionado.status_id;
            }
          });
          setData(dataNueva);
          handleClose();
        }).catch(error=>{
          console.log(error);
        })
      }

      const peticionDelete = async()=>{
        await axios.delete(baseUrl+"/"+clientSeleccionado.id)
        .then(response=>{
          setClientSeleccionado(data.filter(client=>client.id!==clientSeleccionado.id));
        })
      }



    const seleccionarCliente=(clientSeleccionado, caso)=>{
        setClientSeleccionado(clientSeleccionado);
        (caso==="Editar")?abrirCerrarModalEditar()
        :
        abrirCerrarModalEliminar()
      }

         
      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
    
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }


      useEffect(()=>{
        peticionGet();
      }, [])

    return(
        <div className = "Table">
            <br/>
            <InsertLine
            edge = "end"
            onSave = {()=>{
              setSnackOpen("Cliente Agregado")
            }}
            render = {(open) => (
              <Button variant = "outlined" color = "primary" edge = "end" onClick = {open}>
                Insertar nueva actividad de linea
              </Button>
            )}
          />
            <br/><br/>
            <MaterialTable
                icons = {tableIcons}
                columns = {columns}
                data = {data}
                title = "Lineas"
                actions={[
                    {
                        icon: EditIcon,
                        tooltip: 'Editar Linea',
                        onClick: (event, rowData)=>{
                          setDialogOpen(true)
                        }
                    },
                    {
                      icon: DeleteIcon,
                      tooltip: 'Eliminar Linea',
                      onClick: (event, rowData) => seleccionarCliente(rowData, "Eliminar")
                    },
                    {
                      icon: DoubleArrow,
                      tooltip: 'Agregar pago',
                      onClick: (event, rowData) => {
                          setDialogOpenAdd(true)
                      },
                  }
                ]}
                options={{
                  actionsColumnIndex: -1,
                  selection: true
              }}
              localization={{
                  header:{
                      actions: "Acciones"
                  },
                  toolbar:{
                      nRowsSelected: "{0} fila(s) seleccionada",
                      searchTooltip: "Buscar",
                      searchPlaceholder: "Buscar"
                  }
              }}
            />
            <Dialog contentClassName = "custom-modal-style-line"
              open={dialogOpen}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
              maxWidth = "xl"
            >
              <DialogTitle id="form-dialog-title">
                {"Agregar"} Linea{" "}
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
                                  onChange={handleChangeLine}
                              />
                              <div>
                              <FormControl variant = "outlined" className = {classes.formControl}>
                                  <InputLabel id = "id_credi_client">Clientes</InputLabel>
                              <Select
                                      labelId = "id_credi_client"
                                      id = "id_credi_client"
                                      name = "id_credi_client"
                                      value = {line.id_credi_client}
                                      onChange = {handleChangeLine}
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
                                      onChange = {handleChangeLine}
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
                                    onChange = {handleChangeLine}
                                  />
                                  </div>
                              <TextField
                                  autoFocus
                                  margin="dense"
                                  name="quantity"
                                  label="Cantidad"
                                  fullWidth
                                  onChange={handleChangeLine}
                              />
                              <FormControl variant = "outlined" className = {classes.formControl}>
                                  <InputLabel id = "credi_line_term">Plazo</InputLabel>
                                  <Select
                                      labelId = "credi_line_term"
                                      id = "credi_line_term"
                                      name = "credi_line_term"
                                      value = {line.credi_line_term}
                                      onChange = {handleChangeLine}
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
                                      onChange = {handleChangeLine}
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
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                {<Button onClick={handleClose} color="primary">
                  Guardar
              </Button>}
              </DialogActions>
            </Dialog>
            <Dialog
            open = {dialogOpenDelete}
            onClose = {handleClose}>
              <DialogTitle id = "alert-dialog-title">{"¿Desea eliminar este producto?"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  La accion que esta a punto de realizar es irreversible, en realidad desea eliminar el registro?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Aceptar
                </Button>
                {<Button onClick={handleClose} color="primary">
                  Cancelar
              </Button>}
              </DialogActions>
            </Dialog>
        </div>
    );
}