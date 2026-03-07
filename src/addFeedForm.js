import _ from 'lodash'
import { object, string } from 'yup'
import { subscribe, snapshot } from 'valtio/vanilla'

const validateSchema = object().shape({
  feedUrl: string()
    .required('addFeed.errors.required')
    .url('addFeed.errors.validUrl'),
})

const validate = feedUrl => validateSchema.validate(feedUrl)

const checkDuplicates = (feedUrl, feeds) => feeds.find(feed => feed.url === feedUrl)

const renderError = (state, formElements) => {
  const { error } = state.form

  if (error) {
    formElements.input.classList.add('is-invalid')
    formElements.invalidFeedback.textContent = error
    return
  }

  formElements.input.classList.remove('is-invalid')
  formElements.invalidFeedback.textContent = ''
}

const renderSuccess = (state, formElements, i18n) => {
  const { process } = state.form

  if (process === 'send') {
    formElements.validFeedback.classList.add('d-flex')
    formElements.validFeedback.textContent = i18n.t('addFeed.success')
    formElements.form.reset()
    formElements.input.focus()
    return
  }

  formElements.validFeedback.textContent = ''
  formElements.validFeedback.classList.remove('d-flex')
}

const handleFeedForm = (formElements, state, i18n) => {
  subscribe(state, () => {
    const currentState = snapshot(state)
    renderError(currentState, formElements)
    renderSuccess(currentState, formElements, i18n)
  })

  formElements.input.addEventListener('input', (e) => {
    const { value } = e.target
    state.form.feedUrl = value
    state.form.process = 'filling'
  })

  formElements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const { form: formState, feedUrls } = state
    const isDuplicateUrl = checkDuplicates(formState.feedUrl, state.feedUrls)

    formState.process = 'sending'

    if (isDuplicateUrl) {
      formState.error = i18n.t('addFeed.errors.urlExist')
      return
    }

    validate(formState)
      .then((data) => {
        formState.valid = true
        formState.error = null
        feedUrls.push({
          id: _.uniqueId(),
          url: data.feedUrl,
        })

        formState.feedUrl = ''
        formState.process = 'send'
      })
      .catch((error) => {
        const message = i18n.t(error.message)
        formState.valid = false
        formState.error = message
        throw message
      })
  })
}

export default handleFeedForm
