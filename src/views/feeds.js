const createPost = (post, ui, i18n) => {
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
  buttonEl.setAttribute('data-bs-toggle', `modal`)
  buttonEl.setAttribute('data-bs-target', `#modalId${post.id}`)
  buttonEl.addEventListener('click', () => {
    if (!isWatchedPost) {
      ui.watchedPosts.push(post.id)
      linkEl.classList.remove('fw-bold')
      linkEl.classList.add('fw-normal')
    }
  })

  const modalPreview = renderPostModal(post, i18n)

  li.append(linkEl, buttonEl, modalPreview)
  return li
}

const renderPosts = (state, formElements, i18n) => {
  const { posts, ui } = state
  const postsContainer = formElements.postsContainer

  if (!postsContainer.querySelector('.feed-posts')) {
    const heading = document.createElement('h3')
    heading.classList.add()
    heading.classList.add('mb-4')
    heading.textContent = i18n.t('posts.heading')

    const list = document.createElement('ul')
    list.classList.add('feed-posts', 'list-unstyled', 'd-flex', 'flex-column', 'gap-3')

    postsContainer.innerHTML = ''
    postsContainer.append(heading, list)
  }

  const list = postsContainer.querySelector('.feed-posts')
  const existingPostIds = [...list.querySelectorAll('li')].map(el => el.dataset.postId)

  posts.forEach((post) => {
    const isNewPost = !existingPostIds.find(id => id === post.id)

    if (isNewPost) {
      const postEl = createPost(post, ui, i18n)
      list.prepend(postEl)
    }
  })
}

const renderPostModal = (post, i18n) => {
  const modalEl = document.createElement('div')
  modalEl.classList.add('modal', 'fade')
  modalEl.setAttribute('tabIndex', '-1')
  modalEl.setAttribute('ariaHidden', 'true')
  modalEl.setAttribute('id', `modalId${post.id}`)

  const modalDialog = document.createElement('div')
  modalDialog.classList.add('modal-dialog')

  const modalContent = document.createElement('div')
  modalContent.classList.add('modal-content')

  const modalHeader = document.createElement('div')
  modalHeader.classList.add('modal-header')

  const headerEl = document.createElement('h5')
  headerEl.classList.add('modal-title')
  headerEl.textContent = post.title

  const headerCloseEl = document.createElement('button')
  headerCloseEl.setAttribute('type', 'button')
  headerCloseEl.classList.add('btn-close')
  headerCloseEl.setAttribute('data-bs-dismiss', 'modal')
  headerCloseEl.setAttribute('aria-label', 'Close')

  modalHeader.append(headerEl, headerCloseEl)

  const modalBody = document.createElement('div')
  modalBody.classList.add('modal-body')

  modalBody.innerHTML = post.description

  const modalFooter = document.createElement('div')
  modalFooter.classList.add('modal-footer')

  const footerCloseEl = document.createElement('button')
  footerCloseEl.setAttribute('type', 'button')
  footerCloseEl.classList.add('btn', 'btn-secondary')
  footerCloseEl.setAttribute('data-bs-dismiss', 'modal')
  footerCloseEl.setAttribute('aria-label', 'Close')
  footerCloseEl.textContent = i18n.t('posts.closePreview')

  const footerViewEl = document.createElement('a')
  footerViewEl.classList.add('btn', 'btn-primary')
  footerViewEl.setAttribute('target', '_blank')
  footerViewEl.setAttribute('href', post.url)
  footerViewEl.textContent = i18n.t('posts.openPost')

  modalFooter.append(footerViewEl, footerCloseEl)
  modalContent.append(modalHeader, modalBody, modalFooter)
  modalDialog.append(modalContent)
  modalEl.append(modalDialog)

  return modalEl
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
