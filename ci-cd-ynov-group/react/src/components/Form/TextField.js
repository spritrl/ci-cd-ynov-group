import React from 'react';

function TextField({ inputValue, onChange, title, name, type, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label htmlFor={name}>{title}</label>
      <input
        id={name}
        type={type || 'text'}
        name={name}
        value={inputValue}
        onChange={onChange}
        placeholder={title}
        style={{
          width: '100%',
          padding: '5px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          height: '30px',
          boxSizing: 'border-box',
          fontSize: '16px',
        }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default TextField;
