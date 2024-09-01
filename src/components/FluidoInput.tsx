import React from 'react';
import { FluidoData } from '../types/types';

interface FluidoInputProps {
    index: number;
    fluido: FluidoData;
    handleChange: (index: number, field: keyof FluidoData, value: string) => void;
}

const FluidoInput: React.FC<FluidoInputProps> = ({ index, fluido, handleChange }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleChange(index, name as keyof FluidoData, value);
    };

    return (
        <div className="form-group">
            <h3>Fluido {index + 1}</h3>
            <label>
                Nombre:
                <input
                    type="text"
                    name="nombre"
                    value={fluido.nombre}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Densidad (kg/m³):
                <input
                    type="number"
                    name="densidad"
                    value={fluido.densidad}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Altura (metros):
                <input
                    type="number"
                    name="altura"
                    value={fluido.altura}
                    onChange={handleInputChange}
                />
            </label>
        </div>
    );
};

export default FluidoInput;
