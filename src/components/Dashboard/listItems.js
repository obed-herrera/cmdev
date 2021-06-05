import React, { lazy } from 'react';
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
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { AttachMoney, Description} from '@material-ui/icons';
import { Link} from 'react-router-dom';

function ListItemLink(props){
    return <ListItem button component = "a" {...props}/>;
}

const Layout = lazy(()=>import("../Layout"))

export const mainListItems =  (
    <div>
        <Link to = "/"  style = {{textDecoration: 'none' , color: '#000'}}>
            <ListItemLink>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary = "Inicio"/>
            </ListItemLink>
        </Link>
        <Link to = "/clients"  style = {{textDecoration: 'none' , color: '#000'}}>
        <ListItemLink>
                <ListItemIcon>
                    <ContactsIcon/>
                </ListItemIcon>
                <ListItemText primary = "Clientes"/>
        </ListItemLink>
        </Link>
        <Link to = '/loans' style = {{textDecoration: 'none' , color: '#000'}}>
            <ListItemLink>
            <ListItemIcon>
                <AttachMoney/>
            </ListItemIcon>
            <ListItemText primary = "Préstamos"/>
            </ListItemLink>
            
        </Link>
        <Link to = '/lines' style = {{textDecoration: 'none', color: '#000'}}>
            <ListItemLink>
            <ListItemIcon>
                <Description/>
            </ListItemIcon>
            <ListItemText primary = "Líneas"/>
            </ListItemLink>
            
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

export const secondaryListItems=(
        <div>
        <Link to = '/workers' style = {{textDecoration: 'none', color: '#000'}}>
            <ListItemLink>
            <ListItemIcon>
                <EmojiPeopleIcon/>
            </ListItemIcon>
            <ListItemText primary = "Trabajadores"/>
            </ListItemLink>
        </Link>
        <Link to = '/expenses' style = {{textDecoration: 'none', color: '#000'}}>
            <ListItemLink>
            <ListItemIcon>
                <LocalAtmIcon/>
            </ListItemIcon>
            <ListItemText primary = "Gastos"/>
            </ListItemLink>
        </Link>
        <Link to = '/reports' style = {{textDecoration: 'none', color: '#000'}}>
            <ListItemLink>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary = "Reportes"/>
            </ListItemLink>
            
        </Link>
        <Link to = '/items' style = {{textDecoration: 'none', color: '#000'}}>
            <ListItemLink>
            <ListItemIcon>
                <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary = "Inventario"/>
            </ListItemLink>
           
        </Link>
        <Link to = '/configuration' style = {{textDecoration: 'none', color: '#000'}}>
            <ListItemLink>
            <ListItemIcon>
                <BuildIcon/>
            </ListItemIcon>
            <ListItemText primary = "Configuración"/>
            </ListItemLink>
        </Link>        
    </div>
)

