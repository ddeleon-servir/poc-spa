<template>
  <form @submit.prevent="handleSubmit">
    <label>Fecha:
      <input type="date" v-model="form.fechaCargoString" />
    </label>
    <label>Área:
      <select v-model="form.areaSeleccionada">
        <option value="">Seleccione un área</option>
        <option v-for="a in areas" :key="a.id" :value="a.id">{{ a.descripcion }}</option>
      </select>
    </label>
    <!-- Repite para los demás campos -->
    <button type="submit">Guardar</button>
  </form>
</template>

<script>
import { useForm } from '@inertiajs/vue3';

export default {
  props: ['areas' /*, ... */],
  setup(props) {
    const form = useForm({
      areaSeleccionada: '',
      fechaCargoString: new Date().toISOString().slice(0, 10),
      // ...
    });

    function handleSubmit() {
      form.post('/cargo-planilla');
    }

    return { form, areas: props.areas, handleSubmit };
  }
};
</script>