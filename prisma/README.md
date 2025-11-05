# Prisma Database Schema

This directory contains the Prisma schema and migrations for the HatchHaven e-commerce platform.

## Models Overview

### Authentication Models (NextAuth.js)

- **User**: Main user model with role-based access (CUSTOMER, ADMIN)
- **Account**: OAuth provider accounts linked to users
- **Session**: User session tokens for authentication
- **VerificationToken**: Email verification tokens

### E-commerce Models

- **Category**: Product categories (e.g., Chickens, Turkeys, Ducks)
- **Breed**: Specific breeds within categories
- **ProductVariant**: Product variants with different genders, age groups, pricing, and stock
- **Cart**: Shopping carts (supports both authenticated users and guests)
- **CartItem**: Items in shopping carts
- **Order**: Customer orders with status tracking
- **OrderItem**: Individual items within orders

## Relationships

```
User (1) ──┬──> (many) Account
           ├──> (many) Session
           └──> (many) Order

Category (1) ──> (many) Breed

Breed (1) ──> (many) ProductVariant

ProductVariant (1) ──┬──> (many) CartItem
                     └──> (many) OrderItem

Cart (1) ──> (many) CartItem

Order (1) ──> (many) OrderItem
```

## Usage

### Generate Prisma Client
```bash
npx prisma generate
```

### Create and apply migrations
```bash
npx prisma migrate dev --name init
```

### Open Prisma Studio (Database GUI)
```bash
npx prisma studio
```

### Pull schema from existing database
```bash
npx prisma db pull
```

### Push schema to database (without migrations)
```bash
npx prisma db push
```

## Next Steps

1. Run migrations to create the database tables:
   ```bash
   npx prisma migrate dev --name init
   ```

2. Install NextAuth.js dependencies:
   ```bash
   npm install next-auth @auth/prisma-adapter
   ```

3. Configure NextAuth.js to use the Prisma adapter

4. Create seed script for initial data (categories, breeds, admin user)

