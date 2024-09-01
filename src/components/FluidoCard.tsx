import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { FluidoData } from '../types/types';
import './FluidoCard.css';

// Configurar Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface FluidoCardProps {
    fluido: FluidoData;
}

const FluidoCard: React.FC<FluidoCardProps> = ({ fluido }) => {
    const { nombre, densidad, altura } = fluido;

    const data = {
        labels: [nombre],
        datasets: [
            {
                label: `Altura (${nombre})`,
                data: [altura],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="fluido-card">
            <h3>{nombre}</h3>
            <p>Densidad: {densidad} kg/m³</p>
            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default FluidoCard;
