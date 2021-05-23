import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import {TextField, Button, FormControl, NativeSelect, FormHelperText, Grid, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import "./ExpensesTable.css";
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
import InsertExpenses from './InsertExpenses';

const columns = [
    {
        title: 'Beneficiario',
        field: 'expenses_ben'
    },
    {
        title: 'Concepto',
        field: 'expenses_concept'
    },
    {
        title: 'Fecha',
        field: 'expenses_date'
    },
    {
        title: 'Monto',
        field: 'expenses_mount'
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

const baseUrl = "http://localhost:3001/Expenses/expenses";

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


export default function ExpensesTable(){
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [expensesSeleccionado, setExpensesSeleccionado]=useState({ 
        credi_expenses_id:"",
        expenses_ben:"",
        expenses_concept:"",
        expenses_date: new Date(),
        expenses_mount:"",
        expenses_status:""
    })

    const [state, setState] = useState([]);

    const handleChange=e=>{
      setExpensesSeleccionado((expensesSeleccionado)=>({
        ...expensesSeleccionado,
        [e.target.name]: e.target.value
      }))
      console.log(expensesSeleccionado);
    }

     
    
      const classes = useStyles();

      const handleClose = () => {
        setState({dialogOpen: false});
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
        await axios.put(baseUrl+"/"+expensesSeleccionado.expenses_id, expensesSeleccionado)
        .then(response=>{
          var dataNueva= data;
          dataNueva.map(expenses=>{
            if(expenses.id===expensesSeleccionado.expenses_id){
              expenses.expenses_ben=expensesSeleccionado.expenses_ben;
              expenses.expenses_concept=expensesSeleccionado.expenses_concept;
              expenses.expenses_date=expensesSeleccionado.expenses_date;
              expenses.expenses_mount=expensesSeleccionado.expenses_mount;
            }
          });
          setData(dataNueva);
          handleClose();
        }).catch(error=>{
          console.log(error);
        })
      }

      const peticionDelete = async()=>{
        await axios.delete(baseUrl+"/"+expensesSeleccionado.expenses_id)
        .then(response=>{
          setExpensesSeleccionado(data.filter(expenses=>expenses.expenses_id!==expensesSeleccionado.expenses_id));
        })
      }



    const seleccionarExpenses=(expensesSeleccionado, caso)=>{
        setExpensesSeleccionado(expensesSeleccionado);
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
            <InsertExpenses
            edge = "end"
            onSave = {()=>{
              setSnackOpen("Gasto Agregado")
            }}
            render = {(open) => (
              <Button variant = "outlined" color = "primary" edge = "end" onClick = {open}>
                Insertar gasto
              </Button>
            )}
          />
            <br/><br/>
            <MaterialTable
                icons = {tableIcons}
                columns = {columns}
                data = {data}
                title = "Gastos"
                actions={[
                    {
                        icon: EditIcon,
                        tooltip: 'Editar Gasto',
                        onClick: rowData => {
                          setState({dialogOpen:true});
                        }
                    },
                    {
                      icon: DeleteIcon,
                      tooltip: 'Eliminar Gasto',
                      onClick: (event, rowData) => seleccionarExpenses(rowData, "Eliminar")
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
           <Dialog
              open= {state.openDialog}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                {data ? "Editar" : "Agregar"} Gasto{" "}
              </DialogTitle>
              <Divider/>
              <DialogContent>
              <Grid container lg = 'auto' spacing = {2} style = {{padding:20}}>
                      <Grid item lg ={4}>
                          {/*<div className = "form-group">
                              <TextField
                                  autoFocus
                                  margin="dense"
                                  name="expenses_ben"
                                  label="Beneficiario"
                                  fullWidth
                                  onChange={handleChange}
                                  value = {expensesSeleccionado && expensesSeleccionado.expenses_ben}
                              />
                              <TextField
                                  autoFocus
                                  margin="dense"
                                  name="expenses_concept"
                                  label="Concepto"
                                  fullWidth
                                  onChange={handleChange}
                                  value = {clientSeleccionado && clientSeleccionado.mid_name}
                              />
                              <TextField
                                  autoFocus
                                  margin="dense"
                                  name="last_name"
                                  label="Primer Apellido"
                                  fullWidth
                                  onChange={handleChange}
                                  value = {clientSeleccionado && clientSeleccionado.last_name}
                              />
                              <TextField
                                  autoFocus
                                  margin="dense"
                                  name="secondary_last_name"
                                  label="Segundo Apellido"
                                  fullWidth
                                  onChange={handleChange}
                                  value = {clientSeleccionado && clientSeleccionado.secondary_last_name}
                              />
                              {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>}
            </div>*/}
                      </Grid>
                      {/*<Grid item lg ={4}> 
                      <TextField
                                  autoFocus
                                  margin="dense"
                                  name="national_id"
                                  label="Cedula del Cliente"
                                  fullWidth
                                  onChange={handleChange}
                                  value = {clientSeleccionado && clientSeleccionado.national_id}
                              />
                              <TextField
                                  autoFocus
                                  margin="dense"
                                  name="sys_code"
                                  label="Codigo del Cliente"
                                  fullWidth
                                  onChange={handleChange}
                                  value = {clientSeleccionado && clientSeleccionado.sys_code}
                              />
                              <TextField
                                  autoFocus
                                  margin="dense"
                                  name="phone"
                                  label="Telefono del Trabajo"
                                  fullWidth
                                  onChange={handleChange}
                                  value = {clientSeleccionado && clientSeleccionado.phone}
                              /> 
                          <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}     
                              name="status_id"
                              onChange={handleChange}
                              value = {clientSeleccionado && clientSeleccionado.status_id}
                              inputProps={{ 'aria-label': 'status_id' }}
                            >
                              <option value="" disabled>
                                Estado del Cliente
                              </option>
                              <option value={'0'}>Activo</option>
                              <option value={'1'}>Inactivo</option>
                            </NativeSelect>
                            <FormHelperText>Estado del Trabajador</FormHelperText>
                          </FormControl>                                
        </Grid>*/}
                  </Grid>
              </DialogContent>
              <Divider/>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                {<Button onClick={peticionPut} color="primary">
                  Guardar
              </Button>}
              </DialogActions>
            </Dialog> 
           {/*<Dialog>
                <div>
                  <p>Estas seguro que deseas eliminar al Cliente <b>{clientSeleccionado && clientSeleccionado.client}</b>?</p>
                  <div align = "right">
                    <Button color = "secondary" onClick = {()=>peticionDelete()}>SI</Button>
                    <Button onClick = {handleClose}>NO</Button>
                  </div>
                </div>
           </Dialog>*/} 
        </div>
    );
}