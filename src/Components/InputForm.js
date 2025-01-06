import React from 'react';

const InputForm = ({ title }) => {
  return (
    <div className="input-form">
      <h3 className="input-form-title">{title}</h3>
      <input className="input-form-text" type="text" placeholder="Enter your name" />
      <p className="input-form-paragraph">Please enter your name and click submit.</p>
    </div>
  );
};

export default InputForm;