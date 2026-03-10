import { subscribe, snapshot } from 'valtio/vanilla'
import { renderError, renderSuccess } from './views/form'
import { renderFeeds, renderPosts } from './views/feeds'
import validateUrl from './utils/validator'
import loadRSS from './utils/api'
import parseFeed from './utils/parser'

const handleFeedForm = (formElements, state, i18n) => {
  subscribe(state.form, () => {
    const currentState = snapshot(state)
    renderError(currentState, formElements)
    renderSuccess(currentState, formElements, i18n)
  })

  subscribe(state.feeds, () => {
    const currentState = snapshot(state)
    renderFeeds(currentState, formElements, i18n)
  })

  subscribe(state.posts, () => {
    const currentState = snapshot(state)
    renderPosts(currentState, formElements, i18n)
  })

  formElements.input.addEventListener('input', (e) => {
    const { value } = e.target
    state.form.feedUrl = value
    state.form.process = 'filling'
  })

  formElements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const { form: formState, feeds, posts } = state
    const existUrl = feeds.find(feed => feed.url === formState.feedUrl)

    if (formState.process === 'sending') {
      return
    }

    formState.process = 'sending'
    formState.valid = true
    formState.error = null

    validateUrl(formState, existUrl)
      .then(validUrl => loadRSS(validUrl))
      .then(rssData => parseFeed(rssData, formState.feedUrl))
      .then(({ feed, feedPosts }) => {
        feeds.push(feed)
        posts.push(...feedPosts)
        formState.process = 'send'
      })
      .catch((error) => {
        const message = error.message
        formState.process = 'error'

        if (message) {
          formState.error = i18n.t(message)
        }
        else {
          formState.error = i18n.t('addFeed.errors.networkError')
        }
      })
  })
}

export default handleFeedForm
