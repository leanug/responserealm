// scr/containers/forms/comment.tsx
'use client'

import { useState } from 'react'

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
import { ENV } from '@/utils/constants'
import CommentFormSchema from '@/validators/comment'
import { useNotificationStore } from '@/store/use-notification-store'
import { useCommentsStore } from '@/store/use-comments-store'
import { usePostActions } from '@/hooks/use-post-actions'
import { useModalStore } from '@/store/use-modal-store'

interface NewCommentFormProps {
  postId: string
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({postId}) => {
  const { status } = useSession()

  const [loading, setLoading] = useState(false) // Initialize the loading state
  const [inputValue, setInputValue] = useState('')

  const {addNotification} = useNotificationStore()
  const {addComment} = useCommentsStore()
  const {setOpenModal} = useModalStore()

  const {incrementCommentCount} = usePostActions()

  type FormData = z.infer<typeof CommentFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {comment: ''},
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
        postId
      }

       // If user doesn't exist, proceed with user registration
      const response = await fetch(ENV.ENDPOINTS.COMMENT.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        const result = await response.json()

        if (result && result?.data && result?.data?.comment) {
          const newComment = result.data.comment
          addComment(newComment) // Add comment to store
          incrementCommentCount(newComment.post) // Increment posts store commentCounter
        } else {
          throw new Error('An error occurred while creating your comment. Please try again.')
        }
        
        setInputValue('') // Clear textarea
        addNotification('New comment!', 'success')
        reset({})
      } else {
        throw new Error('An error occurred while creating your comment. Please try again.')
      }
    } catch(error: any) {
      if (ENV.IS_DEV) console.log(error)
      addNotification(
        error?.message, 
        'error'
      )
    } finally {
      setLoading(false)
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
          loading={loading} 
          type="submit"
        >
          Add comment
        </Button>
      </Form>
      {/* End login form */}
    </div>
  )
}

export default NewCommentForm
