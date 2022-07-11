it.only('testa a página da política de privavidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.get('#title').should('contain', 'CAC TAT - Política de privacidade')
})