import React from "react";
import Content from "../../components/Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import AssessmentIcon from '@material-ui/icons/Assessment';

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
    top: "-40px",
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
    width: "300px",
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

function SummaryCard({ title, value, component }) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.summaryCard}>
      <Typography color={"textSecondary"} variant="h5" gutterBottom>
        {title}
      </Typography>
      {component || (
        <Typography color={"primary"} variant="h3">
          {value}
        </Typography>
      )}
            <Button variant = "outlined" color = "primary" edge="end">
                Generar
            </Button>
    </Paper>
  );
}

export default function ItemDetail({ id }) {

  const classes = useStyles();
  const loading = false;
  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }
  return (
    <div className = {classes.root}>
    <CssBaseline/>
    {<main className = {classes.content}> 
    <div className = {classes.appBarSpacer}/>     
    <Content maxWidth = "lg" className = {classes.container}>
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <Avatar
            classes={{ root: classes.avatar, circle: classes.circle }}
          />
          <Typography variant={"h5"}></Typography>
          <Chip variant={"outlined"} icon={<AssessmentIcon />} label="Seleccione su reporte" />
          {/*<Rating name="read-only" value={4.3} readOnly />*/}
        </div>
      </div>
      <div className={classes.summaryCards}>
        <SummaryCard title={"Reporte al dia de hoy"}>
        </SummaryCard>
        <SummaryCard title={"Reporte de la semana"} />
        <SummaryCard title={"Reporte del mes"}  />
        <SummaryCard title={"Reporte por prestamos"}  />
        <SummaryCard title={"Reporte por lineas"}  />
        <SummaryCard title={"Reporte por clientes"}  />
        <SummaryCard title={"Reporte de gastos"}  />
      </div>
      {/*<div className={classes.summaryCards}>
        <SummaryCard title="Last 30 Days" component={<RevenueLine />} />
        <SummaryCard title="By Vehicle" component={<VehiclePie />} />
              </div>*/}
      {/*<SummaryCard title={"Recent expenses"} component={<ExpensesTable />} />*/}
    </Content>
    </main>}
</div>
  )
          }