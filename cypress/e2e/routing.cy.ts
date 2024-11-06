describe('Application Routing and Components', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Test the home page
  it('should load the home page and display Navbar', () => {
    cy.get('nav').should('be.visible')

    cy.get('nav a').first().should('have.attr', 'href', '#/')

    cy.get('nav').contains('Browse').should('be.visible')
  })

  it('should navigate to Browse page from Navbar', () => {
    cy.get('nav').contains('Browse').click()

    cy.url().should('include', '/browse')

    cy.get('h2').should('have.text', 'Browse Cards')
  })

  // Test the cards on the home page
  it('should navigate to Browse when card with Swim in Spain is clicked and apply the correct filters', () => {
    cy.get('p').contains('Swim in Spain').click()

    cy.url().should('include', '#/browse')

    cy.get('h2').should('have.text', 'Browse Cards')

    cy.get('button').contains('Activities').should('have.class', 'bg-accent-1')

    cy.get('button').contains('Spain').should('have.class', 'bg-background')

    cy.get('article').each(($el) => {
      cy.wrap($el).should('contain', 'Spain')
    })
  })

  // Visit a non-existent route
  it('should display 404 page for non-existent routes', () => {
    cy.visit('#/non-existent-route/review', { failOnStatusCode: false })

    cy.get('h1').should('contain.text', "Oh no, looks like you've traveled a bit to far")
  })

  describe('Application Routing and Components', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should navigate to the correct review page when a search result is clicked', () => {
      cy.get('input[type="search"]:visible').type('Disney')

      cy.get('div').contains('Disneyland').should('be.visible').click()

      cy.url().should('include', '/review/1')
    })
  })
})
