import oschestrator from "../oschestrator";

beforeAll(async () => {
  await oschestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();

  expect(responseBody.update_at).toEqual(parsedUpdateAt);
  expect(responseBody.dependecies.database.version).toBe("16.0");
  expect(responseBody.dependecies.database.max_connections).toBeGreaterThan(0);
  expect(responseBody.dependecies.database.opened_connections).toEqual(1);
});
