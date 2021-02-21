import React, { useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Table from './table/Table';
import Map from './map/Map';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  paper: {
    padding: theme.spacing(2, 2, 0, 2),
  },
}));

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const input = document.querySelector('input');
    input.addEventListener('change', () => {
      const { files } = input;
      if (files.length === 0) return;

      const file = files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        const uploadedFile = e.target.result;
        const lines = uploadedFile.split(/\r\n|\n/);
        const JSONlines = lines.map((x) => JSON.parse(x));
        JSONlines.forEach((x, index) => {
          const newX = x;
          newX.reading_ts = moment(x.reading_ts).format('DD-MM-YYYY, HH:mm:ss');
          newX.index = index + 1;
        });
        setData(JSONlines);
      };

      reader.readAsText(file);
    });
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={4} sm={4} md={4}>
          <Map data={data} />
        </Grid>
        <Grid item xs={8} sm={8} md={8} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <label htmlFor="files">
              <input
                type="file"
                id="files"
                name="upload-photo"
                className={classes.input}
              />
              <Button
                variant="contained"
                component="span"
                className={classes.button}
              >
                Upload data
              </Button>
            </label>
            {data && <Table data={data} setData={setData} />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
