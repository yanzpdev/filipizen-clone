import { z } from 'zod'

export const signupFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  address: z.string().max(255),
  mobileNum: z.string().max(11),
  isFirstTimeSigningIn: z.boolean()
})