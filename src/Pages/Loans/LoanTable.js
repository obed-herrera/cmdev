import React, { useState } from 'react';
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import "./LoanTable.css";
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
import DoubleArrow from '@material-ui/icons/DoubleArrow';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import InsertLoans from './InsertLoans';
import { TimelineOppositeContent } from '@material-ui/lab';
import InsertClient from '../Clients/InsertClient';
import InsertPayment from '../Loans/InsertPayment';
import { useDispatch } from 'react-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const columns = [
    {
        title: 'Codigo del Prestamo',
        field: 'loan_code'
    },
    {
        title: 'Cliente',
        field: 'client'
    },
    {
        title: 'Monto Prestado',
        field: 'mount'
    },
    {
        title: 'Interes',
        field: 'interest'
    },
    {
        title: 'Deuda Total',
        field: 'total'
    },
    {
        title: 'Plazo',
        field: 'term'
    },
    {
        title: 'Frecuencia',
        field: 'freq'
    },
    {
        title: 'Area del Prestamo',
        field: 'area'
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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    DoubleArrow: forwardRef((props, ref) => <DoubleArrow {...props} ref={ref} />)
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
      },
      formControl: {
        margin: theme.spacing(1),
        alignItems: 'right',
        minWidth:150,
        },
        formControl2: {
        margin: theme.spacing(1),
        alignItems: 'right',
        minWidth:150,
    },
    selectEmpty:{
        marginTop: theme.spacing(2),
    },
}));


export default function LoanTable(render, onSave){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const [state, setState] = useState([]);
    const [dialogOpenAdd, setDialogOpenAdd] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        id_credi_payment:'',
        credi_payment_mount:''
    });
    const [loan, setLoan]=useState({
        id_credi_loan:'',
        credi_loan_code:'',
        credi_loan_client:'',
        credi_loan_term:'',
        credi_loan_payment:'',
        credi_loan_mount:'',
        credi_loan_interest:'',
        credi_loan_prep_date: new Date(),
        credi_loan_initial_date: new Date(),
        credi_loan_final_date: new Date(),
        credi_loan_money_type:'',
        credi_loan_sector:'',
    });

    const classes = useStyles();

    const handleClose = () => {
        setDialogOpenAdd(false);
        setOpenDialog(false);
    };

    const handleSave = () => {
        const action = data;
        dispatch(action({user: user}));
        onSave && onSave();
        handleClose();
    }

    const handleChange=e=>{
        const {name, value}=e.target;
        setLoan((prevState)=>({
          ...prevState,
          [name]: value
        }))
        console.log(loan);
      }

    return(
        <div className = "Table">
            <br/>
            <InsertLoans
                edge = "end"
                onSave = {()=>{
                    setSnackOpen("Prestamo agregado")
                }}
                render = {(open)=>(
                    <Button variant = "outlined" color = "primary" edge = "end" onClick = {open}>
                        Insertar nuevo prestamo
                    </Button>
                )}
            />
            <br/><br/>
            <MaterialTable
                icons = {tableIcons}
                columns = {columns}
                data = {data}
                title = "Prestamos"
                actions = {[
                    {
                        icon: EditIcon,
                        tooltip: 'Editar Prestamo',
                        onClick: (event, rowData) => {
                            setOpenDialog(true)
                        }  
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
            <Dialog open = {dialogOpenAdd} onClose = {handleClose}>
                <DialogTitle id = "form-dialog-title">
                    {"Agregar"} Pago {" "}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin = "dense"
                        id = "credi_payment_mount"
                        label = "Codigo del Prestamo"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin = "dense"
                        id = "credi_payment_mount"
                        label = "Cliente del Prestamo"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin = "dense"
                        id = "credi_payment_mount"
                        label = "Abono del Prestamo"
                        fullWidth
                    />
                    <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant = "inline"
                      format = "MM/dd/yyyy"
                      margin = "dense"
                      id = "fecha_entrega"
                      label = "Fecha de Abono"
                      KeyboardButtonProps = {{'aria-label':'change date',}}
                    />
                    </MuiPickersUtilsProvider>
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
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                {"Editar"} Prestamo{" "}
                </DialogTitle>
                <DialogContent alignItems = 'center'>
                <Grid container md = 'auto' position = 'center' style = {{padding:20}} item lg = {4} alignItems = 'stretch'>
                        <TextField
                        autoFocus
                        name = "loan_code"
                        margin = "dense"
                        label = "Codigo del Prestamo"
                        fullWidth
                        />
                </Grid>
                    <Grid container lg = 'auto' direction = 'columns' spacing = {2} style = {{padding:10}} alignItems = 'stretch'>
                    <Grid item lg = {4}>
                        <div className = "form-group">
                        <TextField
                            autoFocus
                            name = "loan_code"
                            margin = "dense"
                            label = "Cliente"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            name = "loan_code"
                            margin = "dense"
                            label = "Monto a Prestar"
                            fullWidth
                        /> 
                        <FormControl variant = "outlined" className = {classes.formControl}>
                            <InputLabel id = "money_type">Tipo de Moneda</InputLabel>
                            <Select
                            labelId = "money_type"
                            id = "money_type"
                            name = "money_type"
                            label = "Tipo de Moneda"
                            margin = "dense"
                            >
                            <MenuItem value = {"0"}>Cordoba</MenuItem>
                            <MenuItem value = {"35.50"}>Dolar</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <FormControl variant = "outlined" className = {classes.formControl}>
                            <InputLabel id = "loan_term">Plazo</InputLabel>
                            <Select
                            labelId = "loan_term"
                            id = "loan_term"
                            name = "loan_term"
                            label = "Plazo"
                            margin = "dense"
                            value = {loan.loan_payment_term}
                            onChange = {handleChange}
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
                        
                        </div>
                        </Grid> 
                        <Grid item lg = {4}>
                        <TextField
                            autoFocus
                            name = "interest"
                            margin = "dense"
                            label = "Interes"
                            fullWidth
                            /> 
                        <FormControl variant = "outlined" className = {classes.formControl2}>
                            <InputLabel id = "loan_payment_freq">Frequencia</InputLabel>
                            <Select
                            labelId = "loan_payment_freq"
                            id = "loan_payment_freq"
                            name = "loan_payment_freq"
                            value = {loan.loan_payment_freq}
                            onChange = {handleChange}
                            label = "Frequencia"
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
                            
                            <FormControl variant = "outlined" className = {classes.formControl2}>
                            <InputLabel id = "area">Area</InputLabel>
                            <Select
                                labelId = "area"
                                id = "area"
                                name = "area"
                                label = "Area"
                                margin = "dense"
                            >
                                <MenuItem value = {"Huembes"}>Huembes</MenuItem>
                                <MenuItem value = {"Oriental"}>Oriental</MenuItem>
                                <MenuItem value = {"Pulperias"}>Pulperias</MenuItem>
                                <MenuItem value = {"Empresas"}>Empresas</MenuItem>
                            </Select>
                            </FormControl>  
                        </Grid>
                        <Grid item lg = {4}>
                        <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant = "inline"
                            format = "MM/dd/yyyy"
                            margin = "dense"
                            id = "fecha_entrega"
                            label = "Fecha de Entrega"
                            KeyboardButtonProps = {{'aria-label':'change date',}}
                            />
                            <KeyboardDatePicker
                            disableToolbar
                            variant = "inline"
                            format = "MM/dd/yyyy"
                            margin = "dense"
                            id = "fecha_inicio"
                            label = "Fecha de Inicio"
                            KeyboardButtonProps = {{'aria-label':'change date',}}
                            />
                            <KeyboardDatePicker
                            disableToolbar
                            variant = "inline"
                            format = "MM/dd/yyyy"
                            margin = "dense"
                            id = "fecha_final"
                            label = "Fecha de Finalizacion"
                            KeyboardButtonProps = {{'aria-label':'change date',}}
                            />
                        </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid item lg ={4}>
                    <TextField
                        label = "Cuota"
                        fullWidth
                        autoFocus
                    />
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                {<Button onClick={handleSave} color="primary">
                    Guardar
                </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}