import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'



describe('Blog-komponentti', () => {
  let component
  const mockToggleView = jest.fn()
  const mockHandleLike = jest.fn()

  const blog = {
    title: 'Testiotsikko',
    author: 'Testimies',
    url: 'www.testi.fi',
    likes: 3,
    user: {
      name:'Testimies'
    }
  }

  const user = {
    name: 'Testimies'
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        toggleView={mockToggleView}
        updateBlog={mockHandleLike}
      />
    )
  })

  test('Renders only blog title and author by default, not url and likes', () => {


    const title = component.getByText(
      'Testiotsikko'
    )
    expect(title).toBeDefined()

    const author = component.getByText(
      'Testimies'
    )
    expect(author).toBeDefined()

  })

  test('Check that urls and likes are not showed', () => {
    const hiddenDiv = component.container.querySelector('.blog-item-hidden')
    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('Urls and likes are showed, when button is pressed', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const hiddenDiv = component.container.querySelector('.blog-item-hidden')
    expect(hiddenDiv).not.toHaveStyle('display: none')
  })

  test('When clicked twice, like button eventhandler gets called twice', () => {
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
    console.log(prettyDOM(likeButton))


  })



})