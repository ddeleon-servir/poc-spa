import React, { useEffect, useState } from 'react';
import Select from './components/Select';

export default function NuevoCargoPlanilla() {
  const [model, setModel] = useState({
    areas: [],
    contratos: [],
    rubros: [],
    centrosCosto: [],
    ubicaciones: [],
    regiones: [],
    tarifas: [],
  });
  const [form, setForm] = useState({
    areaSeleccionada: '',
    contratoSeleccionado: '',
    rubroSeleccionado: '',
    centroCostoSeleccionado: '',
    ubicacionSeleccionada: '',
    regionSeleccionada: '',
    tarifaSeleccionada: '',
    fechaCargoString: new Date().toISOString().slice(0, 10),
    cantidadUnidad: '',
    cantidadUnidadExtras: '',
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/areas').then(r => r.json()),
      fetch('/api/contratos').then(r => r.json()),
      fetch('/api/rubros').then(r => r.json()),
      fetch('/api/centros-costo').then(r => r.json()),
      fetch('/api/ubicaciones').then(r => r.json()),
      fetch('/api/regiones').then(r => r.json()),
      fetch('/api/tarifas').then(r => r.json()),
    ]).then(([areas, contratos, rubros, centrosCosto, ubicaciones, regiones, tarifas]) => {
      setModel({ areas, contratos, rubros, centrosCosto, ubicaciones, regiones, tarifas });
    });
  }, []);

  function handleSelect(name, value) {
    setForm({ ...form, [name]: value });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      <Select
        label="Área:"
        name="areaSeleccionada"
        options={model.areas}
        value={form.areaSeleccionada}
        onChange={e => handleSelect('areaSeleccionada', e.target.value)}
      />
      <Select
        label="Empleado:"
        name="contratoSeleccionado"
        options={model.contratos}
        value={form.contratoSeleccionado}
        onChange={e => handleSelect('contratoSeleccionado', e.target.value)}
        optionLabel="codigoNombreCompleto"
        optionValue="id"
      />
      <Select
        label="Rubro:"
        name="rubroSeleccionado"
        options={model.rubros}
        value={form.rubroSeleccionado}
        onChange={e => handleSelect('rubroSeleccionado', e.target.value)}
        optionLabel="abreviaturaNombre"
        optionValue="id"
      />
      <Select
        label="Centro de costo:"
        name="centroCostoSeleccionado"
        options={model.centrosCosto}
        value={form.centroCostoSeleccionado}
        onChange={e => handleSelect('centroCostoSeleccionado', e.target.value)}
        optionLabel="abreviaturaCentroCosto"
        optionValue="id"
      />
      <Select
        label="Ubicación:"
        name="ubicacionSeleccionada"
        options={model.ubicaciones}
        value={form.ubicacionSeleccionada}
        onChange={e => handleSelect('ubicacionSeleccionada', e.target.value)}
        optionLabel="abreviaturaUbicacion"
        optionValue="id"
      />
      <Select
        label="Región:"
        name="regionSeleccionada"
        options={model.regiones}
        value={form.regionSeleccionada}
        onChange={e => handleSelect('regionSeleccionada', e.target.value)}
        optionLabel="idAbreviatura"
        optionValue="id"
      />
      <Select
        label="Tarifa:"
        name="tarifaSeleccionada"
        options={model.tarifas}
        value={form.tarifaSeleccionada}
        onChange={e => handleSelect('tarifaSeleccionada', e.target.value)}
        optionLabel="nombre"
        optionValue="id"
      />
      <label>Cantidad unidad:
        <input type="number" name="cantidadUnidad" value={form.cantidadUnidad} onChange={handleChange} />
      </label>
      <label>Cantidad unidad extraordinario:
        <input type="number" name="cantidadUnidadExtras" value={form.cantidadUnidadExtras} onChange={handleChange} />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
}