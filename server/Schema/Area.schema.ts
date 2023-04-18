import { array, boolean, object, string, TypeOf } from 'zod';

export const createAreaBodySchema = {
  body: object({
    name: string({
      required_error: 'Area name is required',
    })
      .min(5, 'Area name should be greater than 5 characters')
      .regex(
        new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
        'Please Enter valid Area name'
      ),
    description: string({
      required_error: 'Area description is required',
    })
      .min(30, 'Description not long enought')
      .max(1000, 'Keep the description short'),
    featured: boolean({
      required_error: 'Featured is required',
    }),
    hotels: array(string({})).optional(),
    popularDestinations: array(
      string({
        required_error: 'Popular destination is required',
      })
    ),
  }),
};

export type createAreaBodySchema = TypeOf<typeof createAreaBodySchema.body>;

export const getAreaBodySchema = {
  body: object({
    area_id: string({
      required_error: 'Area id is required',
    }).min(30, 'area id cannot be less than 30 characters'),
  }),
};

export type getAreaBodySchema = TypeOf<typeof getAreaBodySchema.body>;

export const updateAreaBodySchema = {
  body: object({
    area_id: string({
      required_error: 'Area id is required',
    }),
    name: string({
      required_error: 'Area name is required',
    })
      .min(5, 'Area name should be greater than 5 characters')
      .regex(
        new RegExp(/^[a-z A-Z0-9_\-.]*$/gm),
        'Please Enter valid Area name'
      ),
    description: string({
      required_error: 'Area description is required',
    })
      .min(30, 'Description not long enought')
      .max(1000, 'Keep the description short'),
  }),
};

export type updateAreaBodySchema = TypeOf<typeof updateAreaBodySchema.body>;

export const deleteAreaBodySchema = {
  body: object({
    area_id: string({
      required_error: 'Area id is required',
    }).min(30, 'area id cannot be less than 30 characters'),
  }),
};

export type deleteAreaBodySchema = TypeOf<typeof deleteAreaBodySchema.body>;
