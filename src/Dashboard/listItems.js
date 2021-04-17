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

function ListItemLink(props){
    return <ListItem button component = "a" {...props}/>;
}

export const mainListItems = (

    <div>
        <ListItemLink href = "/dashboard">
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary = "Inicio"/>
        </ListItemLink>
        <ListItemLink href = "/clients">
                <ListItemIcon>
                    <ContactsIcon/>
                </ListItemIcon>
                <ListItemText primary = "Clientes"/>
        </ListItemLink>
        <ListItemLink href = "/loans">
            <ListItemIcon>
                <AttachMoney/>
            </ListItemIcon>
            <ListItemText primary = "Préstamos"/>
        </ListItemLink>
        <ListItemLink href = "/lines">
            <ListItemIcon>
                <Description/>
            </ListItemIcon>
            <ListItemText primary = "Líneas"/>
        </ListItemLink>
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
        <ListItemLink href = "/workers">
            <ListItemIcon>
                <EmojiPeopleIcon/>
            </ListItemIcon>
            <ListItemText primary = "Trabajadores"/>
        </ListItemLink>
        <ListItemLink href = "/reports">
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary = "Reportes"/>
        </ListItemLink>
        <ListItemLink href = "/items">
            <ListItemIcon>
                <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary = "Inventario"/>
        </ListItemLink>
        <ListItemLink href = "/configuration">
            <ListItemIcon>
                <BuildIcon/>
            </ListItemIcon>
            <ListItemText primary = "Configuración"/>
        </ListItemLink>
    </div>
);