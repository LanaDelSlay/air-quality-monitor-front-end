import * as React from 'react';
import Box from '@mui/material/Box';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Graph() {
  const [sensorData, setSensorData] = useState([]);
  const [seriesNb] = useState(5);
  const [itemNb] = useState(8);

  useEffect(() => {
    const fetchSensorData = () => {
      console.log("Fetching sensor data"); 
      axios.get('http://localhost:8080/sensorData/logs/84cca8bf28') // Change me to grab all sensor data last 30 days
        .then((res) => {
          setSensorData(res.data.slice(-20).reverse());
        })
        .catch((error) => {
          console.error("Error fetching sensor data", error);
        });
    };

    fetchSensorData();
    const interval = setInterval(() => {
      fetchSensorData();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const valueFormatter = (value, label) => {
    switch (label) {
      case 'Toluene PPM':
      case 'Formaldehyde PPM':
        return `${value}ppm`;
      case 'Voc Count':
        return `${value} count`;
      case 'Humidity %':
        return `${value}%`;
      case 'Temperature':
        return `${value}°F`;
      default:
        return value;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const series = [
    {
      label: 'Toluene PPM',
      data: sensorData.map((data) => data.toluenePpm),
    },
    {
      label: 'Formaldehyde PPM',
      data: sensorData.map((data) => data.formaldehydePpm),
    },
    {
      label: 'Voc Count',
      data: sensorData.map((data) => data.vocCount),
    },
    {
      label: 'Humidity %',
      data: sensorData.map((data) => data.humidity),
    },
    {
      label: 'Temperature',
      data: sensorData.map((data) => data.temperature),
    },
  ].map((s) => ({ ...s, highlightScope }));

  const xLabels = sensorData.map((data) => formatDate(data.timestamp));

  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        height={450}
        series={series
          .slice(0, seriesNb)
          .map((s) => ({
            ...s,
            data: s.data.slice(0, itemNb),
            valueFormatter: (value) => valueFormatter(value, s.label),
          }))}
        xAxis={[{ data: xLabels.slice(0, itemNb), scaleType: 'band' }]}
        skipAnimation={false}
      />
    </Box>
  );
}

const highlightScope = {
  highlight: 'series',
  fade: 'global',
};
