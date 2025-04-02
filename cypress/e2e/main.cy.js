describe('Main page', () => {
    const baseUrl = 'http://localhost:8080/';
    it('should open', () => {
        cy.visit(baseUrl);
        cy.contains('Log In').click()
        cy.contains('Pothole').click()
        cy.matchScreenshot('Sign In')
    })
})
