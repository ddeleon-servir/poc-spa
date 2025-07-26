import React from 'react';

export default function Select({ label, options, value, onChange, name, optionLabel = 'descripcion', optionValue = 'id' }) {
  return (
    <label>
      {label}
      <select name={name} value={value} onChange={onChange}>
        <option value="">Seleccione...</option>
        {options.map(opt => (
          <option key={opt[optionValue]} value={opt[optionValue]}>
            {opt[optionLabel]}
          </option>
        ))}
      </select>
    </label>
  );
}