import { Box, Button, Container, CssBaseline, makeStyles, Paper, Snackbar, Typography } from "@material-ui/core";
import React from "react";
import Content from "../../Dashboard/Content";
import MuiAlert from "@material-ui/lab/Alert";
import InsertRole from "./InsertRole";

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
        height: '100vh',
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
            <Paper elevation = {6} className = {classes.summaryCard}>
                <Typography color = {"textSecondary"}>
                    {title}
                </Typography>
                {component || (
                    <Typography>
                        {value}
                    </Typography>
                )}
                <Button variant = "outlined" color = "primary">
                    Gestion de usuarios
                </Button>
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
                <Content maxWidht = "lg" className = {classes.container}>
                    <div className = {classes.summaryCards}>
                            {/*<Button>
                                Hola
                            </Button>*/}
                        <SummaryCard title = {"Crear nuevo rol"}/>
                        <SummaryCardCheck title = {"Gestionar roles"}/>
                        <SummaryCard title = {"Crear nuevo usuario"}/>
                        <SummaryCard title = {"Crear nuevo usuario"}/>
                    </div>   
                </Content>
            </main> 
        </div>   
    );
}