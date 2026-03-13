import parseFeed from './parser'
import loadRSS from './api'

const updateFeed = (state, feed, i18n) => {
  return loadRSS(feed.url)
    .then(rss => parseFeed(rss, feed.url))
    .then(({ feedPosts }) => {
      const postsLinks = new Set(state.posts.map(post => post.url))
      const newPosts = feedPosts.filter(post => !postsLinks.has(post.url))

      if (newPosts.length > 0) {
        state.posts.unshift(...newPosts)
      }
    })
    .catch((e) => {
      console.log(e)
      state.form.error = i18n.t('addFeed.errors.networkError')
    })
}

const autoUpdateFeeds = (state, i18n) => {
  const hasFeeds = state.feeds.length > 0
  const refetchTimeout = state.ui.refetchFeedsTimeout

  if (!hasFeeds) {
    setTimeout(() => autoUpdateFeeds(state, i18n), refetchTimeout)
    return
  }

  const feedPromises = state.feeds.map(feed => updateFeed(state, feed, i18n))

  Promise
    .all(feedPromises)
    .finally(setTimeout(() => autoUpdateFeeds(state, i18n), refetchTimeout))
}

export default autoUpdateFeeds
