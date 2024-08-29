import * as z from "zod"

const BoardFormSchema = z.object({
  name: z
  .string()
  .min(5, {
    message: "Name must be at least 5 characters.",
  })
  .max(200, {
    message: "Name must be at most 200 characters.",
  }),
})

export default BoardFormSchema