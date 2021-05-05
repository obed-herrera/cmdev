import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactsIcon from '@material-ui/icons/Contacts';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StorageIcon from '@material-ui/icons/Storage';
import BuildIcon from '@material-ui/icons/Build';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { AttachMoney, Description } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function ListItemLink(props){
    return <ListItem button component = "a" {...props}/>;
}

export const mainListItems = (

    <div>
        <Link to = '/dashboard'>
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary = "Inicio"/>
        </Link>
        <Link to = '/clients'>
                <ListItemIcon>
                    <ContactsIcon/>
                </ListItemIcon>
                <ListItemText primary = "Clientes"/>
        </Link>
        <Link to = '/loans'>
            <ListItemIcon>
                <AttachMoney/>
            </ListItemIcon>
            <ListItemText primary = "Préstamos"/>
        </Link>
        <Link to = '/lines'>
            <ListItemIcon>
                <Description/>
            </ListItemIcon>
            <ListItemText primary = "Líneas"/>
        </Link>
    </div>
);

export const headerSecondaryList = (
    <div>
        <ListItem>
            <ListItemIcon>
                    <DoneAllIcon/>
            </ListItemIcon>
            <ListItemText align = "center" primary = "Administracion"/>
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <Link to = '/workers'>
            <ListItemIcon>
                <EmojiPeopleIcon/>
            </ListItemIcon>
            <ListItemText primary = "Trabajadores"/>
        </Link>
        <Link to = '/reports'>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary = "Reportes"/>
        </Link>
        <Link to = '/items'>
            <ListItemIcon>
                <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary = "Inventario"/>
        </Link>
        <Link to = '/configuration'>
            <ListItemIcon>
                <BuildIcon/>
            </ListItemIcon>
            <ListItemText primary = "Configuración"/>
        </Link>
    </div>
);