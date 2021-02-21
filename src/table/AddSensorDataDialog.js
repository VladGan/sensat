import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const initialSensorData = {
  id: '',
  box_id: '',
  sensor_type: '',
  name: '',
  range_l: '',
  range_r: '',
  reading: '',
  unit: '',
  longitude: 0,
  latitude: 0,
  reading_ts: '',
};

const AddSensorDataDialog = (props) => {
  const [sensorData, setSensorData] = useState(initialSensorData);
  const { addSensorDataHandler } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (event) => {
    addSensorDataHandler(sensorData);
    setSensorData(initialSensorData);
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setSensorData({ ...sensorData, [name]: value });
  };

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Sensor</DialogTitle>
        <DialogContent>
          <DialogContentText>Demo add item to react table.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            type="text"
            fullWidth
            value={sensorData.id}
            onChange={handleChange('id')}
          />
          <TextField
            margin="dense"
            label="Box ID"
            type="text"
            fullWidth
            value={sensorData.box_id}
            onChange={handleChange('box_id')}
          />
          <TextField
            margin="dense"
            label="Sensor type"
            type="text"
            fullWidth
            value={sensorData.sensor_type}
            onChange={handleChange('sensor_type')}
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={sensorData.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin="dense"
            label="Range L"
            type="text"
            fullWidth
            value={sensorData.range_l}
            onChange={handleChange('range_l')}
          />
          <TextField
            margin="dense"
            label="Range U"
            type="text"
            fullWidth
            value={sensorData.range_u}
            onChange={handleChange('range_u')}
          />
          <TextField
            margin="dense"
            label="Reading"
            type="text"
            fullWidth
            value={sensorData.reading}
            onChange={handleChange('reading')}
          />
          <TextField
            margin="dense"
            label="Unit"
            type="text"
            fullWidth
            value={sensorData.unit}
            onChange={handleChange('unit')}
          />
          <TextField
            margin="dense"
            label="Longitude"
            type="number"
            fullWidth
            value={sensorData.longitude}
            onChange={handleChange('longitude')}
          />
          <TextField
            margin="dense"
            label="Latitude"
            type="number"
            fullWidth
            value={sensorData.latitude}
            onChange={handleChange('latitude')}
          />
          <TextField
            margin="dense"
            label="TS"
            type="text"
            fullWidth
            value={sensorData.reading_ts}
            onChange={handleChange('reading_ts')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddSensorDataDialog.propTypes = {
  addSensorDataHandler: PropTypes.func.isRequired,
};

export default AddSensorDataDialog;
