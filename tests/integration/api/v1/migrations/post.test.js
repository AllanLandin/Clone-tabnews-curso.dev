import database from "infra/database";
import oschestrator from "../oschestrator";

beforeAll(async () => {
  await cleanDatabase();
  await oschestrator.waitForAllServices();
});

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const firstResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const firstResponseBody = await firstResponse.json();
  console.log(firstResponse.status);
  expect(firstResponse.status).toBe(201);
  expect(firstResponseBody.length).toBeGreaterThan(0);

  const lastResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const lastResponseBody = await lastResponse.json();
  console.log(lastResponse.status);
  expect(lastResponse.status).toBe(200);
  expect(lastResponseBody.length).toBe(0);

  expect(Array.isArray(firstResponseBody)).toBe(true);
  expect(Array.isArray(lastResponseBody)).toBe(true);
});
