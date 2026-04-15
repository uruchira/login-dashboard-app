import type { ChangeEvent } from "react";

interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
  }
  
  export const FormInput = ({ label, name, type = "text", value, onChange, error }: FormInputProps) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );