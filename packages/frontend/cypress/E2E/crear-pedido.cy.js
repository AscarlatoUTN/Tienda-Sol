describe("Pedidos", () => {
    it("El pedido se realiza correctamente", () => {
        cy.visit("http://localhost:5173/login");
        cy.get('input.login-input[type="text"]').type("tobiwa");
        cy.get('input.login-input[type="password"]').type("1234567");
        cy.get('.login-button').click();

        cy.get(".products-grid > article:nth-child(2) .add-button").click();

        cy.get('button.btn.btn--ghost.btn--md[aria-label^="Carrito de compras"]').click();
        cy.get('.cart-drawer-paper .buy-button').click();

        cy.get('.MuiTextField-root input').eq(0).type('Calle falsa');
        cy.get('.MuiTextField-root input').eq(1).type('123');
        cy.get('.MuiTextField-root input').eq(2).type('Springfield');
        cy.get('.MuiTextField-root input').eq(3).type('Buenos Aires');
        cy.get('.MuiTextField-root input').eq(4).type('1234');
        cy.get('.MuiTextField-root input').eq(5).type('Argentina');

        cy.get('.MuiDialogActions-root .MuiButton-contained').click();

        cy.contains("Pedido creado").should("be.visible");
        cy.get('.cart-drawer-paper', { timeout: 10000 }).should('not.be.visible');

    });
});