# Start

To start the application, run 
`npm start`
from the root folder.

Left part - `leaflet` map that shows selected data.

Right part - press `Upload data` to upload sensors information (select `.json` file, you can find it in the `data` folder).
Press `+ Sensor` to add a custom field.

There is a pagination, because if you load the whole data file on the page it will lag.

The design is simple since there were no requirements design-wise. 

I added a simple test, it can be run using
`npm test`
In the real application, more tests should be implemented.

Added `eslint` and `prettier` for style check.

I copied some code from `material-ui` and `react-table` examples.

I implemented following extra Tasks:
* allow user to enter new sensor data;
* allow user to see sensor location on a map(use any lib google maps, openStreetMaps, openLayers, etc).

All the dots on the map are in the same spot since all the attitudes and latitudes are the same.
