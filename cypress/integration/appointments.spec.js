describe("Appointment", () => {
  it("Should book an interview", () => {
    cy.visit("/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });
});