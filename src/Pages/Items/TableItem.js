import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import {TextField, Button, FormControl, NativeSelect, FormHelperText, Grid, Divider, DialogContentText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import "./TableItem.css";
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
import InsertItem from './InsertItem';

const columns = [
    {
        title: 'Codigo del Producto',
        field: 'credi_item_code'
    },
    {
        title: 'Nombre del Producto',
        field: 'credi_item_name'
    },
    {
        title: 'Descripcion del Producto',
        field: 'credi_item_description'
    },
    {
        title: 'Costo del Producto',
        field: 'credi_item_cost'
    },
    {
        title: 'Precio del Producto',
        field: 'credi_item_price'
    },
    {
        title: 'Cantidad',
        field: 'credi_item_quantity'
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

const baseUrl = "http://localhost:3001/Item/items";

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
    }
  }));


export default function TableItem(){
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [itemSeleccionado, setItemSeleccionado]=useState({ 
        id_credi_item:"",
        credi_item_name:"",
        credi_item_description: "",
        credi_item_cost: "",
        credi_item_price: "",
        credi_item_quantity:"",
        credi_item_state:""
    })

    const [state, setState] = useState([]);

    const handleChange=e=>{
      setItemSeleccionado((itemSeleccionado)=>({
        ...itemSeleccionado,
        [e.target.name]: e.target.value
      }))
      console.log(itemSeleccionado);
    }

    const classes = useStyles();

    const handleClose = () => {
      setState({dialogOpen: false});
      setState({dialogOpenDelete: false});
    };

    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
         setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

    const seleccionarItem=(itemSeleccionado, caso)=>{
        setItemSeleccionado(itemSeleccionado);
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
            <InsertItem
            edge = "end"
            onSave = {()=>{
              setSnackOpen("Producto agregado")
            }}
            render = {(open) => (
              <Button variant = "outlined" color = "primary" edge = "end" onClick = {open}>
                Insertar nuevo producto
              </Button>
            )}
          />
            <br/><br/>
            <MaterialTable
                icons = {tableIcons}
                columns = {columns}
                data = {data}
                title = "Productos"
                actions={[
                    {
                        icon: EditIcon,
                        tooltip: 'Editar Producto',
                        onClick: rowData => {
                          setState({dialogOpen:true});
                        }
                    },
                    {
                      icon: DeleteIcon,
                      tooltip: 'Eliminar Producto',
                      onClick: rowData => {
                        setState({dialogOpenDelete: true});
                      }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    selection: true
                }}
                localization={{
                    header:{
                        actions: "Acciones"
                    }
                }}
            />
           {<Dialog
              open={state.dialogOpen}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                {data ? "Editar" : "Agregar"} Producto{" "}
              </DialogTitle>
              <Divider/>
              <DialogContent>
              <Grid container lg = 'auto' spacing = {2} style = {{padding:20}}>
                      <Grid item lg ={4}>
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
                        </div>                                
                      </Grid>
                  </Grid>
              </DialogContent>
              <Divider/>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                {<Button onClick={handleClose} color="primary">
                  Guardar
              </Button>}
              </DialogActions>
            </Dialog> }
            <Dialog
            open = {state.dialogOpenDelete}
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