import React, { useEffect, useState } from 'react';

export default function NuevoCargoPlanilla() {
  const [model, setModel] = useState({});
  const [form, setForm] = useState({
    areaSeleccionada: null,
    contratoSeleccionado: null,
    rubroSeleccionado: null,
    centroCostoSeleccionado: null,
    ubicacionSeleccionada: null,
    regionSeleccionada: null,
    tarifaSeleccionada: null,
    cantidadUnidad: '',
    cantidadUnidadExtras: '',
    fechaCargoString: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/centros-costo').then(r => r.json()),
      fetch('/api/ubicaciones').then(r => r.json()),
      fetch('/api/areas').then(r => r.json()),
      fetch('/api/regiones').then(r => r.json()),
      fetch('/api/tarifas').then(r => r.json()),
      fetch('/api/rubros').then(r => r.json()),
      fetch('/api/contratos').then(r => r.json()),
    ]).then(([centrosCosto, ubicaciones, areas, regiones, tarifas, rubros, contratos]) => {
      setModel({ centrosCosto, ubicaciones, areas, regiones, tarifas, rubros, contratos });
    });
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSelect(name, value) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('/api/cargo-planilla', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(r => r.json()).then(result => {
      alert(result.message);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Fecha:
        <input type="date" name="fechaCargoString" value={form.fechaCargoString} onChange={handleChange} />
      </label>
      <label>Área:
        <select name="areaSeleccionada" onChange={e => handleSelect('areaSeleccionada', e.target.value)}>
          <option value="">Seleccione un área</option>
          {model.areas?.map(a => <option key={a.id} value={a.id}>{a.descripcion}</option>)}
        </select>
      </label>
      {/* Repite para los demás campos */}
      <button type="submit">Guardar</button>
    </form>
  );
}