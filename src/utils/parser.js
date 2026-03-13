import _ from 'lodash'

const validateRSS = (xml) => {
  const hasError = xml.querySelector('parsererror')
  const hasChannel = xml.querySelector('channel')

  if (hasChannel && !hasError) {
    return xml
  }
  else {
    throw new Error('addFeed.errors.invalidRSS')
  }
}

const parseRSS = (data) => {
  const parser = new DOMParser()
  const xml = parser.parseFromString(data, 'text/xml')
  return validateRSS(xml)
}

const parseFeed = (data, feedUrl) => {
  const xml = parseRSS(data)

  const feed = {
    id: _.uniqueId(),
    title: xml.querySelector('channel > title').textContent,
    description: xml.querySelector('channel > description').textContent,
    url: feedUrl,
  }

  const feedPosts = [...xml.querySelectorAll('item')].map((item) => {
    const post = {
      id: _.uniqueId(),
      feedId: feed.id,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      url: item.querySelector('link').textContent,
    }

    return post
  })

  return { feed, feedPosts }
}

export default parseFeed
