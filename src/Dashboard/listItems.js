import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CarRepairIcon from '@mui/icons-material/CarRepair';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => {
      window.location.href="/home"
    }}>
      <ListItemIcon style={{color:"#006466"}}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText style={{color:"#006466"}}primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => {
      window.location.href="/vehicules"
    }}>
      <ListItemIcon style={{color:"#006466"}}>
        <CarRepairIcon />
      </ListItemIcon>
      <ListItemText style={{color:"#006466"}} primary="Vehicules" />
    </ListItem>
    <ListItem button onClick={() => {
      window.location.href="/Customer"
    }}>
      <ListItemIcon style={{color:"#006466"}}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText style={{color:"#006466"}}primary="Customers" />
    </ListItem>
    <ListItem button onClick={() => {
      window.location.href="/vehicules/intervention/list"
    }}>
      <ListItemIcon style={{color:"#006466"}}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText style={{color:"#006466"}} primary="Interventions" />
    </ListItem>
    <ListItem button onClick={() => {
      window.location.href="/vehicules/parking/list"
    }}>
      <ListItemIcon style={{color:"#006466"}}>
        <DirectionsCarFilledIcon />
      </ListItemIcon>
      <ListItemText style={{color:"#006466"}}primary="Parking" />
    </ListItem>
    
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset style={{color:"#4d194d"}}>Saved interventions</ListSubheader>
    <ListItem button onClick={() => {
      window.location.href="/FilterMonth"
    }}>
      <ListItemIcon style={{color:"#006466"}}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText style={{color:"#006466"}} primary="Current month" />
    </ListItem>
    <ListItem button onClick={() => {
      window.location.href="/FilterYear"
    }}>
      <ListItemIcon style={{color:"#006466"}}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText style={{color:"#006466"}} primary="Current Year" />
    </ListItem>
    <ListItem button onClick={() => {
      window.location.href="/FilterYearend"
    }}>
      <ListItemIcon style={{color:"#006466"}}>
        <AssignmentIcon />
      </ListItemIcon >
      <ListItemText style={{color:"#006466"}}primary="Year-end sale" />
    </ListItem>
  </div>
);