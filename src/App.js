import React, {useEffect, useState} from 'react';
import Map from "./map/Map";
import Table from "./table/Table";
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(4, 4, 0, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        position: 'relative',
        overflow: 'hidden'
    },
    scroll: {
        height: '100%',
        overflow: 'scroll'
    }
}));

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        let input = document.querySelector('input')
        input.addEventListener('change', () => {
            let files = input.files;

            const file = files[0];

            let reader = new FileReader();

            reader.onload = (e) => {
                const file = e.target.result;
                const lines = file.split(/\r\n|\n/);
                const JSONlines = lines.map(x => JSON.parse(x))
                JSONlines.forEach(x => {
                    x.reading_ts = moment(x.reading_ts).format('MM Do YYYY, h:mm:ss a');
                })
                setData(JSONlines)
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
                <Grid item xs={4} sm={4} md={4} className={classes.image}>
                    <Map data={data}/>
                </Grid>
                <Grid item xs={8} sm={8} md={8} component={Paper} elevation={6} square className={classes.scroll}>
                    <div className={classes.paper}>
                        <label htmlFor="files">
                            <input type="file" id="files" name="upload-photo" style={{ display: 'none' }}/>

                            <Button variant="contained" component="span">
                                Upload button
                            </Button>
                        </label>
                        {data && <Table data={data}/>}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;