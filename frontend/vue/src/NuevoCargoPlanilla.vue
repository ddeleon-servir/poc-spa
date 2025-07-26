<template>
  <form @submit.prevent="handleSubmit">
    <label>Fecha:
      <input type="date" v-model="form.fechaCargoString" />
    </label>
    <label>Área:
      <select v-model="form.areaSeleccionada">
        <option value="">Seleccione un área</option>
        <option v-for="a in model.areas" :key="a.id" :value="a.id">{{ a.descripcion }}</option>
      </select>
    </label>
    <!-- Repite para los demás campos -->
    <button type="submit">Guardar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      model: { areas: [], /* ... */ },
      form: {
        areaSeleccionada: null,
        fechaCargoString: new Date().toISOString().slice(0, 10),
        // ...
      }
    };
  },
  mounted() {
    Promise.all([
      fetch('/api/areas').then(r => r.json()),
      // ...
    ]).then(([areas /*, ... */]) => {
      this.model.areas = areas;
      // ...
    });
  },
  methods: {
    handleSubmit() {
      fetch('/api/cargo-planilla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.form),
      }).then(r => r.json()).then(result => {
        alert(result.message);
      });
    }
  }
};
</script>