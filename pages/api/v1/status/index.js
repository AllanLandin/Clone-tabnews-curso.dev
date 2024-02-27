import database from "infra/database.js";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = maxConnectionsResult.rows[0].max_connections;

  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const oppenedConnections = openedConnectionsResult.rows[0].count;

  const DbVersionResult = await database.query("SHOW server_version;");
  const DbVersion = DbVersionResult.rows[0].server_version;

  return res.status(200).json({
    update_at: updateAt,
    dependecies: {
      database: {
        version: DbVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: oppenedConnections,
      },
    },
  });
}

export default status;
