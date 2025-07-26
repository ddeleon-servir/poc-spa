<template>
  <form @submit.prevent="handleSubmit">
    <label>Fecha:
      <input type="date" v-model="form.fechaCargoString" />
    </label>
    <Select
      label="Área:"
      :options="model.areas"
      v-model="form.areaSeleccionada"
    />
    <Select
      label="Empleado:"
      :options="model.contratos"
      v-model="form.contratoSeleccionado"
      option-label="codigoNombreCompleto"
      option-value="id"
    />
    <Select
      label="Rubro:"
      :options="model.rubros"
      v-model="form.rubroSeleccionado"
      option-label="abreviaturaNombre"
      option-value="id"
    />
    <Select
      label="Centro de costo:"
      :options="model.centrosCosto"
      v-model="form.centroCostoSeleccionado"
      option-label="abreviaturaCentroCosto"
      option-value="id"
    />
    <Select
      label="Ubicación:"
      :options="model.ubicaciones"
      v-model="form.ubicacionSeleccionada"
      option-label="abreviaturaUbicacion"
      option-value="id"
    />
    <Select
      label="Región:"
      :options="model.regiones"
      v-model="form.regionSeleccionada"
      option-label="idAbreviatura"
      option-value="id"
    />
    <Select
      label="Tarifa:"
      :options="model.tarifas"
      v-model="form.tarifaSeleccionada"
      option-label="nombre"
      option-value="id"
    />
    <label>Cantidad unidad:
      <input type="number" v-model="form.cantidadUnidad" />
    </label>
    <label>Cantidad unidad extraordinario:
      <input type="number" v-model="form.cantidadUnidadExtras" />
    </label>
    <button type="submit">Guardar</button>
  </form>
</template>

<script>
import Select from './components/Select.vue';

export default {
  components: { Select },
  data() {
    return {
      model: {
        areas: [],
        contratos: [],
        rubros: [],
        centrosCosto: [],
        ubicaciones: [],
        regiones: [],
        tarifas: [],
      },
      form: {
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
      }
    };
  },
  mounted() {
    Promise.all([
      fetch('/api/areas').then(r => r.json()),
      fetch('/api/contratos').then(r => r.json()),
      fetch('/api/rubros').then(r => r.json()),
      fetch('/api/centros-costo').then(r => r.json()),
      fetch('/api/ubicaciones').then(r => r.json()),
      fetch('/api/regiones').then(r => r.json()),
      fetch('/api/tarifas').then(r => r.json()),
    ]).then(([areas, contratos, rubros, centrosCosto, ubicaciones, regiones, tarifas]) => {
      this.model.areas = areas;
      this.model.contratos = contratos;
      this.model.rubros = rubros;
      this.model.centrosCosto = centrosCosto;
      this.model.ubicaciones = ubicaciones;
      this.model.regiones = regiones;
      this.model.tarifas = tarifas;
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