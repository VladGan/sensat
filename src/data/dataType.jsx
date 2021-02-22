import PropTypes from 'prop-types';
// data type for the sensor data
export const sensorDataType = {
  id: PropTypes.string.isRequired,
  box_id: PropTypes.string.isRequired,
  sensor_type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  range_l: PropTypes.number.isRequired,
  range_u: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  reading: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  reading_ts: PropTypes.string.isRequired,
};

export const initialSensorData = {
  id: '',
  box_id: '',
  sensor_type: '',
  name: '',
  range_l: 0,
  range_u: 0,
  reading: 0,
  unit: '',
  longitude: 0,
  latitude: 0,
  reading_ts: '',
};
