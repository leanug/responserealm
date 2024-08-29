'use client'

import { useState } from 'react'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useBoardsStore } from '@/store/use-boards-store'
import { useSession } from 'next-auth/react'

import { 
  Button, 
  FormError, 
  FormInput, 
  FormField, 
  Form 
} from '@/components'
import { ENV } from '@/utils/constants'
import BoardFormSchema from '@/validators/board'
import { useNotificationStore } from '@/store/use-notification-store'
import { useModalStore } from '@/store/use-modal-store'

function NewBoardForm() {
  const { status } = useSession()

  const [loading, setLoading] = useState(false) // Initialize the loading state
  const [inputValue, setInputValue] = useState('')

  const { addBoard } = useBoardsStore()
  const {addNotification} = useNotificationStore()
  const {setOpenModal} = useModalStore()
  
  type FormData = z.infer<typeof BoardFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BoardFormSchema),
    defaultValues: {name: ''},
  })

  const onSubmit = async (data: FormData) => {
    if (status !== 'authenticated') {
      // User not authenticated, open the login modal
      setOpenModal('login-modal')
      return
    }

    try {
      setLoading(true) // Start loading when form is submitted
       // If user doesn't exist, proceed with user registration
      const response = await fetch(ENV.ENDPOINTS.BOARD.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const result = await response.json()
        const newBoard = result.board
        
        setInputValue('')
        addNotification('Your board was successfully created!', 'success')
        addBoard(newBoard) // Add board to store
      } else {
        addNotification(
          'An error occurred while creating your board. Please try again.', 
          'error'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Login form */}
      <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField htmlFor="name">
          <FormInput 
            type="text" 
            id="name" 
            register={register} 
            name="name" 
            errors={errors}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Board name"
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </FormField>
        <Button 
          loading={loading} 
          type="submit"
        >
          Create project
        </Button>
      </Form>
      {/* End login form */}
    </div>
  )
}

export default NewBoardForm
