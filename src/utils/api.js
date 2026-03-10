import axios from 'axios'

const allOriginsUrl = url => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`

const loadRSS = (url) => {
  return axios.get(allOriginsUrl(url))
    .then(response => response.data.contents)
    .catch((err) => {
      console.log(err)
      throw { message: 'addFeed.errors.networkError' }
    })
}

export default loadRSS
