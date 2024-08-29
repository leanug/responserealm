'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'

import {
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid'
import { FormLabel, Button, FormError, FormInput, FormField, Form } from '@/components'

import LoginFormSchema from '@/validators/login'

export default function LoginForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false) // Initialize the loading state
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const calledPush = useRef(false)

  type FormData = z.infer<typeof LoginFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    const { email } = data
    
    try {
      setLoading(true)
      setError(false)
      setErrorMsg('')

      // If redirect is set to false, the result object will contain error data in case of an error
      const response = await signIn('credentials', {
        redirect: false,
        email,
      })
      console.log(response);
      
      /* if (response?.error) {
        setError(true)
        setErrorMsg(response.error)
        calledPush.current = false
      } */
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div>
        {/* Error login warning */}
        {error ? (
          <div className="
            bg-red-50 text-gray-900 rounded-lg p-5 
            flex gap-4 items-center mb-5
          ">
            <ExclamationTriangleIcon className="w-10 h-10 fill-red-500" />
            <p>{errorMsg}</p>
          </div>
        ) : null}
        {/* End error login warning */}

        {/* Login form */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField htmlFor="email">
            <FormLabel>Email</FormLabel>
            <FormInput 
              type="email" 
              id="email" 
              register={register} 
              name="email" 
              errors={errors}
              placeholder="name@example.com"
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </FormField>
          <Button 
            loading={loading} 
            type="submit"
          >
            Sign in with Email
          </Button>
        </Form>
        {/* End login form */}
      </div>
    </section>
  )
}
