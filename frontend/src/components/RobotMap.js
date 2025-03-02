import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Import the CSS
import 'leaflet-defaulticon-compatibility'; // Import the compatibility package

const RobotMap = ({ robots }) => {
  const defaultCenter = [0, 0]; // Default map center (latitude, longitude)
  const defaultZoom = 2; // Default zoom level

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {robots.map((robot) => (
        <Marker key={robot.id} position={[robot.position_x, robot.position_y]}>
          <Popup>
            <div>
              <strong>{robot.name}</strong>
              <br />
              Position: ({robot.position_x}, {robot.position_y})
              <br />
              Status: {robot.is_connected ? 'Connected' : 'Disconnected'}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RobotMap;