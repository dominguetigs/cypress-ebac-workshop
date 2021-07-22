/// <reference types="cypress" />

context('Validate purchase', () => {
  before(() => {
    cy.visit('http://lojaebac.ebaconline.art.br');
  });

  afterEach(() => {
    cy.screenshot();
  });

  it('Navigate to purchase page', () => {
    cy.get('#primary-menu > .menu-item-629 > a').as('comprarMenuLink');
    cy.get('@comprarMenuLink')
      .contains('Comprar')
      .and('have.attr', 'href')
      .and('include', 'shop');
    cy.get('@comprarMenuLink').click();
    cy.get('.page-title').should('contain', 'Produtos');
    cy.url().should('contain', '/shop');
  });

  it('Navigate to purchase detail page and buy', () => {
    cy.get(
      '.post-2559 > .product-block > .block-inner > .image > .product-image > .image-hover'
    ).click();

    cy.get('.single_add_to_cart_button').as('purchaseButton');
    cy.get('@purchaseButton')
      .should('contain.text', 'Comprar')
      .and('have.class', 'disabled');

    cy.get('.button-variable-item-XS').click();
    cy.get('.button-variable-item-Blue').click();
    cy.get('@purchaseButton').should('not.have.class', 'disabled').click();

    cy.get('.woocommerce-message').should(
      'contain',
      'foi adicionado no seu carrinho.'
    );
    cy.get('.woocommerce-message > .button').click();

    cy.get('.checkout-button').should('contain', 'Concluir').click();
    cy.get('.page-title').should('contain.text', 'Checkout');
    cy.get('#place_order').should('contain', 'Finalizar');
  });
});
