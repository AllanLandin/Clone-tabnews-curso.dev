import database from "infra/database";

import oschestrator from "../oschestrator";

beforeAll(async () => {
  await oschestrator.waitForAllServices();
});

test("DELETE to /api/v1/migrations should return 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });
  const responseBody = await response.json();

  expect(response.status).toBe(405);
});
