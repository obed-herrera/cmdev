import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Content from "../../Dashboard/Content";
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { Avatar, Button, Checkbox, TableContainer, TablePagination, TableSortLabel, Toolbar, Tooltip } from '@material-ui/core';
import InsertClient from './InsertClient';
import PropTypes from "prop-types";
import { SummaryCard } from "./ClientDetail";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteClient from './DeleteClient';
import { useDispatch, useSelector } from 'react-redux';
import { remove, selectClient, selectLoading} from './ClientSlice';
import { useHistory } from 'react-router';
import axios from 'axios';
import { DataUsage } from '@material-ui/icons';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "client_sys_code",
    numeric: false,
    disablePadding: true,
    label: "Codigo del Cliente",
  },
  {
    id: "client_first_name",
    numeric: false,
    disablePadding: true,
    label: "Primer Nombre",
  },
  {
    id: "client_middle_name",
    numeric: false,
    disablePadding: true,
    label: "Primer Apellido",
  },
  {
    id: "client_national_id",
    numeric: false,
    disablePadding: true,
    label: "Cedula",
  },
  {
    id: "client_phone",
    numeric: false,
    disablePadding: true,
    label: "Telefono del Cliente",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  grow: {
    flexGrow: 1,
  },
  deleteButton: {
    marginLeft: theme.spacing(1),
  },
}));

const baseUrl = "http://localhost:3001/clients";

export default function ClientsInfo() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const rows = useSelector(selectClient);
  const loading = useSelector(selectLoading);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const dispatch = useDispatch();
  const error = false;
  const snackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

const [data, setData] = useState([]);

const peticionGet = async()=>{
  await axios.get(baseUrl)
  .then(response => {
    setData(response.data);
  })
}

useEffect(()=>{
  peticionGet();
},[])


  let history = useHistory();

  if (loading) {
    return (
      <Content>
        <CircularProgress />
      </Content>
    );
  }

  if (error) return `Error! ${error.message}`;

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectTableRow = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
      <Content>
      <Snackbar open = {snackOpen} autoHideDuration = {2000} onClose = {snackClose}>
        <Alert onClose = {snackClose} severity = "success">
          {snackOpen}
        </Alert>
      </Snackbar>
      <div className = {classes.root}>
        <Toolbar>
          <div edge = "start" className = {classes.grow}/>
          <InsertClient
            edge = "end"
            onSave = {()=>{
              setSnackOpen("Cliente Agregado")
            }}
            render = {(open) => (
              <Button variant = "outlined" color = "primary" edge = "end" onClick = {open}>
                Insertar Nuevo Cliente
              </Button>
            )}
          /> 
          {selected.length > 0 && (
            <Tooltip title={"Delete"}>
              <DeleteClient
                ids={selected}
                onSave={() => {
                  dispatch(remove(selected));

                  setSnackOpen(
                    `${selected.length} Driver${
                      selected.length > 1 ? "s" : ""
                    } Deleted`
                  );
                  setSelected([]);
                }}
                render={(open) => (
                  <Button
                    className={classes.deleteButton}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={open}
                  >
                    {" "}
                  Borrar {selected.length} seleccionado
                  </Button>
                )}
              />
            </Tooltip>
          )}
        </Toolbar>
        <SummaryCard
          title={"Clientes"}
          value={
            <>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={"small"}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((data, index) => {
                        const isItemSelected = isSelected(data.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            onClick={(e) => {
                              if (
                                e.target.type === "checkbox" ||
                                e.target.className.indexOf("Checkbox") > 0
                              ) {
                                return;
                              }
                              history.push(`/clientdetail/1`);
                            }}
                            key={`person-${data.id}`}
                            selected={isItemSelected}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell
                              padding="checkbox"
                              onClick={(e) => {
                                selectTableRow(DataUsage.id);
                              }}
                            >
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                                onChange={(e) => {
                                  selectTableRow(data.id);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Avatar  />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {data.client_sys_code}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {data.client_first_name}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {data.client_middle_name}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {data.client_national_id}
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {data.client_phone}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </>
          }
        />
      </div>
      </Content> 
  );
}