import handleFeedForm from './feedFormHandler.js'
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
    feeds: [],
    posts: [],
    form: {
      process: 'filling', // sending | send | error
      valid: true,
      feedUrl: '',
      error: null,
    },
    ui: {
      refetchFeedsTimeout: 5000,
      watchedPosts: [],
    },
  })

  const formElements = {
    form: document.querySelector('#addFeedForm'),
    input: document.querySelector('#formInput'),
    addButton: document.querySelector('.form-submit'),
    feedbackContainer: document.querySelector('.feedback'),
    postsContainer: document.querySelector('#feedPosts'),
    feedsContainer: document.querySelector('#feeds'),
    modalContainer: document.querySelector('#modal'),
  }

  handleFeedForm(formElements, state, i18nIntance)
}

app()
