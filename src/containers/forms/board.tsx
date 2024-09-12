'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

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

  const [inputValue, setInputValue] = useState('')

  const queryClient = useQueryClient()

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

  // Define the mutation hook
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (values) =>
      fetch(ENV.ENDPOINTS.BOARD.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((result) => result.board), // Assuming the API response contains the new board under `board`
    /* onMutate: async (newBoardData) => {
      await queryClient.cancelQueries('boards');
      
      // Snapshot the previous value
      const previousBoards = queryClient.getQueryData('boards');
      
      // Optimistically update to the new value
      queryClient.setQueryData('boards', (oldBoards) => {
        // Ensure oldBoards is an array, or initialize as empty if undefined
        return [...(oldBoards || []), newBoardData];
      });

      // Return a context object with the previous boards
      return { previousBoards };
    },*/
    /* onSettled: () => {
      // Refetch the boards to ensure the cache is up-to-date
      queryClient.invalidateQueries('boards');
    },  */
    onSuccess: (newBoard) => {
      // Update the cache manually by adding the new board to the existing boards
      console.log(newBoard);
      
    },
  });

    /* if (status !== 'authenticated') {
      // User not authenticated, open the login modal
      setOpenModal('login-modal');
      return;
    } */

    // Call the mutation function with form data

    /* try {
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

        // Update the boards query cache
        queryClient.setQueryData('boards', newBoard);
        console.log('here');
        
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
 */
  return (
    <div className="w-full">
      {/* Login form */}
      <Form onSubmit={handleSubmit(mutate)}>
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
