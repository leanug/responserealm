'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Board } from '@/types/board'

function NewBoardForm() {
  const { data: session, status } = useSession()
  const [inputValue, setInputValue] = useState('')
  const queryClient = useQueryClient()
  const {addNotification} = useNotificationStore()

  type FormData = z.infer<typeof BoardFormSchema>

  const userId = session?.user?.id || ''

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(BoardFormSchema),
    defaultValues: {name: ''},
  })

  // Define the mutation hook
  const { mutate, isLoading } = useMutation({
    mutationFn: (values: FormData) =>
      fetch(ENV.ENDPOINTS.BOARD.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((result) => result.board),
    onSuccess: (newBoard) => {
      const existingBoards: Board[] = queryClient.getQueryData(['boards', userId]) || [];
      // Update the cache manually by adding the new board to the existing boards
      const updatedBoards = [newBoard, ...existingBoards]
      setInputValue('')
      queryClient.setQueryData(['boards', userId], updatedBoards)
    },
    onError: () => {
      addNotification(
        'An error occurred while creating your board. Please try again.', 
        'error'
      )
    },
  })

  const onSubmit = (data: { name: string }) => {
    if (status !== 'authenticated') {
      // User not authenticated, open the login modal
      addNotification(
        'You need to log in for creating boards.', 
        'error'
      )
    } else {
      mutate(data)
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
          loading={isLoading} 
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
