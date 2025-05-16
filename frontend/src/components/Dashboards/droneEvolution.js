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
import { fetchLatestTemperatureData as fetchLatestTemp } from "../../services/TempDataService";

// Dessine les flèches
const drawArrow = (ctx, fromX, fromY, toX, toY) => {
  const headlen = 24;
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fillStyle = "#ff6384";
  ctx.fill();
};

const arrowPlugin = {
  id: "arrowPlugin",
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    const data = chart.data.datasets[0].data;
    const xScale = chart.scales.x;
    const yScale = chart.scales.y;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i] == null || data[i + 1] == null) continue;
      const x1 = xScale.getPixelForValue(i);
      const y1 = yScale.getPixelForValue(data[i]);
      const x2 = xScale.getPixelForValue(i + 1);
      const y2 = yScale.getPixelForValue(data[i + 1]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#ff6384";
      ctx.lineWidth = 2;
      ctx.stroke();
      drawArrow(ctx, x1, y1, x2, y2);
    }
  },
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, arrowPlugin);

const DroneEvolution = ({ isSimulating = false, historyTempData = [], onSimulationEnd = () => {}, onProgress = () => {} }) => {
  const [labels, setLabels] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [zones, setZones] = useState([]);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);

  const simulationIntervalRef = useRef(null);
  const realtimeIntervalRef = useRef(null);
  const realtimeDataRef = useRef([]);

  // Real-time logic
  const fetchAndAppend = async () => {
    try {
      const latest = await fetchLatestTemp();
      if (!latest) return;

      const lastId = realtimeDataRef.current.at(-1)?.id;
      if (latest.id === lastId) return;

      // Ajouter à la liste
      realtimeDataRef.current.push(latest);

      // Si on dépasse 10, on reset et recommence
      if (realtimeDataRef.current.length > 10) {
        realtimeDataRef.current = [latest];
      }

      const temps = realtimeDataRef.current.map(item => item.data);
      const xLabels = realtimeDataRef.current.map(item => new Date(item.date_registrationDate).toLocaleTimeString());
      const zoneLabels = realtimeDataRef.current.map(item => item.geographicalZone);

      setTemperatures(temps);
      setLabels(xLabels);
      setZones(zoneLabels);
      setMinTemp(Math.min(...temps));
      setMaxTemp(Math.max(...temps));
    } catch (error) {
      console.error("Erreur dans fetchAndAppend:", error);
    }
  };

  // Real-time activation
 useEffect(() => {
  if (!isSimulating) {
    // Reset données pour mode réel
    realtimeDataRef.current = [];
    fetchAndAppend(); // Premier fetch immédiat
    realtimeIntervalRef.current = setInterval(fetchAndAppend, 2000);
  }

  return () => clearInterval(realtimeIntervalRef.current);
}, [isSimulating]);


  // Simulation setup
  useEffect(() => {
    if (isSimulating) {
      const xLabels = historyTempData.map(item => new Date(item.date_registrationDate).toLocaleTimeString());
      const zoneLabels = historyTempData.map(item => item.geographicalZone);
      const temps = historyTempData.map(item => item.data);

      setLabels(xLabels);
      setZones(zoneLabels);
      setTemperatures(Array(historyTempData.length).fill(null));
      setMinTemp(Math.min(...temps));
      setMaxTemp(Math.max(...temps));
    }
  }, [historyTempData, isSimulating]);

  const startSimulation = () => {
    let index = 0;
    const buffer = Array(historyTempData.length).fill(null);

    simulationIntervalRef.current = setInterval(() => {
      if (index >= historyTempData.length) {
        clearInterval(simulationIntervalRef.current);
        onSimulationEnd();
        setTemperatures([]);
        return;
      }
      buffer[index] = historyTempData[index].data;
      setTemperatures([...buffer]);
      onProgress(index);
      index++;
    }, 2000);
  };

  useEffect(() => {
    if (isSimulating) {
      startSimulation();
    }
    return () => clearInterval(simulationIntervalRef.current);
  }, [isSimulating]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Température (°C)",
        data: temperatures,
        borderColor: "#ff6384",
        backgroundColor: "#ff6384",
        tension: 0,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation:false,
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: minTemp,
        suggestedMax: maxTemp,
        title: {
          display: true,
          text: "Température (°C)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Heure de mesure",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Évolution de la température",
        font: { size: 18 },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            const index = context.dataIndex;
            const zone = zones[index] || "Zone inconnue";
            return `Temp: ${value}°C | Position: ${zone}`;
          },
        },
      },
    },
  };

  return <div style={{ height: 400 }}><Line data={chartData} options={options} /></div>;
};

export default DroneEvolution;
