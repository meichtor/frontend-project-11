import { object, string } from 'yup'

const validateSchema = object().shape({
  feedUrl: string()
    .required('addFeed.errors.required')
    .url('addFeed.errors.validUrl'),
})

const validateUrl = (state) => {
  const existUrl = state.feeds.find(feed => feed.url === state.form.feedUrl)

  return validateSchema.validate(state.form)
    .then(() => {
      if (existUrl) {
        throw { message: 'addFeed.errors.urlExist' }
      }
      return state.form.feedUrl
    })
}

export default validateUrl
