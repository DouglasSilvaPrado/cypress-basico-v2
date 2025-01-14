// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    it('verificar o títilo da aplicação', () => {     
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });
    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Olá Mundo! QWJDQLWGDQWGYQUWDGOQWGQWOWQOQWJDQLWGDQWGYQUWDGOQWGQWOWQO'
        
        cy.get('#firstName')
        .type('Douglas')
        .should('have.value', 'Douglas')

        cy.get('#lastName')
        .type('Prado')
        .should('have.value', 'Prado')

        cy.get('#email')
        .type('douglasprado@gmail.com')
        .should('have.value', 'douglasprado@gmail.com')

        cy.get('#open-text-area')
        .type(longText, {delay:0})
        .should('have.value', longText)

        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Douglas')

        cy.get('#lastName').type('Prado')

        cy.get('#email').type('douglasprado.gmail.com')

        cy.get('#open-text-area').type('ola', {delay:0})

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    });

    it('campo telefone contina vazio quando prenchido com valor não numerio', () => {
        cy.get('#phone').type('Douglas').should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Douglas')

        cy.get('#lastName').type('Prado')

        cy.get('#email').type('douglasprado.gmail.com')

        cy.get('#phone-checkbox').check()

        cy.get('#open-text-area').type('ola')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')  
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Douglas').should('have.value', 'Douglas').clear().should('have.value', '')

        cy.get('#lastName').type('Prado').should('have.value', 'Prado').clear().should('have.value', '')

        cy.get('#email').type('douglasprado@gmail.com').should('have.value', 'douglasprado@gmail.com').clear().should('have.value', '')

        cy.get('#open-text-area').type('ola').should('have.value', 'ola').clear().should('have.value', '')

    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked')
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('@sampleFile')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    });
    
;})