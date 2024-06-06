import database from "infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const firstResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const firstResponseBody = await firstResponse.json();
  expect(firstResponse.status).toBe(201);
  expect(firstResponseBody.length).toBeGreaterThan(0);

  const lastResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const lastResponseBody = await lastResponse.json();
  expect(lastResponse.status).toBe(200);
  expect(lastResponseBody.length).toBe(0);

  expect(Array.isArray(firstResponseBody)).toBe(true);
  expect(Array.isArray(lastResponseBody)).toBe(true);
});
