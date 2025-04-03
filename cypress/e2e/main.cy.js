describe('List of items', () => {
    const baseUrl = 'http://localhost:8080/';

    describe('when click List tab', () => {
        beforeEach(() => {
            switchToListState(baseUrl);
        })

        it('should render the list of items', () => {
            cy.get('ul[class*="items--ListOfMapItems"] li', {timeout: 10000})
                .should('be.visible')
        })

        describe('when click the list element', () => {
            it('should open the detailed page', () => {
                cy.get('ul[class*="items--ListOfMapItems"] li', {timeout: 10000})
                    .first()
                    .click()
                cy.get('[class*="wrapper--DetailPage"] h2').should('be.visible')
            })
        })
    })
})

function switchToListState(baseUrl) {
    cy.visit(baseUrl);
    cy.contains('List').click();
    cy.get('ul[class*="items--ListOfMapItems"]', {timeout: 10000})
        .should('be.visible')
}
