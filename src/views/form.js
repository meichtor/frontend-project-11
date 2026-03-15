const renderFeedBack = (state, formElements, i18n) => {
  const { error, process } = state.form

  if (process === 'error') {
    formElements.input.classList.add('is-invalid')
    formElements.feedbackContainer.classList.add('invalid-feedback')
    formElements.feedbackContainer.textContent = error
    formElements.input.select()
  }
  else if (process === 'send') {
    formElements.feedbackContainer.classList.add('d-flex', 'valid-feedback')
    formElements.feedbackContainer.textContent = i18n.t('addFeed.success')
    formElements.form.reset()
    formElements.input.focus()
  }
  else {
    formElements.input.classList.remove('is-invalid')
    formElements.feedbackContainer.classList.remove('invalid-feedback')
    formElements.feedbackContainer.textContent = ''
  }
}

export default renderFeedBack
