import React from "react";
import { Link, useParams } from "react-router-dom";
import Content from "../../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DriveIcon from "@material-ui/icons/DriveEta";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InsertClient from "./InsertClient";
import { useSelector } from "react-redux";
import { selectClient } from "./ClientSlice";
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { headerSecondaryList, mainListItems, secondaryListItems } from '../../Dashboard/listItems';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifyContent: "space-between",
    marginRight: 0,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 50, // keep right padding when drawer closed
  },
  palette: {
    primary: {
        main: '#4caf50',
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 24,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'sticky',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    position: 'sticky',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'contents',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 20,
  },
}));

export function SummaryCard({ title, value, component }) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={"textSecondary"} variant="h5" gutterBottom>
        {title}
      </Typography>
      {component || (
        <Typography color={"primary"} variant="h5">
          {value}
        </Typography>
      )}
    </Paper>
  );
}

export default function ClientDetail({ id }) {
  const { clientId } = useParams();
  id = id ? id : clientId;
  const rows = useSelector(selectClient);
  let client = rows.find((row) => row.id === +id);
  if (!client) {
    client = { name: "Cliente", id: 3, img: "foo" };
  }
  const classes = useStyles();
  const loading = false;

  const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  const trips = 4;
  const distance = 0;
  const fare = 0;
  return (
    <div className = {classes.root}>
    <CssBaseline/>
            <AppBar palette = "primary" position = "absolute" className = {clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className = {classes.toolbar}>
                    <IconButton 
                        edge = "state"
                        color = "inherit"
                        aria-label = "open drawer"
                        onClick = {handleDrawerOpen}
                        className = {clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography component = "h1" variant = "h6" color = "inherit" noWrap className = {classes.title}>
                        Clientes
                    </Typography>
                    
                    <IconButton color = "inherit">
                        <PowerSettingsNewIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant = "permanent"
                classes = {{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open = {open}
            >
                <div className = {classes.toolbarIcon}>
                    <IconButton onClick = {handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
                <Divider/>
                <List>{headerSecondaryList}</List>
                <Divider/>
                <List>{secondaryListItems}</List>
            </Drawer>
    <main className = {classes.content}> 
    <div className = {classes.appBarSpacer}/>     
    <Content maxWidth = "lg" className = {classes.container}>
      <div
        style={{
          height: "20px",
          backgroundPosition: "justify",
          backgroundSize: "cover",
          filter: "contrast(75%)",
        }}
      />
      <div className={classes.headerContainer}>
      
        <div className={classes.header}>
          <Avatar
            alt={client.name}
            src={client.img}
            classes={{ root: classes.avatar, circle: classes.circle }}
          />
          <Typography variant={"h5"}>{client.name}</Typography>
          <Chip variant={"outlined"} icon={<DriveIcon />} label="Cliente" />
          {/*<Rating name="read-only" value={4.3} readOnly />*/}
          <div className={classes.spacer} />
          <div className={classes.actionGroup}>
          <div>
          <Link to = '/clients' style = {{textDecoration: 'none'}}>
            <Button
            color = "secondary"
            variant = "contained"
            startIcon = {<KeyboardReturnIcon/>}
            >
              Regresar
            </Button>
          </Link>   
          </div>
          <div>
          <InsertClient
              data={client}
              render={(open) => (
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={open}
                >
                  Edit
                </Button>
              )}
            />
          </div>
          </div>
        </div>
      </div>
      <div className={classes.summaryCards}>
        <SummaryCard title={"Nombre del Cliente"} value={"Obed Herrera"} />
        <SummaryCard title={"Cedula"} value={"201-160398-0002U"} />
        <SummaryCard title={"Direccion"} value={"De los semaforos de la mascota 3 cuadras al lago"} />
        <SummaryCard title={"Telefono"} value={"8975-6890"} />
        <SummaryCard title={"Prestamos abiertos"} value={4} />
      </div>
      {/*<div className={classes.summaryCards}>
        <SummaryCard title="Last 30 Days" component={<RevenueLine />} />
        <SummaryCard title="By Vehicle" component={<VehiclePie />} />
              </div>*/}
      {/*<SummaryCard title={"Recent expenses"} component={<ExpensesTable />} />*/}
    </Content>
    </main>
</div>
  )
          }