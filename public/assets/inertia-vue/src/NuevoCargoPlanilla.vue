<template>
  <section class="box">
    <div class="header no-icon">
      <h3>{{ cargoPlanillaId ? 'Editar cargo de planilla' : 'Nuevo cargo de planilla' }}</h3>
    </div>
    <form @submit.prevent="submitForm" class="block-content form">
      <div class="content with-actions">
        <fieldset>
          <legend>Datos generales</legend>
          <div class="form-group">
            <label for="fechaCargoString">Fecha:</label>
            <input type="date" v-model="form.fechaCargoString" id="fechaCargoString" class="form-control" @change="updateTarifa" />
          </div>
          <div class="form-row">
            <Select
              label="Área:"
              :options="areas"
              v-model="form.areaSeleccionada"
              option-label="descripcion"
              option-value="id"
            />
          </div>
          <div class="form-row">
            <Select
              label="Empleado:"
              :options="contratos"
              v-model="form.contratoSeleccionado"
              option-label="codigoNombreCompleto"
              option-value="id"
            />
            <Select
              label="Rubro:"
              :options="rubros"
              v-model="form.rubroSeleccionado"
              option-label="abreviaturaNombre"
              option-value="id"
              @change="onRubroChange"
            />
            <Select
              label="Cultivo (Centro de costo):"
              :options="centrosCostoFiltrados"
              v-model="form.centroCostoSeleccionado"
              option-label="abreviaturaCentroCosto"
              option-value="id"
            />
            <Select
              label="Región mayor (Ubicación):"
              :options="ubicacionesFiltradas"
              v-model="form.ubicacionSeleccionada"
              option-label="abreviaturaUbicacion"
              option-value="id"
            />
            <Select
              v-if="regiones.length > 0"
              label="Región menor (región):"
              :options="regionesFiltradas"
              v-model="form.regionSeleccionada"
              option-label="idAbreviatura"
              option-value="id"
            />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="cantidad-unidad">Cantidad unidad:</label>
              <input type="number" v-model="form.cantidadUnidad" id="cantidad-unidad" class="form-control" />
            </div>
            <div class="form-group">
              <label for="cantidad-unidad-extra">Cantidad unidad extraordinario:</label>
              <input type="number" v-model="form.cantidadUnidadExtras" id="cantidad-unidad-extra" class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <Select
              label="Tarifa:"
              :options="tarifasFiltradas"
              v-model="form.tarifaSeleccionada"
              option-label="nombre"
              option-value="id"
            />
          </div>
        </fieldset>
        <button type="submit" class="btn">Guardar</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';
import Select from '../components/Select.vue'; // Usa el componente Select reutilizable

const props = defineProps({
  areas: Array,
  contratos: Array,
  rubros: Array,
  centrosCosto: Array,
  ubicaciones: Array,
  regiones: Array,
  tarifas: Array,
  cargoPlanillaId: [String, Number],
});

const form = useForm({
  areaSeleccionada: null,
  contratoSeleccionado: null,
  rubroSeleccionado: null,
  centroCostoSeleccionado: null,
  ubicacionSeleccionada: null,
  regionSeleccionada: null,
  tarifaSeleccionada: null,
  fechaCargoString: new Date().toISOString().slice(0, 10),
  cantidadUnidad: '',
  cantidadUnidadExtras: '',
});

const centrosCostoFiltrados = computed(() => {
  if (form.rubroSeleccionado) {
    return props.centrosCosto.filter(c =>
      !form.rubroSeleccionado.centroCosto || c.id === form.rubroSeleccionado.centroCosto.id
    );
  }
  return props.centrosCosto;
});

const ubicacionesFiltradas = computed(() => {
  if (form.rubroSeleccionado) {
    return props.ubicaciones.filter(u =>
      !form.rubroSeleccionado.ubicacion || u.id === form.rubroSeleccionado.ubicacion.id
    );
  }
  return props.ubicaciones;
});

const regionesFiltradas = computed(() => {
  if (form.rubroSeleccionado) {
    return props.regiones.filter(r =>
      !form.rubroSeleccionado.region || r.id === form.rubroSeleccionado.region.id
    );
  }
  return props.regiones;
});

const tarifasFiltradas = computed(() => {
  if (form.rubroSeleccionado) {
    return props.tarifas.filter(t => {
      if (!t.rubro) return true;
      if (!form.fechaCargoString) return t.rubro.id === form.rubroSeleccionado.id;
      const fechaCargo = new Date(form.fechaCargoString + ' 00:00:00');
      const fechaInicioTarifa = new Date(t.fechaInicio + ' 00:00:00');
      const fechaFinTarifa = new Date(t.fechaFin + ' 00:00:00');
      return t.rubro.id === form.rubroSeleccionado.id &&
        fechaInicioTarifa <= fechaCargo && fechaCargo <= fechaFinTarifa;
    });
  }
  return props.tarifas;
});

function onRubroChange() {
  form.centroCostoSeleccionado = form.rubroSeleccionado?.centroCosto?.id || null;
  form.ubicacionSeleccionada = form.rubroSeleccionado?.ubicacion?.id || null;
  form.regionSeleccionada = form.rubroSeleccionado?.region?.id || null;
  updateTarifa();
}

function updateTarifa() {
  if (form.rubroSeleccionado) {
    const tarifa = tarifasFiltradas.value[0];
    form.tarifaSeleccionada = tarifa ? tarifa.id : null;
  }
}

function submitForm() {
  form.post('/cargo-planilla');
}
</script>