import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import {Modal, TextField, Button, FormControl, NativeSelect, FormHelperText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
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

const columns = [
    {
        title: 'Codigo del Cliente',
        field: 'sys_code'
    },
    {
        title: 'Primer Nombre',
        field: 'first_name'
    },
    {
        title: 'Primer Apellido',
        field: 'last_name'
    },
    {
        title: 'Cedula',
        field: 'national_id'
    },
    {
        title: 'Telefono',
        field: 'phone'
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

const baseUrl = "http://localhost:3001/clients";

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
        cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));


export default function ClientTable(){
    const styles= useStyles();
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [clientSeleccionado, setClientSeleccionado]=useState({ 
        first_name:"",
        mid_name:"",
        last_name:"",
        secondary_last_name:"",
        national_id:"",
        sys_code:"",
        phone:"",
        status_id:""
    })

    const handleChange=e=>{
        const {name, value}=e.target;
        setClientSeleccionado(prevState=>({
          ...prevState,
          [name]: value
        }));
      }

    const peticionGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
         setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

      const peticionPost=async()=>{
        var f = new data();
        f.append("first_name", clientSeleccionado.first_name);
        f.append("mid_name", clientSeleccionado.mid_name);
        f.append("last_name", clientSeleccionado.last_name);
        f.append("secondary_last_name", clientSeleccionado.secondary_last_name);
        f.append("national_id", clientSeleccionado.national_id);
        f.append("sys_code", clientSeleccionado.sys_code);
        f.append("phone", clientSeleccionado.phone);
        f.append("status_id", clientSeleccionado.status_id);
        await axios.post(baseUrl, f)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
      }  

    const seleccionarCliente=(credi_client, caso)=>{
        setClientSeleccionado(credi_client);
        (caso==="Editar")?abrirCerrarModalEditar()
        :
        abrirCerrarModalEliminar()
      }

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }

      const bodyInsertar=(
        <div className={styles.modal}>
          <h3>Agregar Nuevo Cliente</h3>
          <TextField className={styles.inputMaterial} label="Codigo del Cliente" name="sys_code" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Primer Nombre" name="first_name" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Segundo Nombre" name="mid_name" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Primer Apellido" name="last_name" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Segundo Apellido" name="secondary_last_name" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Cedula" name="national_id" onChange={handleChange}/>
          <br />
          <TextField className={styles.inputMaterial} label="Telefono/Celular" name="phone" onChange={handleChange}/>
          <br />
          <FormControl>
                <NativeSelect
                    value={data.status_id}
                    name="status_id"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'status_id' }}
                >
                    <option value="" disabled>
                        Estado del Cliente
                    </option>
                    <option value={'0'}>Activo</option>
                    <option value={'1'}>Inactivo</option>
                </NativeSelect>
                <FormHelperText>Estado del Cliente</FormHelperText>
            </FormControl>
          <div align="right">
            <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
          </div>
        </div>
      )
    
      
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
            <Button 
            variant = "outlined" color = "primary" edge = "end"
            onClick={()=>abrirCerrarModalInsertar()}>Insertar Cliente</Button>
            <br/><br/>
            <MaterialTable
                icons = {tableIcons}
                columns = {columns}
                data = {data}
                title = "Clientes"
                actions={[
                    {
                        icon: EditIcon,
                        tooltip: 'Editar Cliente',
                        onClick: (event, rowData)=>seleccionarCliente(rowData, "Editar")
                    },
                    {
                      icon: DeleteIcon,
                      tooltip: 'Eliminar Cliente',
                      onClick: (event, rowData) => seleccionarCliente(rowData, "Eliminar")
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                }}
                localization={{
                    header:{
                        actions: "Acciones"
                    }
                }}
            />
            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>
        </div>
    );
}