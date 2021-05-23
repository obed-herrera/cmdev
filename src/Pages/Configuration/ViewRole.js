import { Button, Dialog, DialogActions, DialogContent, Divider, FormControl, FormHelperText, NativeSelect, TextField } from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import { add, nextID, update } from "./UserSlice";
import { forwardRef } from 'react';
import { useStyles } from "@material-ui/pickers/views/Calendar/SlideTransition";
import MaterialTable from "material-table";
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
import { makeStyles } from '@material-ui/core';

const columns = [
    {
        title: 'Rol',
        field: 'role_name'
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

export default function ViewRole({data, render, onSave}){
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [state, setState] = useState([]);

    const handleClickOpen = () =>{
        setOpen(true);
        setUser(user);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const action = data ? update : add;
        dispatch(action({user: user || nextID()}));
        onSave && onSave();
        handleClose();
    }

    const [user, setUser] = useState({
        id_credi_role:'',
        role_name:'',
        role_state:''
    });

    const handleChange = e =>{
        const {name, value} = e.target;
        setUser((prevState)=>({
            ...prevState,
            [name]: value
        }))
        console.log(user);
    }

    const classes = useStyles();

    return(
        <div>
            {render(handleClickOpen)}
            <Dialog
                open = {open}
                onClose = {handleClose}
                aria-labelledby = "form-dialog-title"
            >
                <DialogTitle id = "form-dialog-title">
                    {"Roles actuales"} 
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    <MaterialTable
                        icons = {tableIcons}
                        columns = {columns}
                        data = {data}
                        title = ""
                        actions={[
                            {
                                icon: EditIcon,
                                tooltip: 'Editar Rol',
                                onClick: rowData => {
                                setState({dialogOpen:true});
                                }
                            },
                            {
                            icon: DeleteIcon,
                            tooltip: 'Eliminar Rol',
                            onClick: (event, rowData) => setUser(rowData, "Eliminar")
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
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button onClick = {handleClose} color = "primary">
                        Cancelar
                    </Button>
                    <Button onClick = {handleSave} color = "primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}