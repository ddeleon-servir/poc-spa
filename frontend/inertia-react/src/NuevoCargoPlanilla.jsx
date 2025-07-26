import React, { useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import Select from '../components/Select';

export default function NuevoCargoPlanilla({
  areas,
  contratos,
  rubros,
  centrosCosto,
  ubicaciones,
  regiones,
  tarifas,
  cargoPlanillaId,
}) {
  const { data, setData, post } = useForm({
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

  // Filtrado de selects dependientes
  const rubroObj = useMemo(
    () => rubros.find(r => r.id === data.rubroSeleccionado),
    [data.rubroSeleccionado, rubros]
  );

  const centrosCostoFiltrados = useMemo(() => {
    if (rubroObj) {
      return centrosCosto.filter(c =>
        !rubroObj.centroCosto || c.id === rubroObj.centroCosto.id
      );
    }
    return centrosCosto;
  }, [rubroObj, centrosCosto]);

  const ubicacionesFiltradas = useMemo(() => {
    if (rubroObj) {
      return ubicaciones.filter(u =>
        !rubroObj.ubicacion || u.id === rubroObj.ubicacion.id
      );
    }
    return ubicaciones;
  }, [rubroObj, ubicaciones]);

  const regionesFiltradas = useMemo(() => {
    if (rubroObj) {
      return regiones.filter(r =>
        !rubroObj.region || r.id === rubroObj.region.id
      );
    }
    return regiones;
  }, [rubroObj, regiones]);

  const tarifasFiltradas = useMemo(() => {
    if (rubroObj) {
      return tarifas.filter(t => {
        if (!t.rubro) return true;
        if (!data.fechaCargoString) return t.rubro.id === rubroObj.id;
        const fechaCargo = new Date(data.fechaCargoString + ' 00:00:00');
        const fechaInicioTarifa = new Date(t.fechaInicio + ' 00:00:00');
        const fechaFinTarifa = new Date(t.fechaFin + ' 00:00:00');
        return t.rubro.id === rubroObj.id &&
          fechaInicioTarifa <= fechaCargo && fechaCargo <= fechaFinTarifa;
      });
    }
    return tarifas;
  }, [rubroObj, tarifas, data.fechaCargoString]);

  function handleChange(e) {
    setData(e.target.name, e.target.value);
  }

  function handleSelect(name, value) {
    setData(name, value);
    if (name === 'rubroSeleccionado') {
      const rubro = rubros.find(r => r.id === value);
      setData('centroCostoSeleccionado', rubro?.centroCosto?.id || '');
      setData('ubicacionSeleccionada', rubro?.ubicacion?.id || '');
      setData('regionSeleccionada', rubro?.region?.id || '');
      // Actualiza tarifa automáticamente
      const tarifa = tarifasFiltradas[0];
      setData('tarifaSeleccionada', tarifa ? tarifa.id : '');
    }
    if (name === 'fechaCargoString' && data.rubroSeleccionado) {
      // Actualiza tarifa si cambia la fecha
      const tarifa = tarifasFiltradas[0];
      setData('tarifaSeleccionada', tarifa ? tarifa.id : '');
    }
  }

  function submitForm(e) {
    e.preventDefault();
    post('/cargo-planilla');
  }

  return (
    <section className="box">
      <div className="header no-icon">
        <h3>{cargoPlanillaId ? 'Editar cargo de planilla' : 'Nuevo cargo de planilla'}</h3>
      </div>
      <form onSubmit={submitForm} className="block-content form">
        <fieldset>
          <legend>Datos generales</legend>
          <div className="form-group">
            <label htmlFor="fechaCargoString">Fecha:</label>
            <input
              type="date"
              name="fechaCargoString"
              value={data.fechaCargoString}
              onChange={e => handleSelect('fechaCargoString', e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-row">
            <Select
              label="Área:"
              name="areaSeleccionada"
              options={areas}
              value={data.areaSeleccionada}
              onChange={e => handleSelect('areaSeleccionada', e.target.value)}
              optionLabel="descripcion"
              optionValue="id"
            />
          </div>
          <div className="form-row">
            <Select
              label="Empleado:"
              name="contratoSeleccionado"
              options={contratos}
              value={data.contratoSeleccionado}
              onChange={e => handleSelect('contratoSeleccionado', e.target.value)}
              optionLabel="codigoNombreCompleto"
              optionValue="id"
            />
            <Select
              label="Rubro:"
              name="rubroSeleccionado"
              options={rubros}
              value={data.rubroSeleccionado}
              onChange={e => handleSelect('rubroSeleccionado', e.target.value)}
              optionLabel="abreviaturaNombre"
              optionValue="id"
            />
            <Select
              label="Cultivo (Centro de costo):"
              name="centroCostoSeleccionado"
              options={centrosCostoFiltrados}
              value={data.centroCostoSeleccionado}
              onChange={e => handleSelect('centroCostoSeleccionado', e.target.value)}
              optionLabel="abreviaturaCentroCosto"
              optionValue="id"
            />
            <Select
              label="Región mayor (Ubicación):"
              name="ubicacionSeleccionada"
              options={ubicacionesFiltradas}
              value={data.ubicacionSeleccionada}
              onChange={e => handleSelect('ubicacionSeleccionada', e.target.value)}
              optionLabel="abreviaturaUbicacion"
              optionValue="id"
            />
            {regiones.length > 0 && (
              <Select
                label="Región menor (región):"
                name="regionSeleccionada"
                options={regionesFiltradas}
                value={data.regionSeleccionada}
                onChange={e => handleSelect('regionSeleccionada', e.target.value)}
                optionLabel="idAbreviatura"
                optionValue="id"
              />
            )}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cantidad-unidad">Cantidad unidad:</label>
              <input
                type="number"
                name="cantidadUnidad"
                value={data.cantidadUnidad}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cantidad-unidad-extra">Cantidad unidad extraordinario:</label>
              <input
                type="number"
                name="cantidadUnidadExtras"
                value={data.cantidadUnidadExtras}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <Select
              label="Tarifa:"
              name="tarifaSeleccionada"
              options={tarifasFiltradas}
              value={data.tarifaSeleccionada}
              onChange={e => handleSelect('tarifaSeleccionada', e.target.value)}
              optionLabel="nombre"
              optionValue="id"
            />
          </div>
        </fieldset>
        <button type="submit" className="btn">Guardar</button>
      </form>
    </section>
  );
}