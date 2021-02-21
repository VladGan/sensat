import React, { useEffect, useState } from "react";
import Map from "./map/Map";
import Table from "./table/Table";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  paper: {
    padding: theme.spacing(2, 2, 0, 2),
  },
}));

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let input = document.querySelector("input");
    input.addEventListener("change", () => {
      let files = input.files;
      if (files.length === 0) return;

      const file = files[0];

      let reader = new FileReader();

      reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\r\n|\n/);
        const JSONlines = lines.map((x) => JSON.parse(x));
        JSONlines.forEach((x, index) => {
          x.reading_ts = moment(x.reading_ts).format("DD-MM-YYYY, HH:mm:ss");
          x.index = index + 1;
        });
        setData(JSONlines);
      };

      reader.onerror = (e) => alert(e.target.error.name);

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
