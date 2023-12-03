describe("Authentication/User", () => {
  const newAccountEmail = `test-${Math.floor(
    Math.random() * 1000000,
  )}@test.com`;
  const newAccountOldPassword = "test1234";
  const newAccountNewPassword = "test12345";

  // const newAccountEmail = " test-193087@test.com";

  it("Should be able to create an account", () => {
    cy.visit("/auth");
    cy.get('[data-cy="change-auth-mode-button"]').click();
    cy.get('[data-cy="email-input"]').type(newAccountEmail);
    cy.get('[data-cy="username-input"]').type(newAccountEmail);
    cy.get('[data-cy="password-input"]').type(newAccountOldPassword);

    cy.get('[data-cy="submit-auth-button"]').click();

    cy.contains("Account Created.", { timeout: 10000 });
  });

  it("Should be able to login", () => {
    cy.visit("/auth");
    cy.get('[data-cy="email-input"]').type(newAccountEmail);
    cy.get('[data-cy="password-input"]').type(newAccountOldPassword);

    cy.get('[data-cy="submit-auth-button"]').click();
    cy.url().should("include", "/");
  });

  it("Should be able to reset password", () => {
    // Login first
    cy.visit("/auth");
    cy.get('[data-cy="email-input"]').type(newAccountEmail);
    cy.get('[data-cy="password-input"]').type(newAccountOldPassword);

    cy.get('[data-cy="submit-auth-button"]').click();
    cy.url().should("include", "/");

    // Reset password
    cy.get('[data-cy="menu-bar-button"]', { timeout: 10000 }).click();
    cy.get('[data-cy="Settings-button"]').click();
    cy.url().should("include", "/u/settings");

    cy.get('[data-cy="old-password-input"]').type(newAccountOldPassword);
    cy.get('[data-cy="new-password-input"]').type(newAccountNewPassword);
    cy.get('[data-cy="change-password-button"]').click();

    cy.contains("Password changed successfully", { timeout: 10000 });

    cy.visit("/auth");
    cy.get('[data-cy="email-input"]').type(newAccountEmail);
    cy.get('[data-cy="password-input"]').type("test12345");
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.url().should("include", "/");
  });

  it("Should be able to delete account", () => {
    // Login first
    cy.visit("/auth");
    cy.get('[data-cy="email-input"]').type(newAccountEmail);
    cy.get('[data-cy="password-input"]').type(newAccountNewPassword);

    cy.get('[data-cy="submit-auth-button"]').click();
    cy.url().should("include", "/");

    // Delete account
    cy.get('[data-cy="menu-bar-button"]', { timeout: 10000 }).click();
    cy.get('[data-cy="Settings-button"]').click();
    cy.url().should("include", "/u/settings");

    cy.get('[data-cy="delete-account-password-input"]').type(
      newAccountNewPassword,
    );
    cy.get("[data-cy=delete-account-button").click();
    cy.contains("Account deleted successfully", { timeout: 10000 });

    cy.get('[data-cy="email-input"]').type(newAccountEmail);
    cy.get('[data-cy="password-input"]').type(newAccountNewPassword);
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.contains("User does not exist", { timeout: 10000 });
  });
});
