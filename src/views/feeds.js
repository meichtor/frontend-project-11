const renderPosts = (state, formElements, i18n) => {
  const { posts } = state

  const elements = posts.map((post) => {
    const li = document.createElement('li')
    li.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'gap-3')

    const linkEl = document.createElement('a')
    linkEl.setAttribute('href', post.url)
    linkEl.setAttribute('target', '_blank')
    linkEl.classList.add('link-primary')
    linkEl.textContent = post.title

    const buttonEl = document.createElement('a')
    buttonEl.setAttribute('href', post.url)
    buttonEl.setAttribute('target', '_blank')
    buttonEl.classList.add('btn', 'btn-outline-primary')
    buttonEl.textContent = i18n.t('posts.viewPost')

    li.append(linkEl, buttonEl)
    return li
  })

  const heading = document.createElement('h3')
  heading.classList.add('mb-4')
  heading.textContent = i18n.t('posts.heading')

  const list = document.createElement('ul')
  list.classList.add('feed-posts', 'list-unstyled', 'd-flex', 'flex-column', 'gap-3')
  list.append(...elements)

  formElements.postsContainer.innerHTML = ''
  formElements.postsContainer.append(heading, list)
}

const renderFeeds = (state, formElements, i18n) => {
  const { feeds } = state

  const elements = feeds.map((feed) => {
    const li = document.createElement('li')
    li.classList.add('d-flex', 'flex-column', 'gap-1')

    const title = document.createElement('p')
    title.classList.add('text-black', 'fs-5', 'm-0')
    title.textContent = feed.title

    const description = document.createElement('p')
    description.classList.add('text-secondary', 'm-0', 'small')
    description.innerHTML = feed.description

    li.append(title, description)
    return li
  })

  const heading = document.createElement('h3')
  heading.classList.add('mb-4')
  heading.textContent = i18n.t('feeds.heading')

  const list = document.createElement('ul')
  list.classList.add('feed-posts', 'list-unstyled', 'd-flex', 'flex-column', 'gap-3')
  list.append(...elements)

  formElements.feedsContainer.innerHTML = ''
  formElements.feedsContainer.append(heading, list)
}

export { renderFeeds, renderPosts }
