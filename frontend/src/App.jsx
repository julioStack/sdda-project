import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [nombre, setNombre] = useState("");
  const [tipoPersona, setTipoPersona] = useState("Natural");
  const [pais, setPais] = useState("Panamá");
  const [actividad, setActividad] = useState("");

  // Función para calcular riesgo (misma lógica original)
  const calcularRiesgo = () => {
    if (pais === "Colombia") return "Alto";
    if (tipoPersona === "Jurídica") return "Medio";
    return "Bajo";
  };

  // Carga inicial con manejo de errores
  const [registros, setRegistros] = useState(() => {
    const datosGuardados = localStorage.getItem("registrosSDDA");
    try {
      return datosGuardados ? JSON.parse(datosGuardados) : [];
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      return [];
    }
  });

  // Persistencia automática
  useEffect(() => {
    localStorage.setItem("registrosSDDA", JSON.stringify(registros));
  }, [registros]);

  const registrarTercero = (e) => {
    e.preventDefault();

    const riesgo = calcularRiesgo();

    const nuevoRegistro = {
      id: Date.now(), // ID único para usar como key
      nombre,
      tipoPersona,
      pais,
      actividad,
      riesgo,
    };

    setRegistros([...registros, nuevoRegistro]);

    // Limpiar formulario
    setNombre("");
    setTipoPersona("Natural");
    setPais("Panamá");
    setActividad("");
  };

  const eliminarRegistro = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      setRegistros(registros.filter((registro) => registro.id !== id));
    }
  };

  return (
    <div className="container">
      <h1 className="titulo-centrado">
        Sistema de Debida Diligencia Anticorrupción (SDDA)
      </h1>

      <form className="formulario" onSubmit={registrarTercero}>
        <label htmlFor="nombre">Nombre del tercero</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="tipoPersona">Tipo de persona</label>
        <select
          id="tipoPersona"
          value={tipoPersona}
          onChange={(e) => setTipoPersona(e.target.value)}
        >
          <option>Natural</option>
          <option>Jurídica</option>
        </select>

        <label htmlFor="pais">País</label>
        <select
          id="pais"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
        >
          <option>Panamá</option>
          <option>Costa Rica</option>
          <option>Colombia</option>
        </select>

        <label htmlFor="actividad">Actividad económica</label>
        <input
          id="actividad"
          type="text"
          value={actividad}
          onChange={(e) => setActividad(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>
      </form>

      <h2>Registros Realizados</h2>
      <p>Total de registros: {registros.length}</p>
      <p>
        Riesgo Bajo: {registros.filter((r) => r.riesgo === "Bajo").length}
      </p>
      <p>
        Riesgo Medio: {registros.filter((r) => r.riesgo === "Medio").length}
      </p>
      <p>
        Riesgo Alto: {registros.filter((r) => r.riesgo === "Alto").length}
      </p>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo Persona</th>
            <th>País</th>
            <th>Actividad</th>
            <th>Riesgo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id}>
              <td>{registro.id}</td>
              <td>{registro.nombre}</td>
              <td>{registro.tipoPersona}</td>
              <td>{registro.pais}</td>
              <td>{registro.actividad}</td>
              <td>{registro.riesgo}</td>
              <td>
                <button onClick={() => eliminarRegistro(registro.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;