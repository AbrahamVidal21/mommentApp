import React, { useState } from 'react';
import FluidoInput from './components/FluidoInput';
import FluidoCard from './components/fluidoCard'
import { FluidoData } from './types/types';
import { validateForm } from './formValidation'; // Importa el archivo de validación
import './style.css';

const App: React.FC = () => {
  const [fluidoCount, setFluidoCount] = useState<number>(3);
  const [fluidoData, setFluidoData] = useState<FluidoData[]>(
    Array.from({ length: fluidoCount }, () => ({
      nombre: '',
      densidad: 1000,
      altura: 2,
    }))
  );
  const [anchoTanque, setAnchoTanque] = useState<number>(5);
  const [presionAtmosferica, setPresionAtmosferica] = useState<number>(101325);
  const [gravedad, setGravedad] = useState<number>(9.81);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, field: keyof FluidoData, value: string) => {
    setFluidoData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [field]: field === 'densidad' || field === 'altura' ? parseFloat(value) : value
      };
      return updatedData;
    });
  };

  const handleFluidoCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value, 10);
    setFluidoCount(count);
    setFluidoData(Array.from({ length: count }, () => ({
      nombre: '',
      densidad: 1000,
      altura: 2,
    })));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'anchoTanque') {
      setAnchoTanque(parseFloat(value));
    } else if (name === 'presionAtmosferica') {
      setPresionAtmosferica(parseFloat(value));
    } else if (name === 'gravedad') {
      setGravedad(parseFloat(value));
    }
  };

  const calculateResults = () => {
    // Validar que todos los campos están completos
    const isValid = validateForm(fluidoData, anchoTanque, presionAtmosferica, gravedad);
    if (!isValid) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    setError(null);

    let presionAbsolutaTotal = presionAtmosferica;
    let fuerzaTotal = 0;
    let momentoTotal = 0;
    let alturaAcumulada = 0;

    fluidoData.forEach((fluido) => {
      const { densidad, altura } = fluido;
      const presionFluido = densidad * gravedad * altura;
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
      <div className="form-group">
        <label>
          Ancho del tanque (metros):
          <input
            type="number"
            name="anchoTanque"
            value={anchoTanque}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Presión atmosférica (Pascales):
          <input
            type="number"
            name="presionAtmosferica"
            value={presionAtmosferica}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Gravedad (m/s²):
          <input
            type="number"
            name="gravedad"
            value={gravedad}
            onChange={handleInputChange}
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
      {error && <div className="error">{error}</div>}

      {/* Añadir el componente FluidoCard aquí */}
      <div className="fluido-cards">
        {fluidoData.map((fluido, index) => (
          <FluidoCard key={index} fluido={fluido} />
        ))}
      </div>
    </div>
  );
};

export default App;
