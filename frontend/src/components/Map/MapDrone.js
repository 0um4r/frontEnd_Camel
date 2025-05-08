import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-polylinedecorator';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faCog,
  faServer,
  faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons';

import { fetchLatestTemperatureData, getHistory } from "../../services/TempDataService";

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

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position[0] !== 0 && position[1] !== 0) {
      map.setView(position);
    }
  }, [position, map]);
  return null;
};

const MapDrone = () => {
  const [position, setPosition] = useState([22.085, -11.7623]);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pointNumber, setPointNumber] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [path, setPath] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const timerRef = useRef(null);
  const fetchIntervalRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLatestTemperatureData();
        const [lat, lng] = parseGeographicalZone(data.geographicalZone);
        setPosition([lat, lng]);
      } catch (err) {
        console.error("Erreur chargement coord:", err);
      }
    };

    if (!isSimulating) {
      fetchData();
      fetchIntervalRef.current = setInterval(fetchData, 2000);
    }

    return () => clearInterval(fetchIntervalRef.current);
  }, [isSimulating]);

  const startSimulation = async (numPoints) => {
    if (isSimulating) return;

    try {
      const data = await getHistory(numPoints);
      const parsed = data.map(item => parseGeographicalZone(item.geographicalZone)).slice(0, numPoints);
      setHistory(parsed);
      setPath([parsed[0]]);
      setPosition(parsed[0]);
      setCurrentIndex(0);
      setIsSimulating(true);
      clearInterval(fetchIntervalRef.current);

      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIndex = prev + 1;
          if (nextIndex >= parsed.length) {
            clearInterval(timerRef.current);
            setIsSimulating(false);
            setShowPrompt(true);
            setTimeout(() => setPath([]), 1000);
            return prev;
          }
          const nextPosition = parsed[nextIndex];
          setPosition(nextPosition);
          setPath(p => [...p, nextPosition]);
          return nextIndex;
        });
      }, 1000);
    } catch (err) {
      console.error("Erreur simulation historique:", err);
    }
  };

  const stopSimulation = () => {
    clearInterval(timerRef.current);
    setIsSimulating(false);
    setShowPrompt(true);
    setTimeout(() => setPath([]), 1000);
  };

  useEffect(() => {
    if (!path || path.length < 2) return;
    const map = mapRef.current;
    if (!map) return;

    if (map._arrowDecorator) {
      map.removeLayer(map._arrowDecorator);
    }

    const decorator = L.polylineDecorator(path, {
      patterns: [
        {
          offset: '100%',
          repeat: 0,
          symbol: L.Symbol.arrowHead({
            pixelSize: 20,
            headAngle: 45,
            pathOptions: {
              stroke: true,
              color: 'red',
              weight: 4,
              opacity: 0.9
            }
          })
        }
      ]
    });

    decorator.addTo(map);
    map._arrowDecorator = decorator;
  }, [path]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div className="sidebar">
        <ul>
          <li><Link to="/home"><FontAwesomeIcon icon={faHome} /> HomePage</Link></li>
          <li><Link to="/profile"><FontAwesomeIcon icon={faUser} /> Profil</Link></li>
          <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> Paramètres</Link></li>
          <li><Link to="/server"><FontAwesomeIcon icon={faServer} /> Serveur</Link></li>
          <li><Link to="/map-drone"><FontAwesomeIcon icon={faMapMarkedAlt} /> Carte Drone</Link></li>
        </ul>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <MapContainer
          ref={mapRef}
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
              Position Drone :<br /> {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </Popup>
          </Marker>

          {path.length > 1 && (
            <>
              <Polyline positions={path} color="blue" />

              <Marker position={path[0]} icon={L.icon({
                iconUrl: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|00ff00|000000",
                iconSize: [21, 34],
                iconAnchor: [10, 34],
              })}>
                <Popup>Départ</Popup>
              </Marker>

              <Marker position={path[path.length - 1]} icon={L.icon({
                iconUrl: "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=A|ff0000|000000",
                iconSize: [21, 34],
                iconAnchor: [10, 34],
              })}>
                <Popup>Arrivée</Popup>
              </Marker>
            </>
          )}
        </MapContainer>

        <div style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "#ffffffee",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.2)",
          zIndex: 1000,
          minWidth: "220px",
          textAlign: "center"
        }}>
          {showPrompt && (
            <>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                Voulez-vous voir l’historique des déplacements ?
              </p>
              <button
                onClick={() => {
                  setShowPrompt(false);
                  setShowInput(true);
                }}
                style={buttonStyle}
              >
                Démarrer
              </button>
            </>
          )}

          {showInput && (
            <>
              <p style={{ marginBottom: "5px" }}>Entrez le nombre de points :</p>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ex: 10"
                style={{
                  width: "80%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  textAlign: "center"
                }}
              />
              <button
                onClick={() => {
                  const number = parseInt(inputValue);
                  if (!isNaN(number) && number > 0) {
                    setPointNumber(number);
                    setShowInput(false);
                    startSimulation(number);
                  }
                }}
                style={buttonStyle}
              >
                Confirmer
              </button>
            </>
          )}

          {!showPrompt && !showInput && isSimulating && (
            <>
              <button onClick={stopSimulation} style={{ ...buttonStyle, backgroundColor: "#e74c3c" }}>
                Arrêter
              </button>
              <div style={{ marginTop: "10px", fontSize: "14px" }}>
                Progression : {currentIndex + 1} / {Math.min(pointNumber, history.length)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#3498db",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: "5px"
};

export default MapDrone;
