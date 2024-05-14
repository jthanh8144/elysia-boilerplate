# Elysia Boilerplate

Tech stack: Bun, Elysia, typeorm, jsonwebtoken, winston

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

Open http://localhost:3000/ with your browser to see the result.

## Note

Currently, the typeorm migration and the getting entities using entity path aren't working. So I temporarily set the `synchronize` to true, comment the `migrations` and `entities` using path and use the object `entities`
