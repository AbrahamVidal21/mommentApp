// src/App.tsx
import React, { useState } from 'react';
import FluidoInput from './components/FluidoInput';
import './style.css'

interface FluidoData {
  nombre: string;
  densidad: number;
  altura: number;
}

const App: React.FC = () => {
  const [fluidoCount, setFluidoCount] = useState<number>(2);
  const [fluidoData, setFluidoData] = useState<FluidoData[]>(
    Array.from({ length: fluidoCount }, () => ({
      nombre: '',
      densidad: 1000,
      altura: 2
    }))
  );

  const handleChange = (index: number, field: keyof FluidoData, value: string) => {
    setFluidoData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = field === 'densidad' || field === 'altura' ? parseFloat(value) : value;
      return updatedData;
    });
  };

  const handleFluidoCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    setFluidoCount(count);
    setFluidoData(Array.from({ length: count }, () => ({
      nombre: '',
      densidad: 1000,
      altura: 2
    })));
  };

  const calculateResults = () => {
    const Patm = 101325;
    const g = 9.81;
    const anchoTanque = 5;

    let presionAbsolutaTotal = Patm;
    let fuerzaTotal = 0;
    let momentoTotal = 0;
    let alturaAcumulada = 0;

    fluidoData.forEach((fluido) => {
      const { densidad, altura, nombre } = fluido;
      const presionFluido = densidad * g * altura;
      presionAbsolutaTotal += presionFluido;

      const areaFluido = altura * anchoTanque;
      const presionMediaFluido = presionFluido / 2;
      const fuerzaFluido = presionMediaFluido * areaFluido;

      fuerzaTotal += fuerzaFluido;

      const alturaCentroPresionFluido = (2 / 3) * altura + alturaAcumulada;
      const momentoFluido = alturaCentroPresionFluido * fuerzaFluido;
      momentoTotal += momentoFluido;

      alturaAcumulada += altura;
    });

    const alturaCentroPresionTotal = momentoTotal / fuerzaTotal;

    alert(`Resultados:
    \nPresión absoluta total en el fondo del tanque: ${presionAbsolutaTotal.toFixed(2)} Pascales
    \nFuerza total en la cara frontal del tanque: ${fuerzaTotal.toFixed(2)} N
    \nLa altura del centro de presión desde la base del tanque es: ${alturaCentroPresionTotal.toFixed(2)} metros`);
  };

  return (
    <div className="container">
      <h1>Simulación de Fluidos en Tanque</h1>
      <h2> Maestro en Vias Terrestre JESUS ABRAHAM VIDAL  </h2>
      <div className="form-group">
        <label>
          Número de fluidos:
          <input
            type="number"
            value={fluidoCount}
            onChange={handleFluidoCountChange}
          />
        </label>
      </div>
      {fluidoData.map((fluido, index) => (
        <FluidoInput
          key={index}
          index={index}
          fluido={fluido}
          handleChange={handleChange}
        />
      ))}
      <button onClick={calculateResults}>Calcular Resultados</button>
    </div>
  );
};

export default App;
