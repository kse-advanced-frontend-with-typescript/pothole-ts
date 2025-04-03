describe('Auth', () => {
    const baseUrl = 'http://localhost:8080/';
    const login = 'admin'
    const password = 'admin'

    describe.skip('when the user is authorized', () => {
        it('Add new Item button should be available', () => {
            cy.visit(baseUrl)
            cy.contains('Log In').click()
            cy.get('input').first().type(login)
            cy.get('input').last().type(password)
            cy.get('form button').click()

            cy.contains('Add new Item', {timeout: 10000}).should('be.visible')
        })
    })

    describe('when the user uses wrong password', () => {
        it('Add new Item button should be available', () => {
            cy.visit(baseUrl)
            cy.contains('Log In').click()
            cy.get('input').first().type(login)
            cy.get('input').last().type('wrong password')
            cy.get('form button').click()

            cy.on('uncaught:exception', () => {
                return false
            })

            cy.get('[class*="error"]', {timeout: 10000}).should('be.visible')
        })
    })

})
