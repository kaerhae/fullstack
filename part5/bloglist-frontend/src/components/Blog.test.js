import React, { useReducer } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog-komponentti', () => {
  let component
  let mockhandler = jest.fn()
  const blog = {
    title: "Testiotsikko",
    author: "Testimies",
    url: "",
    likes: "",
    user: {
      name:"Testimies"
    }
  }

  const user = {
    name: "Testimies"
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        addBlog={mockhandler}
        removeBlog={mockhandler}
        toggleView={mockhandler}
      />
    )
  })

  test('Renders only blog title and author by default, not url and likes', () => {
    expect(
      component.container
    ).toHaveTextContent(blog.title)

    expect(
      component.container
    ).toHaveTextContent(blog.author)

    expect(
      component.container
    ).not.toHaveTextContent(blog.url)

    expect(
      component.container
    ).not.toHaveTextContent(blog.likes)
  })

})


  describe('Blog-komponentti', () => {
    let component
    let mockhandlerLike = jest.fn()
    const blog = {
      title: "Testiotsikko",
      author: "Testimies",
      url: "www.testi.fi",
      likes: 3,
      user: {
        name:"Testimies"
      }
    }
  
    const user = {
      name: "Testimies"
    }
  
    beforeEach(() => {
      component = render(
        <Blog
          blog={blog}
          user={user}
          toggleView={mockhandlerLike}
        />
      )
    })

    test('Show url and likes, when button pressed', () => {
      const button = component.getByText('View')
      fireEvent.click(button)
  
  
      expect(
        component.container
      ).toHaveTextContent(blog.url)
      expect(
        component.container
      ).toHaveTextContent(blog.likes)
    })

    test('When like button pressed two times, event handler get called two times', () => {
      const viewButton = component.getByText('View')
      fireEvent.click(viewButton)
      

      expect(mockhandlerLike.mock.calls).toHaveLength(1)
    })
  })