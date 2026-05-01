# Money Transfer Management System (DDD + Clean Architecture)

## Layers
- **Domain**: entities, value objects, aggregates, events, repository contracts.
- **Application**: use cases and DTOs.
- **Infrastructure**: Prisma, JWT service, env config.
- **Interfaces**: Express controllers/routes/middleware.

## Run
```bash
cp .env.example .env
npm install
npx prisma generate
npm run dev
```

## Swagger
- URL: `http://localhost:3000/docs`
