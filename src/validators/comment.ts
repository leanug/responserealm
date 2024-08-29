import * as z from "zod"

const CommentFormSchema = z.object({
  comment: z
  .string()
  .min(3, {
    message: "Name must be at least 3 characters.",
  })
  .max(2000, {
    message: "Name must be at most 2000 characters.",
  }),
})

export default CommentFormSchema