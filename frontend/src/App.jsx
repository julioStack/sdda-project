import { useState } from "react";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [tipoPersona, setTipoPersona] = useState("Natural");
  const [pais, setPais] = useState("Panamá");
  const [actividad, setActividad] = useState("");

  const [registros, setRegistros] = useState([]);

  const registrarTercero = (e) => {
    e.preventDefault();

    const nuevoRegistro = {
      nombre,
      tipoPersona,
      pais,
      actividad,
    };

    setRegistros([...registros, nuevoRegistro]);

    setNombre("");
    setTipoPersona("Natural");
    setPais("Panamá");
    setActividad("");
  };

  return (
    <div className="container">
      <h1>Sistema de Debida Diligencia Anticorrupción (SDDA)</h1>

      <form className="formulario" onSubmit={registrarTercero}>
        <label>Nombre del tercero</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Tipo de persona</label>
        <select
          value={tipoPersona}
          onChange={(e) => setTipoPersona(e.target.value)}
        >
          <option>Natural</option>
          <option>Jurídica</option>
        </select>

        <label>País</label>
        <select value={pais} onChange={(e) => setPais(e.target.value)}>
          <option>Panamá</option>
          <option>Costa Rica</option>
          <option>Colombia</option>
        </select>

        <label>Actividad económica</label>
        <input
          type="text"
          value={actividad}
          onChange={(e) => setActividad(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>
      </form>

      <h2>Registros Realizados</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo Persona</th>
            <th>País</th>
            <th>Actividad</th>
          </tr>
        </thead>

        <tbody>
          {registros.map((registro, index) => (
            <tr key={index}>
              <td>{registro.nombre}</td>
              <td>{registro.tipoPersona}</td>
              <td>{registro.pais}</td>
              <td>{registro.actividad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;