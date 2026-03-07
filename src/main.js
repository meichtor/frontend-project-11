import handleFeedForm from './addFeedForm'
import './style.css'
import { proxy } from 'valtio/vanilla'

const app = () => {
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

  handleFeedForm(formElements, state)
}

app()
