import { z } from 'zod'

export const signupFormSchema = z.object({
  email: z.string().email(),
  name: z.string().max(50),
  subtype: z.string().max(50),
  lguString: z.string().max(255),
  lguID: z.string().max(255),
  address: z.string().max(255),
  mobileNum: z.string().max(11),
  isFirstTimeSigningIn: z.boolean()
})