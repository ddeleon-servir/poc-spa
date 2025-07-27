import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Select from 'react-select';
import FlashMessage from '../../components/FlashMessage';

function Index({ cargoPlanillaId, centrosCosto, ubicaciones, areas, contratos, rubros, tarifas, regiones, flash }) {
  const [fechaCargo, setFechaCargo] = useState('');
  const [areaSeleccionada, setAreaSeleccionada] = useState(null);
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null);
  const [rubroSeleccionado, setRubroSeleccionado] = useState(null);
  const [centroCostoSeleccionado, setCentroCostoSeleccionado] = useState(null);
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState(null);
  const [regionSeleccionada, setRegionSeleccionada] = useState(null);
  const [tarifaSeleccionada, setTarifaSeleccionada] = useState(null);
  const [cantidadUnidad, setCantidadUnidad] = useState('');
  const [cantidadUnidadExtras, setCantidadUnidadExtras] = useState('');
  const [mostrarRegionField, setMostrarRegionField] = useState(false);
  const [isDiaFestivo, setIsDiaFestivo] = useState(false);

  const handleSubmit = (e, saveAndAdd = false) => {
    e.preventDefault();
    const formData = {
      fechaCargo,
      areaSeleccionada,
      contratoSeleccionado,
      rubroSeleccionado,
      centroCostoSeleccionado,
      ubicacionSeleccionada,
      regionSeleccionada,
      tarifaSeleccionada,
      cantidadUnidad,
      cantidadUnidadExtras,
      saveAndAdd,
    };
    Inertia.post('/cargo-planilla', formData);
  };

  const handleFechaChange = (e) => {
    const date = new Date(e.target.value);
    setFechaCargo(e.target.value);
    const isSunday = date.getDay() === 0;
    setIsDiaFestivo(isSunday);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <FlashMessage message={flash.success} />
      <section className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <div className="border-b pb-2 mb-4">
          <h3 className="text-xl font-semibold">
            {cargoPlanillaId ? 'Editar cargo de planilla' : 'Nuevo cargo de planilla'}
          </h3>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <div className="flex justify-end space-x-2">
            <a href="/" className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              <img src="/icons/listado.png" alt="Listado" className="w-4 h-4 mr-2" />
              Listado
            </a>
            <button type="submit" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              <img src="/icons/save.png" alt="Save" className="w-4 h-4 mr-2" />
              Guardar
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <img src="/icons/save.png" alt="Save and Add" className="w-4 h-4 mr-2" />
              Guardar y crear otro
            </button>
          </div>

          <fieldset className="space-y-4">
            <legend className="text-lg font-medium">Datos generales</legend>

            <div className="space-y-2">
              <label htmlFor="fechaCargoString" className="block text-sm font-medium">
                Fecha:
              </label>
              <input
                type="date"
                id="fechaCargoString"
                value={fechaCargo}
                onChange={handleFechaChange}
                className="block w-full border rounded p-2"
              />
              {isDiaFestivo && <span className="text-red-600">Es día festivo</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="area" className="block text-sm font-medium">
                  Área:
                </label>
                <Select
                  options={areas}
                  getOptionLabel={(option) => `${option.id} | ${option.descripcion}`}
                  getOptionValue={(option) => option.id}
                  value={areaSeleccionada}
                  onChange={setAreaSeleccionada}
                  placeholder="Seleccione un área"
                  isClearable
                  className="basic-single"
                />
              </div>

              <div>
                <label htmlFor="contrato" className="block text-sm font-medium">
                  Empleado:
                </label>
                <Select
                  options={contratos}
                  getOptionLabel={(option) => option.codigoNombreCompleto}
                  getOptionValue={(option) => option.id}
                  value={contratoSeleccionado}
                  onChange={setContratoSeleccionado}
                  placeholder="Seleccione un empleado"
                  isClearable
                  className="basic-single"
                />
              </div>

              <div>
                <label htmlFor="rubro" className="block text-sm font-medium">
                  Rubro:
                </label>
                <Select
                  options={rubros}
                  getOptionLabel={(option) => option.abreviaturaNombre}
                  getOptionValue={(option) => option.id}
                  value={rubroSeleccionado}
                  onChange={setRubroSeleccionado}
                  placeholder="Seleccione una región menor (región) para ver las opciones"
                  isClearable
                  className="basic-single"
                />
              </div>

              <div>
                <label htmlFor="centro-de-costo" className="block text-sm font-medium">
                  Cultivo (Centro de costo):
                </label>
                <Select
                  options={centrosCosto}
                  getOptionLabel={(option) => option.displayText}
                  getOptionValue={(option) => option.id}
                  value={centroCostoSeleccionado}
                  onChange={setCentroCostoSeleccionado}
                  placeholder="Seleccione un cultivo"
                  isClearable
                  className="basic-single"
                />
              </div>

              <div>
                <label htmlFor="ubicacion" className="block text-sm font-medium">
                  Región mayor (Ubicación):
                </label>
                <Select
                  options={ubicaciones}
                  getOptionLabel={(option) => `${option.abreviatura} | ${option.descripcion}`}
                  getOptionValue={(option) => option.id}
                  value={ubicacionSeleccionada}
                  onChange={(option) => {
                    setUbicacionSeleccionada(option);
                    setMostrarRegionField(!!option);
                  }}
                  placeholder="Seleccione un cultivo (centro de costo) para ver las opciones"
                  isClearable
                  className="basic-single"
                />
              </div>

              {mostrarRegionField && (
                <div>
                  <label htmlFor="region" className="block text-sm font-medium">
                    Región menor (región):
                  </label>
                  <Select
                    options={regiones}
                    getOptionLabel={(option) => option.idAbreviatura}
                    getOptionValue={(option) => option.id}
                    value={regionSeleccionada}
                    onChange={setRegionSeleccionada}
                    placeholder="Seleccione una región mayor (ubicación) para ver las opciones"
                    isClearable
                    className="basic-single"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rubroSeleccionado && rubroSeleccionado.tarifaPorUnidad && (
                <div>
                  <label htmlFor="cantidad-unidad" className="block text-sm font-medium">
                    Cantidad {rubroSeleccionado.unidadMedidaString || 'unidad'}:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="cantidad-unidad"
                    value={cantidadUnidad}
                    onChange={(e) => setCantidadUnidad(e.target.value)}
                    className="block w-full border rounded p-2"
                  />
                </div>
              )}

              {rubroSeleccionado && rubroSeleccionado.tarifaPorUnidad && (
                <div>
                  <label htmlFor="cantidad-unidad-extra" className="block text-sm font-medium">
                    Cantidad {rubroSeleccionado.unidadMedidaString || 'unidad'} extraordinario:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="cantidad-unidad-extra"
                    value={cantidadUnidadExtras}
                    onChange={(e) => setCantidadUnidadExtras(e.target.value)}
                    className="block w-full border rounded p-2"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="tarifa" className="block text-sm font-medium">
                Tarifa:
              </label>
              <Select
                options={tarifas}
                getOptionLabel={(option) => `${option.id} | ${option.nombre}`}
                getOptionValue={(option) => option.id}
                value={tarifaSeleccionada}
                onChange={setTarifaSeleccionada}
                placeholder="Seleccione una tarifa"
                isClearable
                className="basic-single"
              />
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
}

export default Index;