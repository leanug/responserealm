// scr/containers/forms/comment.tsx
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
  FormTextarea, 
  FormField, 
  Form 
} from '@/components'
import CommentFormSchema from '@/validators/comment'
import { ENV } from '@/utils/constants'
import { useNotificationStore } from '@/store/use-notification-store'
import { Comment } from '@/types/comment'

interface NewCommentFormProps {
  postId: string
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({postId}) => {
  const { status } = useSession()
  const [inputValue, setInputValue] = useState('')
  const queryClient = useQueryClient()
  const {addNotification} = useNotificationStore()

  type FormData = z.infer<typeof CommentFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {comment: ''},
  })

  // Define the mutation hook
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData: FormData) =>
      fetch(ENV.ENDPOINTS.COMMENT.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          postId
        }),
      })
        .then((response) => response.json())
        .then((result) => result.data.comment),
    onSuccess: (newComment: Comment) => {
      const existingComments: Comment[] = queryClient.getQueryData(['comments', postId]) || [];
      // Update the cache manually by adding the new board to the existing boards
      const updatedComments = [newComment, ...existingComments]
      setInputValue('')
      
      //incrementCommentCount(newComment.post) // Increment posts store commentCounter
      queryClient.setQueryData(['comments', postId], updatedComments)
    },
    onError: () => {
      addNotification(
        'An error occurred while creating your board. Please try again.', 
        'error'
      )
    },
  })

  const onSubmit = (data: { comment: string }) => {
    if (status !== 'authenticated') {
      // User not authenticated, open the login modal
      addNotification(
        'You need to log in for posting comments.', 
        'error'
      )
    } else {
      mutate(data)
    }
  }

  return (
    <div className="w-full">
      {/* Comments form */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField htmlFor="comment">
          <FormTextarea
            id="comment" 
            register={register} 
            name="comment" 
            errors={errors}
            placeholder="Leave a comment"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {errors.comment && <FormError>{errors.comment.message}</FormError>}
        </FormField>
        <Button 
          loading={isLoading} 
          type="submit"
          disabled={isLoading}
        >
          Add comment
        </Button>
      </Form>
      {/* End login form */}
    </div>
  )
}

export default NewCommentForm
