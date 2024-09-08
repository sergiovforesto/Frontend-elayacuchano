export const formatTime = (fecha: Date): string => {
    const ahora: Date = new Date();
    const fechaCreacion: Date = new Date(fecha);

    // Calcula la diferencia en milisegundos
    const diferencia: number = ahora.getTime() - fechaCreacion.getTime();

    // Convierte la diferencia a segundos
    const segundos: number = Math.floor(diferencia / 1000);

    if (segundos < 60) {
        return `(${segundos} ${segundos !== 1 ? 's' : ''})`;
    }

    // Convierte la diferencia a minutos
    const minutos: number = Math.floor(segundos / 60);
    if (minutos < 60) {
        return `(${minutos} ${minutos !== 1 ? 'min' : ''})`;
    }

    // Convierte la diferencia a horas
    const horas: number = Math.floor(minutos / 60);
    if (horas < 24) {
        return `(${horas} ${horas !== 1 ? 'h' : ''})`;
    }

    // Convierte la diferencia a días
    const dias: number = Math.floor(horas / 24);
    if (dias > 3) return '';
    return `(${dias} ${dias !== 1 ? 'd' : ''})`;
}