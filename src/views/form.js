const renderError = (state, formElements) => {
  const { error, process } = state.form

  if (error && process === 'error') {
    formElements.input.classList.add('is-invalid')
    formElements.invalidFeedback.textContent = error
    formElements.input.select()
  }
  else {
    formElements.input.classList.remove('is-invalid')
    formElements.invalidFeedback.textContent = ''
  }
}

const renderSuccess = (state, formElements, i18n) => {
  const { process } = state.form

  if (process === 'send') {
    formElements.validFeedback.classList.add('d-flex')
    formElements.validFeedback.textContent = i18n.t('addFeed.success')
    formElements.form.reset()
    formElements.input.focus()
  }
  else {
    formElements.validFeedback.textContent = ''
    formElements.validFeedback.classList.remove('d-flex')
  }
}

export { renderError, renderSuccess }
