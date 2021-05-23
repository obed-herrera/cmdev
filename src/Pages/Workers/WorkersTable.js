import React, { useState } from 'react';
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import "./WorkerTable.css";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, Grid, makeStyles, NativeSelect, TextField } from '@material-ui/core';
import InsertWorker from './InsertWorker';

const columns = [
    {
        title: 'Codigo del Trabajador',
        field: 'worker_code'
    },
    {
        title: 'Primer Nombre',
        field: 'client'
    },
    {
        title: 'Segundo Nombre',
        field: 'mount'
    },
    {
        title: 'Cedula',
        field: 'interest'
    },
    {
        title: 'Direccion',
        field: 'total'
    },
    {
        title: 'Telefono',
        field: 'term'
    },
    {
        title: 'Rol',
        field: 'freq'
    }
];

const data = [
    {
        "loan_code": "2545-265",
        "client": "Obed Herrera",
        "mount": "C$ 2500",
        "interest": "6%",
        "total": "C$ 2650",
        "term": "2 Meses",
        "freq": "Semanal",
        "area":"Empresas"
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

const useStyles = makeStyles((theme)=>({
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

export default function WorkersTable(){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [state, setState] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [worker, setWorker]=useState({
        credi_worker_code: '',
        worker_username:'',
        worker_password:'',
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
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const classes = useStyles();
    return(
        <div className = "Table">
            <br/>
            <InsertWorker
                edge = "end"
                onSave = {()=>{
                    setSnackOpen("Prestamo agregado")
                }}
                render = {(open)=>(
                    <Button variant = "outlined" color = "primary" edge = "end" onClick = {open}>
                        Insertar nuevo trabajador
                    </Button>
                )}
            />
            <br/><br/>
            <MaterialTable
                icons = {tableIcons}
                columns = {columns}
                data = {data}
                title = "Trabajadores"
                actions = {[
                    {
                        icon: EditIcon,
                        tooltip: 'Editar Empleado',
                        onClick: (event, rowData)=>{
                          setDialogOpen(true)
                        }
                    },
                    {
                      icon: DeleteIcon,
                      tooltip: 'Eliminar Linea'
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
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
                options ={{
                    selection: true

                }}
            />
            <Dialog
                open={dialogOpen}
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
                                    id="worker_username"
                                    label="Usuario"
                                    fullWidth
                                    value={worker.worker_username}
                                    onChange={(e) => {
                                    setWorker(e.target.value);
                                    }}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="worker_password"
                                    label="Contraseña"
                                    fullWidth
                                    value={worker.password}
                                    onChange={(e) => {
                                    setWorker(e.target.value);
                                    }}
                                />
                                {/*<input placeholder= " " type = "text" className = "form-control" name = "worker_first_name" onChange = {handleChange}/>*/}
                            </div>
                        
                        </Grid>
                        <Grid item lg ={3}>
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
                        
                        <Grid item lg ={3}> 
                        <TextField
                                    autoFocus
                                    margin="dense"
                                    id="client_national_id"
                                    label="Cedula del trabajador"
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
                                    label="Codigo del trabajdor"
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
                        <Grid item lg = {3}>
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
                                Estado del trabajador
                                </option>
                                <option value={'Activo'}>Activo</option>
                                <option value={'Inactivo'}>Inactivo</option>
                            </NativeSelect>
                            <FormHelperText>Estado del Trabajador</FormHelperText>
                            </FormControl>
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
                {<Button onClick={handleClose} color="primary">
                    Guardar
                </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}