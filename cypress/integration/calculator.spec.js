describe('Calculator app', () => {
  it("Calculates correct value", () => {
    cy.visit('/');

    cy.contains('button', '(').click();
    cy.contains('button', '5').click();
    cy.contains('button', '+').click();
    cy.contains('button', '5').click();
    cy.contains('button', ')').click();
    cy.contains('button', '=').click();

    cy.contains('.screen','10');
  })
  it("Clears screen content", () => {
    cy.visit('/');

    cy.contains('button', '(').click();
    cy.contains('button', '5').click();
    cy.contains('button', '+').click();
    cy.contains('button', '5').click();
    cy.contains('button', ')').click();
    cy.contains('button', 'C').click();
    cy.contains('button', '(').click();
    cy.contains('button', '6').click();
    cy.contains('button', '+').click();
    cy.contains('button', '6').click();
    cy.contains('button', ')').click();
    cy.contains('button', '=').click();

    cy.contains('.screen','12');
  })
})