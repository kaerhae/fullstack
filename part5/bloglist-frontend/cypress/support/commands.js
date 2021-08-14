// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3005/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('LoggedInBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addUser', ({ name, username, password }) => {

  cy.request('POST', 'http://localhost:3005/api/users/', { name, username, password })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addBlog', ({ title, url, author }) => {
  cy.get('.create-button').click()
  cy.get('.title').type(title)
  cy.get('.url').type(url)
  cy.get('.author').type(author)
  cy.get('.add-button').click()

})



// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
