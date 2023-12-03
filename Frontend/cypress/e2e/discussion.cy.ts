describe("Discussion", () => {
  //  Create Account  and Login first

  const email = `test${Math.floor(Math.random() * 1000)}@example.com`;

  const username = `testuser${Math.floor(Math.random() * 1000)}`;
  const password = "password";

  it("should create a new user first", () => {
    cy.visit("/auth");
    cy.get('[data-cy="change-auth-mode-button"]').click();
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="username-input"]').type(username);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.contains("Account Created.", { timeout: 10000 });
  });

  it("should be able create a discussion, like it, be able to comment, be able to like a comment, be able to unlike a commentt and unlike a discussion", () => {
    cy.visit("/auth");
    cy.get('[data-cy="email-input"]').type(email);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="submit-auth-button"]').click();
    cy.wait(3000);
    cy.url().should("include", "/");
    cy.visit("/discussion/create");
    cy.get('[data-cy="discussion-title-input"]').type("Test Discussion");
    cy.get('[data-cy="discussion-content-input"]').type(
      "Test Discussion Content",
    );
    cy.get('[data-cy="create-discussion-button"]').click();
    cy.contains("Discussion Created.", { timeout: 10000 });
    cy.wait(3000);
    cy.contains("Test Discussion");
    cy.contains("Test Discussion Content");

    context("should be able to like a discussion", () => {
      cy.get('[data-cy="like-post-button"]').click();
      cy.get('[data-cy="like-post-button"]').should("contain.text", "1");
      cy.get('[data-cy="like-post-button"]').click();
      cy.get('[data-cy="like-post-button"]').should("contain.text", "0");
    });
    const testComment = "Test Comment";
    context("should be able to comment on a discussion", () => {
      cy.get("[data-cy=create-comment-input]").type(testComment);
      cy.get("[data-cy=create-comment-button]").click();
      cy.contains(testComment, { timeout: 10000 });

      cy.get("[data-cy=like-comment-button]").click();
      cy.get("[data-cy=like-comment-button]").should("contain.text", "1");
      cy.get("[data-cy=like-comment-button]").click();
      cy.get("[data-cy=like-comment-button]").should("contain.text", "0");

      cy.get('[data-cy="delete-comment-button"]').click();
      cy.contains(testComment).should("not.exist");
    });

    context("should be able to delete a discussion", () => {
      cy.get('[data-cy="delete-post-button"]').click();
      cy.contains("Post Deleted.", { timeout: 10000 });
    });
  });
  // like-post-button
});
