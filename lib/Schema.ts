import * as z from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const FormSchema = z.object({
  title: z.string(),
  firstname: z.string().min(2, "Invalid First Name!").max(36),
  lastname: z.string().min(2, "Invalid Last Name!").max(36),
  email: z.string().min(1, "Invalid email address!").email({
    message: "Invalid email address!",
  }),
  phone: z
    .string()
    .min(10, "Enter a valid phone number!")
    .max(16)
    .regex(phoneRegex, "Invalid Number!"),
  message: z.string().min(5, "Enter valid full message!"),
});
