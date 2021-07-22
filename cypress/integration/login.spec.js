/// <reference types="cypress" />

import LoginPage from '../support/page-objects/login';
import MinhaContaPage from '../support/page-objects/minha-conta';

context('Login', () => {
  let data;

  before(() => {
    cy.fixture('user').then((dadosUsuario) => {
      data = dadosUsuario;
    });
  });

  beforeEach(() => {
    cy.visit('http://lojaebac.ebaconline.art.br/');
  });

  it('com usuário cadastrado redirecionar para a página de Minha Conta', () => {
    cy.get('.icon-user-unfollow').click();

    // CONST/FIXTURE
    // cy.get('#username').type(data.usuario);
    // cy.get('#password').type(data.senha);

    // PAGE OBJECTS
    // LoginPage.login(data.usuario, data.senha);
    // MinhaContaPage.getUsuarioLogado().should('contain', 'Welcome Eshi Cruz !');

    // COMMANDS
    cy.login(data.usuario, data.senha);
    cy.mensagemBoasVindas().should('contain', 'Welcome Eshi Cruz !');

    // cy.get('.woocommerce-form > .button').click();
    // cy.get('a > .hidden-xs').should('contain', 'Welcome Eshi Cruz !');
  });
});
