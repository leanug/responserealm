import * as z from "zod"

const LoginFormSchema = z.object({
  email: z.string().email().min(3, {
    message: "Email must be at least 3 characters.",
  })
})

export default LoginFormSchema