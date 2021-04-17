import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ContactsIcon from '@material-ui/icons/Contacts';
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
                    <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText align = "center" primary = "Administracion"/>
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItemLink href = "/workers">
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary = "Trabajadores"/>
        </ListItemLink>
        <ListItemLink href = "/reports">
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary = "Reportes"/>
        </ListItemLink>
        <ListItemLink href = "/items">
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary = "Inventario"/>
        </ListItemLink>
        <ListItemLink href = "/configuration">
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary = "Configuración"/>
        </ListItemLink>
    </div>
);