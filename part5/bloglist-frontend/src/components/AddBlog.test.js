import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlog from './AddBlog'



describe('AddBlog-komponentti', () => {
    let component
    const addBlog = jest.fn()

    beforeEach(() => {
        component = render(
            <AddBlog createBlog={addBlog}/>
        )
    })
    
    test('Testing form submitting', () => {
        const title = component.container.querySelector('.title')
        const url = component.container.querySelector('.url')
        const author = component.container.querySelector('.author')
    
        const form = component.container.querySelector('.blog-form')
    
        const titleTestVal = 'Testitapausten Aateli'
        const urlTestVal = 'www.testitapaus.fi'
        const authorTestVal = 'Testi-Teppo'

        fireEvent.change(title, {
            target: { value: titleTestVal}
        })
        fireEvent.change(url, {
            target: { value: urlTestVal}
        })
        fireEvent.change(author, {
            target: { value: authorTestVal}
        })
        fireEvent.submit(form)
    
        expect(addBlog.mock.calls).toHaveLength(1)
        expect(addBlog.mock.calls[0][0].title).toBe(titleTestVal)
        expect(addBlog.mock.calls[0][0].url).toBe(urlTestVal)
        expect(addBlog.mock.calls[0][0].author).toBe(authorTestVal)
    })
})