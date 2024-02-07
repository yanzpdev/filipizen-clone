import { z } from 'zod'

export const signupFormSchema = z.object({
  email: z.string().email(),
  name: z.string().max(50),
  address: z.string().max(255),
  mobilenum: z.string().max(11),
})