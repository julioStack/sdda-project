import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Sistema de Debida Diligencia Anticorrupción (SDDA)</h1>

      <form className="formulario">
        <label>Nombre del tercero</label>
        <input type="text" placeholder="Ingrese el nombre" />

        <label>Tipo de persona</label>
        <select>
          <option>Natural</option>
          <option>Jurídica</option>
        </select>

        <label>País</label>
        <select>
          <option>Panamá</option>
          <option>Costa Rica</option>
          <option>Colombia</option>
        </select>

        <label>Actividad económica</label>
        <input type="text" placeholder="Ingrese la actividad" />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default App;