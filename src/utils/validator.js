import { object, string } from 'yup'

const validateSchema = object().shape({
  feedUrl: string()
    .required('addFeed.errors.required')
    .url('addFeed.errors.validUrl'),
})

const validateUrl = (formState, existUrl) => {
  return validateSchema.validate(formState)
    .then(() => {
      if (existUrl) {
        throw { message: 'addFeed.errors.urlExist' }
      }
      return formState.feedUrl
    })
}

export default validateUrl
