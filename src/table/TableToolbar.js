import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddSensorDataDialog from "./AddSensorDataDialog";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { addSensorDataHandler } = props;
  return (
    <Toolbar className={classes.root}>
      <AddSensorDataDialog addSensorDataHandler={addSensorDataHandler} />
      <Typography variant="h6">Sensor</Typography>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  addSensorDataHandler: PropTypes.func.isRequired,
};

export default TableToolbar;
