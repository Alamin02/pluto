import React, { useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl'
import mapMarker from '../../assets/images/map-marker-icon.png'

const MapboxAccessToken = 'pk.eyJ1IjoicmFpaGFuMzIiLCJhIjoiY2tremQ5Y3FiMHAwbjJxcDAwcTdvOHptayJ9.tYflkgHrEN-IEa5LwSd1TA'
const markerStyle = {
    width: '50px',
    height: '50px'
}
const MapInfo = () => {
    const [viewport, setViewport] = useState({
        latitude: 23.810651,
        longitude: 90.4126466,
        zoom: 10,
        width: '100vw',
        height: '60vh'
    })
    return (
        <ReactMapGl
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
            mapboxApiAccessToken={MapboxAccessToken} >
            <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
                <img src={mapMarker} alt='map-marker' style={markerStyle} />
            </Marker>
        </ReactMapGl>
    )
}
export default MapInfo;