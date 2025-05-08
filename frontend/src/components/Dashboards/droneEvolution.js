import React, { useEffect, useState, useRef } from "react";
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

const MAX_DATA_POINTS = 20; // Limite à 20 points

const DroneEvolution = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedData, setDisplayedData] = useState({
    labels: [],
    altitudes: [],
    humidities: [],
    temperatures: [],
    locations: []
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Altitude (m)",
        data: [],
        borderColor: "#3e95cd",
        backgroundColor: "#3e95cd",
        fill: false,
        tension: 0.1, // Réduire la tension pour des courbes plus douces
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        borderJoinStyle: 'round' // Pour des lignes plus lisses
      }
    ]
  });

  const fetchData = async () => {
    try {
      const humidityData = await fetchhumidityData();
      const tempData = await fetchTempData();

      if (humidityData?.length > 0 && tempData?.length > 0) {
        const labels = humidityData.map(item => 
          new Date(item.date_registrationDate).toLocaleTimeString()
        );
        const altitudes = humidityData.map(item => item.altitude);
        const humidities = humidityData.map(item => item.data);
        const temperatures = tempData.map(item => item.data);
        const locations = humidityData.map(item => item.geographicalZone);

        // Garder seulement les 20 derniers points
        const slicedData = {
          labels: labels.slice(-MAX_DATA_POINTS),
          altitudes: altitudes.slice(-MAX_DATA_POINTS),
          humidities: humidities.slice(-MAX_DATA_POINTS),
          temperatures: temperatures.slice(-MAX_DATA_POINTS),
          locations: locations.slice(-MAX_DATA_POINTS)
        };

        setDisplayedData(slicedData);
      }
      setLoading(false);
    } catch (err) {
      console.error("Erreur de chargement:", err);
      setError(err);
      setLoading(false);
    }
  };

  // Animation progressive
  useEffect(() => {
    if (displayedData.altitudes.length === 0) return;

    const animationInterval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = Math.min(prev + 1, displayedData.altitudes.length - 1);
        
        setChartData({
          labels: displayedData.labels.slice(0, nextIndex + 1),
          datasets: [{
            ...chartData.datasets[0],
            data: displayedData.altitudes.slice(0, nextIndex + 1)
          }]
        });

        if (nextIndex >= displayedData.altitudes.length - 1) {
          clearInterval(animationInterval);
        }
        return nextIndex;
      });
    }, 1000); // Ajoute un point toutes les secondes

    return () => clearInterval(animationInterval);
  }, [displayedData]);

  useEffect(() => {
    fetchData();
    
    const refreshInterval = setInterval(() => {
      setLastUpdate(Date.now());
    }, 5000); // Rafraîchissement des données toutes les 5 secondes

    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Altitude (mètres)",
          font: {
            weight: "bold"
          }
        },
        ticks: {
          callback: function(value) {
            return value + "m";
          }
        }
      },
      x: {
        title: {
          display: true,
          text: "Heure de mesure",
          font: {
            weight: "bold"
          }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const index = context.dataIndex;
            return [
              `Altitude: ${context.raw}m`,
              `Température: ${displayedData.temperatures[index]}°C`,
              `Humidité: ${displayedData.humidities[index]}%`,
              `Position: ${displayedData.locations[index]}`
            ];
          }
        }
      },
      title: {
        display: true,
        text: "Évolution de l'altitude du drone en temps réel",
        font: {
          size: 18
        },
        padding: {
          top: 10,
          bottom: 20
        }
      }
    },
    animation: {
      duration: 2000, // Animation plus longue
      easing: "easeOutQuad"
    }
  };

  if (loading) return <div className="loading-message">Chargement des données en cours...</div>;
  if (error) return <div className="error-message">Erreur: {error.message}</div>;

  return (
    <div className="drone-altitude-chart-container">
      <div className="chart-wrapper">
        <Line 
          ref={chartRef}
          data={chartData} 
          options={options} 
          height={400}
          updateMode="active"
        />
      </div>
    </div>
  );
};

export default DroneEvolution;