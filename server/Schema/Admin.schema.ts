import { object, string, TypeOf } from "zod";

export const adminRegisterBodySchema = {
  body: object({
    firstname: string({
      required_error: "Full name is required",
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      "Please enter a valid firstname"
    ),
    lastname: string({
      required_error: "Last name is required",
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      "Please enter a valid lastname"
    ),
    email: string({
      required_error: "Email is required",
    }).email("Please enter a valid email"),
    password: string({
      required_error: "Password is required",
    })
      .min(8, "Password must be more than 8 characters")
      .max(64, "Password must be less than 64 characters"),
    confirmPassword: string({ required_error: "Confirm Password is required" }),
  })
    .strict()
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: "confirmPassword must match password",
      path: ["confirmPassword"],
    }),
};

export type adminRegisterBodyType = TypeOf<typeof adminRegisterBodySchema.body>;

export const adminLoginBodySchema = {
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Please enter a valid email"),
    password: string({
      required_error: "Password is required",
    }).max(84, "Password cannot be more than 64 characters"),
  }).strict(),
};

export type adminLoginBodyType = TypeOf<typeof adminLoginBodySchema.body>;

export const adminresetPasswordSchema = {
  body: object({
    username: string({
      required_error: "username is rquired",
    }),
    newPassword: string({
      required_error: "password is required",
    })
      .min(8, "Password cannot be less than 8 characters")
      .max(64, "Password cannote be more than 64 characters")
      .regex(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/),
        "Please enter a strong password"
      ),
  }).strict(),
};

export type adminresetPasswordType = TypeOf<
  typeof adminresetPasswordSchema.body
>;
