describe('Application Routing and Components', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // Test the home page
  it('should load the home page and display Navbar', () => {
    cy.get('nav').should('be.visible')

    cy.get('nav a').first().should('have.attr', 'href', '/project2')

    cy.get('nav').contains('Browse').should('be.visible')
  })

  it('should navigate to Browse page from Navbar', () => {
    cy.get('nav').contains('Browse').click()

    cy.url().should('include', '/browse')

    cy.get('h2').should('have.text', 'Browse Cards')
  })

  // Test the cards on the home page
  it('should navigate to Browse when card with Swim in Spain is clicked and apply the correct filters', () => {
    // Click on the card with "Swim in Spain"
    cy.get('p').contains('Swim in Spain').click()

    cy.url().should('include', '/browse')

    cy.get('h2').should('have.text', 'Browse Cards')

    cy.get('button').contains('Activities').should('have.class', 'bg-accent-1')

    // Verify all articles contain "Spain"
    cy.get('article').each(($el) => {
      cy.wrap($el).should('contain', 'Spain')
    })
  })

  // Visit a non-existent route
  it('should display 404 page for non-existent routes', () => {
    cy.visit('/project2/reviews', { failOnStatusCode: false })

    cy.get('h1').should('contain.text', "Oh no, looks like you've traveled a bit to far")
  })

  describe('Application Routing and Components', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('should navigate to the correct review page when a search result is clicked', () => {
      cy.get('input[type="search"]:visible').type('Disney')

      cy.get('div').contains('Disneyland').should('be.visible').click()

      cy.url().should('include', '/destination/1')
    })
  })
})

describe('Browse Page Filters', () => {
  beforeEach(() => {
    cy.visit('/project2/browse')
  })

  it('should disable the Activities filter when Brazil is selected in the country dropdown', () => {
    // Open the Country Dropdown
    cy.get('button').contains('Select countries').click()

    // Select Brazil from the dropdow
    cy.contains('Brazil').click()

    // Verify that "Activities" button is disabled
    cy.get('button').contains('Activities').should('have.attr', 'disabled')
  })
})

describe('Browse Page Cards', () => {
  beforeEach(() => {
    cy.visit('/project2/browse')
  })

  it('should navigate to the correct card details when a card is clicked', () => {
    cy.get('article').first().click()

    cy.get('button').contains('Read more').click()

    cy.url().should('include', '/destination/68')
  })
})

// Test the search functionality
describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to the correct destination when searching for a destination', () => {
    cy.get('input[type="search"]').type('Disneyland')

    cy.get('p').contains('Disneyland').click()

    cy.url().should('include', '/destination/1')
  })
})

// Test the login page
describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('/project2/profile')
  })

  it('should display the user profile page', () => {
    cy.get('button').should('contain.text', 'Login')
  })
})
