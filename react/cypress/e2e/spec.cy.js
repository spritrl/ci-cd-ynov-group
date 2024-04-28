describe("Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("displays a success toast message when submitting a valid form", () => {
    cy.get('input[name="birthDate"]').type("2000-01-01");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="name"]').type("John");
    cy.get('input[name="surname"]').type("Doe");
    cy.get('input[name="city"]').type("New York");
    cy.get('input[name="postalCode"]').type("12345");
    cy.get("form").submit();
    cy.get(".Toastify__toast--success").should("be.visible");
  });

  it("clears the form fields after submitting a valid form", () => {
    cy.get('input[name="birthDate"]').type("2000-01-01");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="name"]').type("John");
    cy.get('input[name="surname"]').type("Doe");
    cy.get('input[name="city"]').type("New York");
    cy.get('input[name="postalCode"]').type("12345");
    cy.get("form").submit();
    cy.get('input[name="birthDate"]').should("have.value", "");
    cy.get('input[name="email"]').should("have.value", "");
    cy.get('input[name="name"]').should("have.value", "");
    cy.get('input[name="surname"]').should("have.value", "");
    cy.get('input[name="city"]').should("have.value", "");
    cy.get('input[name="postalCode"]').should("have.value", "");
  });

  it("disables the submit button when the form is invalid", () => {
    cy.get('button[type="submit"]').should("be.disabled");
    cy.get('input[name="birthDate"]').type("2000-01-01");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="name"]').type("John");
    cy.get('input[name="surname"]').type("Doe");
    cy.get('input[name="city"]').type("New York");
    cy.get('input[name="postalCode"]').type("12345");
    cy.get('button[type="submit"]').should("not.be.disabled");
  });

  it("displays a new user in users list", () => {
    cy.get('input[name="birthDate"]').type("2000-01-01");
    cy.get('input[name="email"]').type("levoici@example.com");
    cy.get('input[name="name"]').type("LeVoici");
    cy.get('input[name="surname"]').type("Doe");
    cy.get('input[name="city"]').type("New York");
    cy.get('input[name="postalCode"]').type("12345");
    cy.get("form").submit();
    cy.get(".Toastify__toast--success").should("be.visible");
    cy.get('[name="user-list-card"]').click();
    cy.contains("levoici@example.com");
    cy.get('[name="levoici@example.com-card"]').should("be.visible");
  });

  it("delete user from user list", () => {
    cy.get('[name="user-list-card"]').click();
    cy.get('[name="delete-button-levoici@example.com"]').click();
    cy.get("#password").should("be.visible");
    cy.get("#password").type("root");
    cy.get('[name="supprimer"]').click();
    cy.get('[name="levoici@example.com-card"]').should("not.exist");
  });
});
