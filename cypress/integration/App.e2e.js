describe('App E2E', () => {
  it('should have a form', () => {
    cy.visit('/register')

    cy.get('input').should('have.value', '')
    cy.get('button span').should('have.text', 'Register')
  })

  it('clicking "sign in" navigates to a new url', () => {
    cy.visit('/register')
    cy.contains('Already have an account? Sign in').click()
    cy.url().should('include', '/login')
  })
})