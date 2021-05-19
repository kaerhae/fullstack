import { func } from "prop-types"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3005/api/testing')
    const user = {
      name: 'Mikko Alatalo',
      username: 'mk',
      password: 'sala'
    }
    cy.request('POST', 'http://localhost:3005/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to Application')
  })

  it('Login form can be opened', function() {
    cy.contains('Login').click()
  })


describe('Login',function() {
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
})


})
