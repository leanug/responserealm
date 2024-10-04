import * as z from "zod"

const BoardFormSchema = z.object({
  name: z
  .string()
  .min(3, {
    message: "Name must be at least 3 characters.",
  })
  .max(200, {
    message: "Name must be at most 200 characters.",
  }),
})

export default BoardFormSchema