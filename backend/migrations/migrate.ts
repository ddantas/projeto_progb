import { Client } from "pg";
import fs from "fs";
import path from "path";

async function migrate() {
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "tamojunto",
  });
  await client.connect();

  const migrationsDir = path.join(__dirname, ".");
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`Executando: ${file}`);
    await client.query(sql);
  }

  console.log("Migrations concluídas.");
  await client.end();
}

migrate().catch((err) => {
  console.error("Erro ao executar migrations:", err.message);
  process.exit(1);
});