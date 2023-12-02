describe("Authentication/User", () => {
  // const newAccountEmail = `test-${Math.floor(
  //   Math.random() * 1000000,
  // )}@test.com`;
  const newAccountPassword = "test1234";

  const newAccountEmail = " test-193087@test.com";

  // it("Should be able to create an account", () => {
  //   cy.visit("/auth");
  //   cy.get('[data-cy="change-auth-mode-button"]').click();
  //   cy.get('[data-cy="email-input"]').type(newAccountEmail);
  //   cy.get('[data-cy="username-input"]').type(newAccountEmail);
  //   cy.get('[data-cy="password-input"]').type(newAccountPassword);

  //   cy.get('[data-cy="submit-auth-button"]').click();

  //   cy.contains("Account Created.", { timeout: 10000 });
  // });

  // it("Should be able to login", () => {
  //   cy.visit("/auth");
  //   cy.get('[data-cy="email-input"]').type(newAccountEmail);
  //   cy.get('[data-cy="password-input"]').type(newAccountPassword);

  //   cy.get('[data-cy="submit-auth-button"]').click();
  //   cy.url().should("include", "/");
  // });

  it("Should be able to reset password", () => {
    // Login first
    cy.visit("/auth");
    cy.get('[data-cy="email-input"]').type(newAccountEmail);
    cy.get('[data-cy="password-input"]').type(newAccountPassword);

    cy.get('[data-cy="submit-auth-button"]').click();
    cy.url().should("include", "/");

    // Reset password
    cy.get('[data-cy="menu-bar-button"]', { timeout: 10000 }).click();
    cy.get('[data-cy="Settings-button"]').click();
    cy.url().should("include", "/u/settings");


    cy.get('[data-cy="old-password-input"]').type(newAccountPassword);
    cy.get('[data-cy="new-password-input"]').type("test12345");
    cy.get('[data-cy="change-password-button"]').click();

  });
});
