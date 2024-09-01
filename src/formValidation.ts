import { FluidoData } from './types/types';

export const validateForm = (fluidoData: FluidoData[], anchoTanque: number, presionAtmosferica: number, gravedad: number): boolean => {
    // Verificar que todos los fluidos tengan nombre, densidad y altura
    for (const fluido of fluidoData) {
        if (!fluido.nombre || isNaN(fluido.densidad) || isNaN(fluido.altura)) {
            return false;
        }
    }

    // Verificar que el ancho del tanque, la presión atmosférica y la gravedad sean números válidos
    if (isNaN(anchoTanque) || isNaN(presionAtmosferica) || isNaN(gravedad)) {
        return false;
    }

    return true;
};
