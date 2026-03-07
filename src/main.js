import handleFeedForm from './addFeedForm'
import './style.css'
import { proxy } from 'valtio/vanilla'
import i18next from 'i18next'
import resources from './locales/index.js'

const app = () => {
  const i18nIntance = i18next.createInstance()
  i18nIntance.init({
    lng: 'ru',
    debug: true,
    resources: resources,
  })

  const state = proxy({
    feedUrls: [],
    form: {
      process: 'filling',
      valid: true,
      feedUrl: '',
      error: null,
    },
  })

  const formElements = {
    form: document.querySelector('#add-feed-form'),
    input: document.querySelector('#formInput'),
    addButton: document.querySelector('.form-submit'),
    invalidFeedback: document.querySelector('.invalid-feedback'),
    validFeedback: document.querySelector('.valid-feedback'),
  }

  handleFeedForm(formElements, state, i18nIntance)
}

app()
