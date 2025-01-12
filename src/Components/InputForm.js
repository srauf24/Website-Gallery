import React from 'react';

const InputForm = ({ title, description }) => {
  return (
    <div className="input-form">
      <h3 className="input-form-title">{title}</h3>
      <input className="input-form-text" type="text" placeholder="Input this attribute" />
      <p className="input-form-paragraph">{description}</p>
    </div>
  );
};

export default InputForm;