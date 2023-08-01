import { number, object } from 'yup'

export const filterSchemaValidation = object({
  daoSelected: number().notRequired().min(0, 'Minimum at least 0').max(6, 'Allowed maximum is 6'),
  monthSelected: number()
    .notRequired()
    .min(1, 'Minimum at least 1')
    .max(12, 'Allowed maximum is 12'),
  yearSelected: number()
    .notRequired()
    .min(2020, 'Minimum at least 2020')
    .max(2050, 'Allowed maximum is 2050')
})
