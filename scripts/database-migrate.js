const { execSync } = require("child_process");

const args = process.argv.slice(2).join(" ");

if (!args) {
  console.error("Please provide a name for the migration.");
  process.exit(1);
}

execSync(
  `bun run typeorm -- migration:generate ./src/database/migrations/${args} -d ./src/shared/configs/data-source.config.ts`,
  { stdio: "inherit" }
);
