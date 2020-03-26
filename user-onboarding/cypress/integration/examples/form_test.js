describe("Testing the Sign In Form", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000/");
    });

    it("Tests inputs on the Form", function(){
        cy.get("input[name='name']")
          .type("Manuel De La Mora")
          .should("have.value", "Manuel De La Mora");
        cy.get("input[name='email']")
          .type("redpage001@yahoo.com")
          .should("have.value", "redpage001@yahoo.com");
        cy.get("input[name='password']")
          .type("Legendary1")
          .should("have.value", "Legendary1");
        cy.get("#positions")
          .select("Team Lead")
          .should("have.value", "Team Lead");
        cy.get("input[type='checkbox']")
          .check()
          .should("be.checked");
        cy.get("button")
          .click();
    });
    
    it("Checks Form Validation Error Messages", function(){
        cy.get('input[name="name"]')
          .type("a")
          .type("{backspace}", { parseSpecialCharSequences: true })
        cy.get('#nameP')
          .should("be.visible")
        cy.get('input[name="email"]')
          .type("a")
          .should('have.length', 1)
        cy.get('#emailP')
          .should("be.visible")
        cy.get('input[name="password"]')
          .type("a")
          .type("{backspace}", { parseSpecialCharSequences: true })
        cy.get('#passwordP')
          .should("be.visible")
        cy.get('input[name="terms"]')
          .check()
          .uncheck()
        cy.get('#termsP')
          .should("be.visible")
        })
        
});