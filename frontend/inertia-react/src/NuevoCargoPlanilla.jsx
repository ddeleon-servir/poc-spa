import { useForm } from '@inertiajs/react';

export default function NuevoCargoPlanilla({ areas, /* ... */ }) {
  const { data, setData, post } = useForm({
    areaSeleccionada: '',
    fechaCargoString: new Date().toISOString().slice(0, 10),
    // ...
  });

  function handleSubmit(e) {
    e.preventDefault();
    post('/cargo-planilla');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Fecha:
        <input type="date" name="fechaCargoString" value={data.fechaCargoString} onChange={e => setData('fechaCargoString', e.target.value)} />
      </label>
      <label>Área:
        <select name="areaSeleccionada" value={data.areaSeleccionada} onChange={e => setData('areaSeleccionada', e.target.value)}>
          <option value="">Seleccione un área</option>
          {areas.map(a => <option key={a.id} value={a.id}>{a.descripcion}</option>)}
        </select>
      </label>
      {/* Repite para los demás campos */}
      <button type="submit">Guardar</button>
    </form>
  );
}