'use client'

import { useState } from 'react'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from 'react-query'

import { 
  FormLabel, 
  Button, 
  FormError, 
  FormInput, 
  FormTextarea, 
  FormField, 
  Form 
} from '@/components'
import { ENV } from '@/utils/constants'
import PostFormSchema from '@/validators/post'
import { useNotificationStore } from '@/store/use-notification-store'
import { useModalStore } from '@/store/use-modal-store'
import { useFetchBoard } from '@/hooks'
import { Post } from '@/types/post'

function NewPostForm() {
  const { status } = useSession()

  const [nameValue, setNameValue] = useState('')
  const [descValue, setDescValue] = useState('')

  const {addNotification} = useNotificationStore()
  const {setOpenModal} = useModalStore()
  
  const queryClient = useQueryClient()

  const {data: board, isLoading: isBoardLoading} = useFetchBoard()
  const boardId = board?._id

  type FormData = z.infer<typeof PostFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  // Define the mutation hook
  const { mutate, isLoading } = useMutation({
    mutationFn: async (formData: FormData) => 
      // Send POST request
      fetch(ENV.ENDPOINTS.POST.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          boardId // Board ID for relating post to parent board
        }),
      })
        .then((response) => response.json())
        .then((result) => result.data.post),
    onSuccess: (newPost: Post) => {
      const existingPosts: Post[] = queryClient.getQueryData(['posts', boardId]) || []
      // Update the cache manually by adding the new board to the existing boards
      const updatedPosts = newPost ? [newPost, ...existingPosts] : existingPosts
      queryClient.setQueryData(['posts', boardId], updatedPosts)
      setNameValue('')
      setDescValue('')
      setOpenModal('') // Close modal
    },
    onError: () => {
      addNotification(
        'Something went wrong.', 
        'error'
      )
    },
  })

  const onSubmit = (data: { name: string, description: string }) => {
    if (status !== 'authenticated') {
      // User not authenticated, open the login modal
      addNotification(
        'You need to log in for creating posts.', 
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
          <FormLabel>Enter a Brief Title</FormLabel>
          <FormInput 
            type="text" 
            id="name" 
            register={register} 
            name="name" 
            errors={errors}
            placeholder='Dark Mode Toggle'
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          {errors.name && <FormError>{errors.name.message}</FormError>}
        </FormField>
        <FormField htmlFor="description">
          <FormLabel>Describe your idea</FormLabel>
          <FormTextarea
            id="description" 
            register={register} 
            name="description" 
            errors={errors}
            placeholder='Allow users to switch between light and dark modes'
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
          />
          {errors.description && <FormError>{errors.description.message}</FormError>}
        </FormField>
        <Button 
          loading={isLoading} 
          type="submit"
          disabled={isLoading || isBoardLoading}
        >
          Create Post
        </Button>
      </Form>
      {/* End login form */}
    </div>
  )
}

export default NewPostForm
