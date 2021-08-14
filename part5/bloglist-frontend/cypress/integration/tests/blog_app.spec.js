import { func } from 'prop-types'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3005/api/testing')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to Application')
  })

  it('Login form can be opened', function() {
    cy.contains('Login').click()
  })

})

describe('Login',function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3005/api/testing')
    cy.visit('http://localhost:3000')
    cy.addUser({
      name: 'Mikko Alatalo',
      username: 'mk',
      password: 'sala'
    })
  })

  it('succeeds with correct credentials', function() {
    cy.contains('Login').click()
    cy.get('#username').type('mk')
    cy.get('#password').type('sala')
    cy.get('#login-button').click()
    cy.contains('Logged in as Mikko Alatalo')
  })


  it('fails with wrong credentials', function() {
    cy.contains('Login').click()
    cy.get('#username').type('vaara')
    cy.get('#password').type('vaara')
    cy.get('#login-button').click()
    cy.get('.message').contains('Wrong Username or Password')

  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3005/api/testing')
    cy.visit('http://localhost:3000')
    cy.addUser({
      name: 'Mikko Alatalo',
      username: 'mk',
      password: 'sala'
    })
    cy.login({ username: 'mk', password: 'sala' })
  })

  it('A blog can be created', function() {
    cy.contains('Logged in as Mikko Alatalo')
    cy.get('.create-button').click()
    cy.get('.title').type('Art of Test Titles')
    cy.get('.url').type('www.test.fi')
    cy.get('.author').type('Timo Testimies')
    cy.get('.add-button').click()

    cy.contains('Art of Test Titles')
    cy.contains('View')
  })
  it('Blog gets like, when button pressed', function() {
    cy.contains('Logged in as Mikko Alatalo')
    cy.get('.create-button').click()
    cy.get('.title').type('Art of Test Titles')
    cy.get('.url').type('www.test.fi')
    cy.get('.author').type('Timo Testimies')
    cy.get('.add-button').click()

    cy.contains('Art of Test Titles')
    cy.contains('View')

    cy.contains('Logged in as Mikko Alatalo')
    cy.get('#view-button').click()
    cy.contains('Likes: 0')
    cy.get('.button-like').click()
    cy.contains('Likes: 1')
    cy.reload()
    cy.get('#view-button').click()
  })

})

describe('Blog removal', function() {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3005/api/testing')
    cy.visit('http://localhost:3000')
    cy.addUser({
      name: 'Mikko Alatalo',
      username: 'mk',
      password: 'sala'
    })
    cy.addUser({
      name: 'Timo Testimies',
      username: 'tt',
      password: 'testi'
    })
    cy.login({ username: 'mk', password: 'sala' })
    cy.addBlog({ title: 'Art of Test Titles', url:'www.testi.fi', author:'Timo Testimies' })
    cy.reload()
  })

  it('User can remove blogs', function() {

    cy.contains('Art of Test Titles')
    cy.contains('View')
    cy.get('#view-button').click()
    cy.get('#button-remove').click()

    cy.get('.blog-item-visible').should('not.exist')
  })

  it('User, who has not added blog, cannot remove blog', function() {
    cy.get('#logout-button').click()
    cy.login({ username: 'tt', password: 'testi' })
    cy.contains('Logged in as Timo Testimies')
    cy.get('#view-button').click()
    cy.get('#button-remove').should('not.exist')
  })
})

describe('Likes', function() {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3005/api/testing')
    cy.visit('http://localhost:3000')
  })
  it('Likes will arranged from biggest to smallest', function() {
    cy.addUser({
      name: 'Timo Testimies',
      username: 'tt',
      password: 'testi'
    })
    cy.login({ username: 'tt', password: 'testi' })
    cy.addBlog({ title: 'Test Title 1', url:'www.testi.fi', author:'Timo Testimies' })
    cy.addBlog({ title:'Test Title 2', url: 'www.testi.fi', author:'Timo Testimies' })
    cy.addBlog({ title:'Test Title 3', url: 'www.testi.fi', author:'Timo Testimies' })

    cy.reload()
    cy.get('[id^=view-button]').click({ multiple: true })
    cy.get('.button-like').eq(0).click()
    cy.get('.button-like').eq(0).click()
    cy.get('.button-like').eq(1).click()

    cy.get('.blog-item-visible').eq(0).contains('Test Title 1')
    cy.get('.blog-item-visible').eq(1).contains('Test Title 2')
    cy.get('.blog-item-visible').eq(2).contains('Test Title 3')


  })

})


