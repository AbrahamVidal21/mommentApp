// src/components/FluidoInput.tsx
import React from 'react';

interface FluidoInputProps {
    index: number;
    fluido: FluidoData;
    handleChange: (index: number, field: keyof FluidoData, value: string) => void;
}

const FluidoInput: React.FC<FluidoInputProps> = ({ index, fluido, handleChange }) => {
    return (
        <div className="card">
            <div className="card-header">Fluido {index + 1}</div>
            <label>
                Nombre del fluido {index + 1}:
                <input
                    type="text"
                    value={fluido.nombre}
                    placeholder={`Fluido${index + 1}`}
                    onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                />
            </label>
            <label>
                Densidad (kg/m³):
                <input
                    type="number"
                    value={fluido.densidad}
                    placeholder="1000"
                    onChange={(e) => handleChange(index, 'densidad', e.target.value)}
                />
            </label>
            <label>
                Altura (m):
                <input
                    type="number"
                    value={fluido.altura}
                    placeholder="2"
                    onChange={(e) => handleChange(index, 'altura', e.target.value)}
                />
            </label>
        </div>
    );
};

export default FluidoInput;
