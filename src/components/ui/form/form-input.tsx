import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface FormInputProps {
  type: string
  id: string
  register: UseFormRegister<any>
  name: string
  errors: FieldErrors
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void // Optional onChange handler
}

export const FormInput: React.FC<FormInputProps> = ({onChange, placeholder, value, type, id, register, name, errors }) => (
  <input
    type={type}
    id={id}
    {...register(name)}
    className={`
      grow input input-bordered w-full text-sm
      ${errors[name] ? 'input-error' : ''}
    `}
    value={value}
    onChange={onChange} // Custom onChange handler if provided
    placeholder={placeholder}
  />
)
