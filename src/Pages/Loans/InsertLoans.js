import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, update } from "./LoansSlice";
import { useDispatch } from "react-redux";
import { nextID } from "./LoansSlice";
import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, NativeSelect, Select } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'date-fns';


const useStyles = makeStyles((theme)=>({
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

export default function InsertLoans({ data, render, onSave }) {
  const fetchData = () =>{
    const loanAPI = 'http://localhost/Loan/loans';
    const clientAPI = 'http://localhost/Client/clients';
  }
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const defaultImg = data && data.img;
  const defaultName = data && data.name;
  // Existing ID or random ID
  const id = data && data.id;

  const [img, setImg] = React.useState(defaultImg);
  const [name, setName] = React.useState(defaultName);

  const handleClickOpen = () => {
    setOpen(true);
    setName(defaultName);
    setImg(defaultImg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const action = data ? update : add;
    dispatch(action({ name, id: id || nextID(), img }));
    onSave && onSave();
    handleClose();
  };

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

const [credi_loan_term, setCredi_Loan_Term] = useState('');

const handleChangeTerm = (event) => {
    setCredi_Loan_Term(event.target.value);
};

const [selectedDate, setSelectedDate] = React.useState(new Date());

const classes = useStyles();

  const handleChange=e=>{
    const {name, value}=e.target;
    setLoan((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(loan);
  }

  const [state,] = React.useState({
    client_line: '',
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {"Agregar"} Prestamo{" "}
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
        {/*<Divider/>
              <input  align = "center" type = "file" name = "client_file" class = "client_file" multiple onChange = {()=>handleChange}/>
              <br/><br/>
        <Button color = "secondary">Insertar Archivos</Button>*/}
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