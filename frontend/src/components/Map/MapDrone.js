import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faTachometerAlt,
  faUser,
  faCog,
  faChartLine,
  faServer,
  faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';

import { fetchLatestTemperatureData } from "../../services/TempDataService";

// Helpers
const parseSimpleCoordinate = (coord) => {
  const regex = /^([\d.]+)([NSEW])$/;
  const match = coord.match(regex);
  if (!match) return 0;
  let value = parseFloat(match[1]);
  const direction = match[2];
  return (direction === "S" || direction === "W") ? -value : value;
};

const parseGeographicalZone = (zone) => {
  try {
    const [latRaw, lngRaw] = zone.trim().split(" ");
    return [parseSimpleCoordinate(latRaw), parseSimpleCoordinate(lngRaw)];
  } catch {
    return [0, 0];
  }
};

// ✅ Composant qui met à jour la vue de la carte dynamiquement
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position[0] !== 0 && position[1] !== 0) {
      map.setView(position, 15); // zoom automatique à 15
    }
  }, [position, map]);
  return null;
};

const MapDrone = () => {
  const [position, setPosition] = useState([22.085, -11.7623]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLatestTemperatureData();
        const [lat, lng] = parseGeographicalZone(data.geographicalZone);
        setPosition([lat, lng]);
      } catch (err) {
        console.error("Erreur lors du chargement des coordonnées :", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li><Link to="/home"><FontAwesomeIcon icon={faHome} /> HomePage</Link></li>
          <li><Link to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Tableau de bord</Link></li>
          <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profil</Link></li>
          <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Paramètres</Link></li>
          <li><Link to="/predictions"><FontAwesomeIcon icon={faChartLine} /> Prédictions</Link></li>
          <li><Link to="/server"><FontAwesomeIcon icon={faServer} /> Serveur</Link></li>
          <li><Link to="/map-drone"><FontAwesomeIcon icon={faMapMarkedAlt} /> Carte Drone</Link></li>
        </ul>
      </div>

      {/* Carte plein écran sauf sidebar */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater position={position} />
          <Marker
            position={position}
            icon={L.icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              Drone position :<br /> {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapDrone;
