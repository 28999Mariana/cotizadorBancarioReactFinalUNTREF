import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './historial.css';

const Historial = () => {
  const [historialCotizaciones, setHistorialCotizaciones] = useState([]);

  useEffect(() => {
    const cargarHistorial = () => {
      const historialGuardado = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
      setHistorialCotizaciones(historialGuardado);
    };

    cargarHistorial();
  }, []);

  const retornoTablaHTML = (fila) => (
    <tr key={fila.fechaCotizacion}>
      <td>{fila.fechaCotizacion && new Date(fila.fechaCotizacion).toLocaleString('es-ES')}</td>
      <td>{fila.propiedad}</td>
      <td>{fila.ubicacion}</td>
      <td>{fila.metrosCuadrados}</td>
      <td>${fila.poliza && fila.poliza.toLocaleString()}</td>
    </tr>
  );

  const vaciarTabla = () => {
    localStorage.removeItem("historialCotizaciones");
    setHistorialCotizaciones([]);
  };

  return (
    <div className="container-coberturas container-historial center">
      <h2 className="center separador">Cotizaciones Historial</h2>


      <div className="center separador">
        {/*btn de retroceso */}
        <Link to="/">
          <button className="button button-outline">Go Back</button>
        </Link>
      </div>


      {historialCotizaciones.length > 0 ? (
        <>
          <button onClick={vaciarTabla}>Vaciar Tabla</button>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Property</th>
                <th>Location</th>
                <th>Square Meters</th>
                <th>Policy Price</th>
              </tr>
            </thead>
            <tbody>
              {historialCotizaciones.map((fila) => retornoTablaHTML(fila))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No hay cotizaciones en el historial.</p>
      )}
    </div>
  );
};

export default Historial;