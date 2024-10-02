import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  TextField, Drawer, IconButton, List, ListItem, ListItemText, MenuItem, Select, InputLabel, FormControl,
  Typography
} from '@mui/material';
import { CalendarToday, Person, Business, Settings } from '@mui/icons-material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './App.css'; 
import Header from './Header';

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'
];

const stylists = ['Saniya-V', 'Tini-Mose', 'Tina-San'];

const services = ['Haircut', 'Facial', 'Massage', 'Manicure', 'Pedicure'];

function AppointmentApp() {
  const [appointments, setAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [newAppointment, setNewAppointment] = useState({ name: '', time: '', stylist: '', service: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCellClick = (time, stylist) => {
    const existingAppointment = appointments.find(app => app.time === time && app.stylist === stylist);

    if (existingAppointment) {
      setNewAppointment(existingAppointment);
      setCurrentAppointmentId(existingAppointment.id);
    } else {
      setNewAppointment({ name: '', time, stylist, service: '' });
      setCurrentAppointmentId(null);
    }

    setSelectedTime(time);
    setSelectedStylist(stylist);
    setDrawerOpen(true);
  };

  const handleInputChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    setNewAppointment({ ...newAppointment, service: e.target.value });
  };

  const handleFormSubmit = () => {
    if (currentAppointmentId) {
      setAppointments(appointments.map(app =>
        app.id === currentAppointmentId ? { ...newAppointment, id: currentAppointmentId } : app
      ));
    } else {
      setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1 }]);
    }

    setDrawerOpen(false);
  };

  const getAppointment = (time, stylist) => {
    const appointment = appointments.find(app => app.time === time && app.stylist === stylist);
    if (appointment) {
      return `${appointment.name} (${appointment.service})`;
    } else {
      return (
        <div className="lines-container">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      );
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="side-nav">
        <Typography sx={{ textAlign: 'center', fontSize: '50px' }}>Logo</Typography>
        <List>
          <ListItem button>
            <IconButton sx={{ color: 'white' }} >
              <CalendarToday />
            </IconButton>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem sx={{ backgroundColor: 'white' }} button>
            <IconButton >
              <CalendarToday />
            </IconButton>
            <ListItemText sx={{ color: 'black' }} primary="Appointments" />
          </ListItem>
          <ListItem button>
            <IconButton sx={{ color: 'white' }} >
              <Person />
            </IconButton>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button>
            <IconButton sx={{ color: 'white' }} >
              <Business />
            </IconButton>
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem button>
            <IconButton sx={{ color: 'white' }} >
              <Settings />
            </IconButton>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <ListItem button onClick={handleLogout} sx={{ marginTop: 'auto' }}>
          <IconButton sx={{ color: 'white' }} >
            <PowerSettingsNewIcon />
          </IconButton>
          <ListItemText primary="Logout" />
        </ListItem>
      </div>

      <div className="main-content">
        <Header />
        {/* Appointment Table */}
        <TableContainer component={Paper} className="appointment-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                {stylists.map((stylist, idx) => (
                  <TableCell key={idx} align="center">{stylist}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.map((time, idx) => (
                <TableRow key={idx}>
                  <TableCell>{time}</TableCell>
                  {stylists.map((stylist, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      className="time-slot"
                      onClick={() => handleCellClick(time, stylist)}
                    >
                      {getAppointment(time, stylist)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Appointment Form Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="drawer-content">
            <h3>{currentAppointmentId ? 'Edit Appointment' : 'New Appointment'} at {selectedTime} with {selectedStylist}</h3>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Customer Name"
              type="text"
              fullWidth
              value={newAppointment.name}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Service</InputLabel>
              <Select
                value={newAppointment.service}
                onChange={handleServiceChange}
                label="Service"
              >
                {services.map((service, idx) => (
                  <MenuItem key={idx} value={service}>
                    {service}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              onClick={handleFormSubmit}
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              {currentAppointmentId ? 'Update Appointment' : 'Book Appointment'}
            </Button>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default AppointmentApp;
