'use client'

import { useState } from 'react'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSession } from 'next-auth/react'

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
import { usePostStore } from '@/store/use-post-store'
import { useModalStore } from '@/store/use-modal-store'
import { useBoardStore } from '@/store/use-board'

function NewPostForm() {
  const { status } = useSession()

  const [loading, setLoading] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [descValue, setDescValue] = useState('')

  const {addNotification} = useNotificationStore()
  const {addPost} = usePostStore()
  const {setOpenModal} = useModalStore()
  const {currentBoardId} = useBoardStore()
  
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

  const onSubmit = async (formData: FormData) => {
    if (status !== 'authenticated') {
      // User not authenticated, open the login modal
      setOpenModal('login-modal')
      return
    }

    try {
      setLoading(true) // Start loading when form is submitted
      const data = {
        ...formData,
        boardId: currentBoardId
      } // Board id for relating post to parent board
      const response = await fetch(ENV.ENDPOINTS.POST.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const result = await response.json()

        if (result && result?.data && result?.data?.post) {
          const newPost = result.data.post
          addPost(newPost)
        }
        
        addNotification('Your post was successfully created!', 'success')
        setNameValue('')
        setDescValue('')
        setOpenModal('') // Close modal
      } else {
        addNotification('Oops! An error occured, please try again later.', 'error')
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
          loading={loading} 
          type="submit"
        >
          Create Post
        </Button>
      </Form>
      {/* End login form */}
    </div>
  )
}

export default NewPostForm
