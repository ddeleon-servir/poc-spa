<template>
  <label>
    {{ label }}
    <select :name="name" v-model="modelValue">
      <option value="">Seleccione...</option>
      <option v-for="opt in options" :key="opt[optionValue]" :value="opt[optionValue]">
        {{ opt[optionLabel] }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  props: {
    label: String,
    options: Array,
    name: String,
    modelValue: [String, Number],
    optionLabel: { type: String, default: 'descripcion' },
    optionValue: { type: String, default: 'id' }
  },
  emits: ['update:modelValue']
};
</script>