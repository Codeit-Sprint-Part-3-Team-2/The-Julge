import React, { forwardRef } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, value, onChange, placeholder, required = false, type = 'text', error }, ref) => {
    return (
      <div>
        <label htmlFor={id}>
          {label}
          {required && '*'}
        </label>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-2 w-full rounded-md border border-gray-30 px-5 py-4 text-base font-normal"
          ref={ref}
        />
        {error && <p className="mt-1 text-sm text-red-40">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
