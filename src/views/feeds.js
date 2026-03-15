const renderModalContent = (post, modalEl, i18n) => {
  const modalTitle = modalEl.querySelector('.modal-title')
  const modalContent = modalEl.querySelector('.modal-body')
  const modalFooter = modalEl.querySelector('.modal-footer')
  const footerCloseBtn = modalFooter.querySelector('.btn-secondary')
  const footerViewLink = modalFooter.querySelector('.btn-primary')
  modalTitle.textContent = post.title
  modalContent.innerHTML = post.description

  footerCloseBtn.textContent = i18n.t('posts.closePreview')
  footerViewLink.setAttribute('target', '_blank')
  footerViewLink.setAttribute('href', post.url)
  footerViewLink.textContent = i18n.t('posts.openPost')
}

const createPost = (post, ui, formElements, i18n) => {
  const isWatchedPost = ui.watchedPosts.includes(post.id)
  const li = document.createElement('li')
  li.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'gap-3')
  li.dataset.postId = post.id

  const linkEl = document.createElement('a')
  linkEl.setAttribute('href', post.url)
  linkEl.setAttribute('target', '_blank')
  linkEl.classList.add('link-primary', 'fw-bold')
  linkEl.textContent = post.title

  const buttonEl = document.createElement('button')
  buttonEl.classList.add('btn', 'btn-outline-primary')
  buttonEl.textContent = i18n.t('posts.viewPost')
  buttonEl.dataset.bsToggle = 'modal'
  buttonEl.dataset.bsTarget = '#modal'
  buttonEl.addEventListener('click', () => {
    renderModalContent(post, formElements.modalContainer, i18n)

    if (!isWatchedPost) {
      ui.watchedPosts.push(post.id)
      linkEl.classList.remove('fw-bold', 'link-primary')
      linkEl.classList.add('link-secondary')
    }
  })

  li.append(linkEl, buttonEl)
  return li
}

const renderPosts = (state, formElements, i18n) => {
  const { posts, ui } = state
  const postsContainer = formElements.postsContainer

  if (!postsContainer.querySelector('.feed-posts')) {
    const heading = document.createElement('h3')
    heading.classList.add('mb-4')
    heading.textContent = i18n.t('posts.heading')

    const list = document.createElement('ul')
    list.classList.add('feed-posts', 'list-unstyled', 'd-flex', 'flex-column', 'gap-3')

    postsContainer.innerHTML = ''
    postsContainer.append(heading, list)
  }

  const list = postsContainer.querySelector('.feed-posts')
  const existingPostIds = [...list.querySelectorAll('li')].map(el => el.dataset.postId)

  const sortedPosts = posts.sort((a, b) => b.id - a.id)
  sortedPosts.forEach((post) => {
    const isNewPost = !existingPostIds.some(id => id === post.id)

    if (isNewPost) {
      const postEl = createPost(post, ui, formElements, i18n)
      list.prepend(postEl)
    }
  })
}

const renderFeeds = (state, formElements, i18n) => {
  const { feeds } = state

  const elements = feeds.map((feed) => {
    const li = document.createElement('li')
    li.classList.add('d-flex', 'flex-column', 'gap-1')

    const title = document.createElement('h3')
    title.classList.add('text-black', 'h6', 'm-0', 'fw-normal')
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
