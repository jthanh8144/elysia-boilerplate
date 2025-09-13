# Elysia Boilerplate

Tech stack: Bun, Elysia, PostgreSQL, typeorm, jsonwebtoken, winston

## Development

Create `.env` file:

```bash
cp example.env .env
```

Fill the value of variables in `.env` file

To start the development server run:

```bash
bun dev
```

## Database migration

- Generate migration file

  ```
  bun migration:generate <file-name>
  ```

- Running migration

  ```
  bun migration:run
  ```

- Revert migration

  ```
  bun migration:revert
  ```

## Note

- `TypeORM` migrations require `ts-node` to transpile TypeScript to JavaScript, and `tsconfig-paths` to resolve path aliases. Therefore, both must be installed as dev dependencies.

- Currently, the `elysia-compression` plugin has [an issue](https://github.com/elysiajs/elysia/issues/979), so I’m using a custom compression plugin based on [this repository](https://github.com/Borderliner/elysia-plugins/blob/main/compression.plugin.ts). I’ll switch back to the recommended compression plugin from the Elysia documentation once the issue is fixed.
