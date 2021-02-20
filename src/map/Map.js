import React, { useRef, useEffect } from 'react';
import L from 'leaflet';

function Map(props) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!props.data) return;
        console.log("useEffect")
        props.data.forEach(x => {
            L.circle([x.latitude, x.longitude], {
                color: 'red',
                fillColor: '#ff0033',
                fillOpacity: 0.3,
                radius: 50
            }).addTo(mapRef.current);
        });
    }, [props.data]);

    useEffect( () => {
        mapRef.current = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmxhZGdhbjIyMSIsImEiOiJja2wyb3c1a2gzdnYwMzBxbjYxYnJxdmEyIn0.BVxc5afO3HhAadP9YBnE3w', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(mapRef.current);
    }, []);

    return (
        <div ref={mapRef}
             id="map"
             style={{
                 height: '100%',
                 width: '100%'}}>
        </div>
    );

}

export default Map;