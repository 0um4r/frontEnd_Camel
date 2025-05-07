import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchhumidityData } from "../../services/HumidityService";
import { fetchTempData } from "../../services/TempDataService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DroneEvolution = () => {
  const [loading, setLoading] = useState(true);
  const [humidities, setHumidities] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [altitude, setAltitude] = useState([]);
  const [latitude_longitude, setLatitude_longitude] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const humidityData = await fetchhumidityData();
        const tempData = await fetchTempData();
        
        if (humidityData === null || tempData === null) {
          console.log("No data available for humidity or temperature");
          setHumidities([]);
          setTemperatures([]);
          setTimestamps([]);
          setAltitude([]);
          setLatitude_longitude([]);
          setLoading(false);
        }else
        {

        const humidityValues = humidityData.map((d) => d.data);
        const tempValues = tempData.map((d) => d.data);
        const timeLabels = humidityData.map((d) =>
          new Date(d.date_registrationDate).toISOString().split("T")[1]
        );
        const altitudeValues = humidityData.map((d) => d.altitude);
        const latLonValues = humidityData.map((d) => d.geographicalZone);
    
        const sliceLast = (arr) => arr.slice(-8);
    
        setHumidities(sliceLast(humidityValues));
        setTemperatures(sliceLast(tempValues));
        setTimestamps(sliceLast(timeLabels));
        setAltitude(sliceLast(altitudeValues));
        setLatitude_longitude(sliceLast(latLonValues));
        setLoading(false);
      }
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };
    loadData();
    const interval = setInterval(() => {
      loadData();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // Data for the chart
  const data = {
    labels: timestamps, // Time stamps for the X-axis
    datasets: [
      {
        label: "Altitude",
        data: altitude, // Only the altitude data for Y-axis
        borderColor: "rgba(75,192,192,1)", // Altitude line color
        backgroundColor: "rgba(75,192,192,0.2)", // Altitude line background color
        fill: false, // Don't fill the area under the line
        tension: 0.1, // Smooth the line
        pointRadius: 5, // Radius of the points on the line
        pointHoverRadius: 10, // Radius when hovered
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          // Custom tooltip to show extra information on hover
          label: (context) => {
            const { datasetIndex, dataIndex } = context;
            let label = `${context.label} | Altitude: ${context.raw} meters`; // Show altitude

            // Adding additional data for temperature, humidity, and latitude/longitude
            if (datasetIndex === 0) {
              label += ` | Temp: ${temperatures[dataIndex]} °C`; // Temperature
              label += ` | Humidity: ${humidities[dataIndex]} %`; // Humidity
              label += ` | Location: ${latitude_longitude[dataIndex]}`; // Latitude/Longitude
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        text: "Evolution de la Température et l'Humidité par rapport à l'Altitude",
      },
    },
    animation: {
      duration: 500, // Animate over 1 second
    },
  };

  return (
    <div className="combined-chart-container">
      <h2>Altitude Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};
export default DroneEvolution;
