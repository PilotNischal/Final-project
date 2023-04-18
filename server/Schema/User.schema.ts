import { number, object, string, TypeOf } from 'zod';

export const registerBodySchema = {
  body: object({
    firstname: string({
      required_error: 'Full name is required',
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      'Please enter a valid firstname'
    ),
    lastname: string({
      required_error: 'Last name is required',
    }).regex(
      new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
      'Please enter a valid lastname'
    ),
    email: string({
      required_error: 'Email is required',
    }).email('Plz enter a valid email'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be more than 8 characters')
      .max(64, 'Password must be less than 64 characters'),
    confirmPassword: string({ required_error: 'Confirm Password is required' }),
  })
    .strict()
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      message: 'confirmPassword must match password',
      path: ['confirmPassword'],
    }),
};

export type registerBodyType = TypeOf<typeof registerBodySchema.body>;

export const loginBodySchema = {
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Please Enter a valid email'
    ),
    password: string({
      required_error: 'Password is required',
    }).max(64, 'Password cannot be more than 64 characters'),
  }).strict(),
};

export type loginBodyType = TypeOf<typeof loginBodySchema.body>;

export const changePasswordSchema = {
  body: object({
    username: string({
      required_error: 'username is rquired',
    }).max(32, 'Please enter a valid username'),
    password: string({
      required_error: 'Old password is required',
    })
      .min(8, 'Password too short')
      .max(64, 'Password too long'),
    newPassword: string({
      required_error: 'password is required',
    })
      .min(8, 'Password cannot be less than 8 characters')
      .max(64, 'Password cannote be more than 64 characters'),
  }).refine(({ newPassword, password }) => newPassword === password, {
    message: 'Cannot set your password as same as your previous password',
    path: ['newPassword'],
  }),
};
export type changePasswordType = TypeOf<typeof changePasswordSchema.body>;

export const tokenBodySchema = {
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Send a valid email'
    ),
    otp: number({ required_error: 'Otp is required' })
      .min(10000, 'should atleast be 5 characters')
      .max(99999, 'Cannot be greater than 5 characters'),
  }),
};
export type tokenBodyType = TypeOf<typeof tokenBodySchema.body>;

export const resendTokenBodySchema = {
  body: object({
    email: string({
      required_error: 'verfication token is required',
    }).email('Send a valid email'),
  }),
};

export type resendTokenBodyType = TypeOf<typeof resendTokenBodySchema.body>;

export const forgotPasswordBodySchema = {
  body: object({
    email: string({
      required_error: 'verfication token is required',
    }).email('Send a valid email'),
  }),
};

export type forgotPasswordBodyType = TypeOf<
  typeof forgotPasswordBodySchema.body
>;

export const verifyfpotpBodySchema = {
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Send a valid email'
    ),
    otp: number({ required_error: 'Otp is required' })
      .min(10000, 'should atleast be 5 characters')
      .max(99999, 'Cannot be greater than 5 characters'),
  }),
};

export type verifyfpotpBodyType = TypeOf<typeof verifyfpotpBodySchema.body>;

export const resetPasswordSchema = {
  body: object({
    email: string({
      required_error: 'username is rquired',
    }).email('Send a valid email'),
    newPassword: string({
      required_error: 'password is required',
    })
      .min(8, 'Password cannot be less than 8 characters')
      .max(64, 'Password cannote be more than 64 characters'),
    confirmPassword: string({
      required_error: 'Confirm Password is required',
    }),
  })
    .strict()
    .refine(
      ({ newPassword, confirmPassword }) => newPassword === confirmPassword,
      {
        message: 'confirmPassword must match password',
        path: ['confirmPassword'],
      }
    ),
};
export type resetPasswordType = TypeOf<typeof resetPasswordSchema.body>;
