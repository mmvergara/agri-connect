describe("Endorsement", () => {
  //  Create Account  and Login first

  const email = `test${Math.floor(Math.random() * 1000)}@example.com`;
  const username = `testuser${Math.floor(Math.random() * 1000)}`;
  const password = "password";

  const email2 = `test2${Math.floor(Math.random() * 1000)}@yo.com`;
  const username2 = `testuser2${Math.floor(Math.random() * 1000)}`;
  const password2 = "password";

  it("should create a new user first", () => {
    cy.visit("/auth");
    cy.get('[data-cy="change-auth-mode-button"]').click();
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="username-input"]').type(username);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.contains("Account Created.", { timeout: 10000 });
  });

  it("should create a new user first", () => {
    cy.visit("/auth");
    cy.get('[data-cy="change-auth-mode-button"]').click();
    cy.get('[data-cy="email-input"]').type(email2);
    cy.get('[data-cy="username-input"]').type(username2);
    cy.get('[data-cy="password-input"]').type(password2);
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.contains("Account Created.", { timeout: 10000 });
  });

  it("should be able to endorse and unendorse a seller/user", () => {
    cy.visit("/auth");
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.wait(3000);

    cy.visit(`/u/${username2}`);
    cy.wait(6000);

    cy.get("[data-cy=endorse-user-button]").click();
    cy.wait(3000);
    cy.get("[data-cy=endorsers-count]").should("contain.text", "1");
    cy.get("[data-cy=endorse-user-button]").click();
    cy.wait(3000);
    cy.get("[data-cy=endorsers-count]").should("contain.text", "0");
  });
});
