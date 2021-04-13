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
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, NativeSelect, Select } from "@material-ui/core";


const useStyles = makeStyles((theme)=>({
    formControl: {
        margin: theme.spacing(1),
        minWidth:120,
    },
    selectEmpty:{
        marginTop: theme.spacing(2),
    },
}));

export default function InsertLine({ data, render, onSave }) {
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

const classes = useStyles();

  const handleChange=e=>{
    const {name, value}=e.target;
    setLoan((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(loan);
  }

  const [state, setState] = React.useState({
    client_line: '',
  });


  return (
    <>
      {render(handleClickOpen)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {data ? "Editar" : "Agragar"} Prestamo{" "}
        </DialogTitle>
        <DialogContent>
        <Grid container spacing = {2} style = {{padding:20}}>
                <Grid item xs ={4}>
                    <div className = "form-group">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="credi_loan_code"
                            label="Codigo del Prestamo"
                            fullWidth
                            value={loan.credi_loan_code}
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="credi_loan_mount"
                            label="Monto del Prestamo"
                            fullWidth
                            value={loan.credi_loan_mount}
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="credi_loan_interest"
                            label="Interes"
                            fullWidth
                            value={loan.credi_loan_interest}
                            onChange={(e) => {
                            setName(e.target.value);
                            }}
                        />
                        <FormControl variant = "outlined" className = {classes.formControl}>
                            <InputLabel id = "credi_loan_term">Plazo</InputLabel>
                            <Select
                                labelId = "credi_loan_term"
                                id = "credi_loan_term"
                                value = {credi_loan_term}
                                onChange = {handleChangeTerm}
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

                            </Select>
                        </FormControl>
                        {/*<input placeholder= " " type = "text" className = "form-control" name = "client_first_name" onChange = {handleChange}/>*/}
                    </div>
                </Grid>
                <Grid item xs ={4}> 
                    <div className = "form-group">
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_national_id" onChange = {handleChange}/>
                            <span>Cedula del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_sys_code" onChange = {handleChange}/>
                            <span>Codigo del Cliente</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_home_address" onChange = {handleChange}/>
                            <span>Direccion de casa</span> 
                        </label>
                        <br/>
                        <label class = "pure-material-textfield-outlined">
                            <input placeholder= " " type = "text" className = "form-control" name = "client_business_address" onChange = {handleChange}/>
                            <span>Direccion de negocio</span> 
                        </label>
                        <br/>
                    </div>                                    
                </Grid>
                <Grid item xs = {4}>
                  <div className = "form-group">
                  <label class = "pure-material-textfield-outlined">
                      <input placeholder= " " type = "text" className = "form-control" name = "client_phone" onChange = {handleChange}/>
                      <span>Telefono del Cliente</span> 
                    </label>
                    <br/>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        className={classes.selectEmpty}
                        value={state.client_state}
                        name="client_state"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'client_state' }}
                      >
                        <option value="" disabled>
                          Estado del Cliente
                        </option>
                        <option value={'Activo'}>Activo</option>
                        <option value={'Inactivo'}>Inactivo</option>
                      </NativeSelect>
                      <FormHelperText>Estado del Trabajador</FormHelperText>
                    </FormControl>
                     {/* <div className = "form-group">
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={state.client_Line}
                              name="client_line"
                              onChange={handleChange}
                              inputProps={{ 'aria-label': 'client_line' }}
                            >
                              <option value="" disabled>
                                Linea del Cliente
                              </option>
                              {lines.map((value)=>(
                                <option value = {value.client_line} key = {value.id_credi_client_line}>
                                  {value.client_line}
                                </option>
                              ))}
                              
                            </NativeSelect>
                            <FormHelperText>Linea del Cliente</FormHelperText>
                          </FormControl>
                              </div>*/}
                  </div>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {<Button onClick={handleSave} color="primary">
            Save
        </Button>}
        </DialogActions>
      </Dialog>
    </>
  );
}