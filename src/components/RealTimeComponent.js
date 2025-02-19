// frontend/src/components/RealTimeComponent.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const RealTimeComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Conectar al WebSocket del backend
    const socket = io('http://localhost:3001'); // Asegúrate de que el puerto sea el correcto

    // Escuchar el evento 'newData' que se emite desde el servidor
    socket.on('newData', (newData) => {
      console.log('Datos en tiempo real recibidos:', newData);
      setData(newData); // Actualizar el estado con los nuevos datos
    });

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Datos en Tiempo Real</h1>
      <p>{data ? JSON.stringify(data) : 'Cargando datos...'}</p>
    </div>
  );
};

export default RealTimeComponent;
