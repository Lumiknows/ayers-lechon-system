const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

async function main() {
  const hash = await bcrypt.hash("ayersAdmin321", 12);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const sql = 'UPDATE "Admin" SET "passwordHash" = $1 WHERE "email" = $2';
  await pool.query(sql, [hash, "admin@ayerlechon.com"]);
  console.log("Password updated successfully!");
  console.log("Login: admin@ayerlechon.com / ayersAdmin321");
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
