import {Button, CssBaseline, Grid, makeStyles, Paper, Snackbar, Typography } from "@material-ui/core";
import React from "react";
import Content from "../../Dashboard/Content";
import MuiAlert from "@material-ui/lab/Alert";
import InsertRole from "./InsertRole";
import InsertLine from "./InsertLine";
import InsertLoanArea from "./InsertLoanArea";
import ViewRole from "./ViewRole";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme)=>({
    root:{
        display: 'flex',
        flexWrap: 'wrap',
        '& > *':{
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    summaryCards: {
        display: "flex",
        flexWrap: "wrap",
      },
    summaryCard: {
        margin: theme.spacing(3),
        flexGrow: 1,
        padding: theme.spacing(6),
      },
      container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        position: 'sticky',
      },
      content: {
        flexGrow: 1,
        height: '200vh',
        overflow: 'auto',
      },
}));

function SummaryCard({title, value, component}){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const classes = useStyles();
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSnackOpen(false);
      };
    return(
        <Content>
            <Snackbar open = {snackOpen} autoHideDuration = {2000} onClose = {snackClose}>
                <Alert onClose = {snackClose} severity = "success">
                    {snackOpen}
                </Alert>
            </Snackbar>
            <Paper elevation = {6} className = {classes.summaryCard}>
                <Typography color = {"textSecondary"}>
                    {title}
                </Typography>
                {component || (
                    <Typography>
                        {value}
                    </Typography>
                )}
                <InsertRole
                    edge = "end"
                    onSave = {()=>{
                        setSnackOpen("Rol Agregado")
                    }}
                    render={(open)=>(
                        <Button variant = "outlined" edge = "end" onClick = {open}>
                        Crear Rol
                        </Button>
                    )}
                />   
            </Paper> 
        </Content>     
    );
}

function SummaryCardViewRole({title, value, component}){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const classes = useStyles();
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSnackOpen(false);
      };
    return(
        <Content>
            <Snackbar open = {snackOpen} autoHideDuration = {2000} onClose = {snackClose}>
                <Alert onClose = {snackClose} severity = "success">
                    {snackOpen}
                </Alert>
            </Snackbar>
            <Paper elevation = {6} className = {classes.summaryCard}>
                <Typography color = {"textSecondary"}>
                    {title}
                </Typography>
                {component || (
                    <Typography>
                        {value}
                    </Typography>
                )}
                <ViewRole
                    edge = "end"
                    onSave = {()=>{
                        setSnackOpen("Rol Agregado")
                    }}
                    render={(open)=>(
                        <Button variant = "outlined" edge = "end" onClick = {open}>
                        Ver Roles
                        </Button>
                    )}
                />   
            </Paper> 
        </Content>     
    );
}

function SummaryCardViewLine({title, value, component}){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const classes = useStyles();
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSnackOpen(false);
      };
    return(
        <Content>
            <Snackbar open = {snackOpen} autoHideDuration = {2000} onClose = {snackClose}>
                <Alert onClose = {snackClose} severity = "success">
                    {snackOpen}
                </Alert>
            </Snackbar>
            <Paper elevation = {6} className = {classes.summaryCard}>
                <Typography color = {"textSecondary"}>
                    {title}
                </Typography>
                {component || (
                    <Typography>
                        {value}
                    </Typography>
                )}
                <ViewRole
                    edge = "end"
                    onSave = {()=>{
                        setSnackOpen("Lineas")
                    }}
                    render={(open)=>(
                        <Button variant = "outlined" edge = "end" onClick = {open}>
                        Ver Lineas
                        </Button>
                    )}
                />   
            </Paper> 
        </Content>     
    );
}

function SummaryCardCheck({title, value, component}){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const classes = useStyles();
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSnackOpen(false);
      };
    return(
        <Content>
            <Snackbar open = {snackOpen} autoHideDuration = {2000} onClose = {snackClose}>
                <Alert onClose = {snackClose} severity = "success">
                    {snackOpen}
                </Alert>
            </Snackbar>
            <Paper elevation = {6} className = {classes.summaryCard}>
                <Typography color = {"textSecondary"}>
                    {title}
                </Typography>
                {component || (
                    <Typography>
                        {value}
                    </Typography>
                )}
                
            </Paper>
        </Content> 
    );
}

function SummaryCardLines({title, value, component}){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const classes = useStyles();
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSnackOpen(false);
      };
    return(
        <Content>
            <Paper elevation = {6} className = {classes.summaryCard}>
                <Typography color = {"textSecondary"}>
                    {title}
                </Typography>
                {component || (
                    <Typography>
                        {value}
                    </Typography>
                )}
                <InsertLine
                    edge = "end"
                    onSave = {()=>{
                        setSnackOpen("Linea agregada")
                    }}
                    render={(open)=>(
                        <Button variant = "outlined" edge = "end" onClick = {open}>
                            Gestionar lineas
                        </Button>
                    )}
                />
            </Paper>
        </Content> 
    );
}

function SummaryCardViewArea({title, value, component}){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const classes = useStyles();
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSnackOpen(false);
      };
    return(
        <Content>
            <Snackbar open = {snackOpen} autoHideDuration = {2000} onClose = {snackClose}>
                <Alert onClose = {snackClose} severity = "success">
                    {snackOpen}
                </Alert>
            </Snackbar>
            <Paper elevation = {6} className = {classes.summaryCard}>
                <Typography color = {"textSecondary"}>
                    {title}
                </Typography>
                {component || (
                    <Typography>
                        {value}
                    </Typography>
                )}
                <ViewRole
                    edge = "end"
                    onSave = {()=>{
                        setSnackOpen("Areas")
                    }}
                    render={(open)=>(
                        <Button variant = "outlined" edge = "end" onClick = {open}>
                        Ver Areas
                        </Button>
                    )}
                />   
            </Paper> 
        </Content>     
    );
}

function SummaryCardLoans({title, value, component}){
    const [snackOpen, setSnackOpen] = React.useState(false);
    const classes = useStyles();
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setSnackOpen(false);
      };
    return(
        <Content>
            <Paper elevation = {6} className = {classes.summaryCard}>
                <Typography color = {"textSecondary"}>
                    {title}
                </Typography>
                {component || (
                    <Typography>
                        {value}
                    </Typography>
                )}
                <InsertLoanArea
                    edge = "end"
                    onSave = {()=>{
                        setSnackOpen("Area agregada")
                    }}
                    render={(open)=>(
                        <Button variant = "outlined" edge = "end" onClick = {open}>
                            Agregar areas de prestamos
                        </Button>
                    )}
                />
            </Paper>
        </Content> 
    );
}

export default function ConfigurationInfo(){
    const classes = useStyles();
    return(
        <div className = {classes.root}>
            <CssBaseline/>
            <main className = {classes.content}>
                <Content maxWidht = "md" className = {classes.container}>
                    <div className = {classes.summaryCards}>
                        <SummaryCard title = {"Crear nuevo rol"} value = {"Este botón le permite añadir un nuevo rol a la empresa"}/>
                        <SummaryCardViewRole title = {"Ver roles agregados"} value = {"Este boton le permite ver los roles que han sido agregados"}/>
                        <SummaryCardLines title = {"Gestionar Lineas"} value = {"Este boton le permite añadir una nueva linea        "}/>
                        <SummaryCardViewLine title = {"Ver lineas agregadas"} value = {"Este boton le permite ver las lineas que han sido agregadas"}/>
                        <SummaryCardLoans title = {"Gestionar areas de prestamos"} value = {"Este boton le permite añadir una nueva area de prestamos"}/>
                        <SummaryCardViewArea title = {"Ver areas agregadas"} value = {"Este boton le permite ver las areas que han sido agregadas"}/>
                        <SummaryCardCheck title = {"Gestionar roles"} value = {""}/>    
                    </div>   
                </Content>
            </main> 
        </div>   
    );
}