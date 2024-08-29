import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface FormInputProps {
  id: string
  register: UseFormRegister<any>
  name: string
  errors: FieldErrors
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void // Optional onChange handler
}

export const FormTextarea: React.FC<FormInputProps> = ({ 
  id, 
  register, 
  name, 
  errors, 
  placeholder, 
  onChange, 
  value 
}) => (
  <textarea
    id={id}
    {...register(name)}
    className={`
      grow textarea textarea-bordered w-full
      ${errors[name] ? 'input-error' : ''}
    `}
    placeholder={placeholder}
    onChange={onChange} // Custom onChange handler if provided
    value={value}
  ></textarea>
);
