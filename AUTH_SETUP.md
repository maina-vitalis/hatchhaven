# Authentication Setup Guide

This document outlines the NextAuth.js authentication implementation for Hatch Haven.

## Setup Complete ✅

The following components have been implemented:

### 1. **NextAuth Configuration**
- ✅ NextAuth.js v5 (beta) installed
- ✅ Prisma adapter configured
- ✅ Credentials provider for email/password authentication
- ✅ JWT session strategy
- ✅ Role-based access control (CUSTOMER, ADMIN)

### 2. **Database Schema**
- ✅ User model updated with `password` field
- ✅ Role enum (CUSTOMER, ADMIN)
- ✅ NextAuth models (Account, Session, VerificationToken)

### 3. **API Routes**
- ✅ `/api/auth/[...nextauth]` - NextAuth handler
- ✅ `/api/auth/signup` - User registration endpoint

### 4. **Authentication Pages**
- ✅ `/login` - Login page with NextAuth integration
- ✅ `/signup` - Signup page with password validation
- ✅ Error handling and success messages

### 5. **Route Protection**
- ✅ Middleware for admin route protection
- ✅ Admin layout with authentication checks
- ✅ Automatic redirects for unauthorized access

### 6. **Utilities & Hooks**
- ✅ Password hashing utilities (bcrypt)
- ✅ Session helpers
- ✅ TypeScript types for NextAuth

## Environment Variables

Make sure your `.env` file includes:

```env
DATABASE_URL="your-database-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

**Important**: Generate a secure `NEXTAUTH_SECRET` for production:
```bash
openssl rand -base64 32
```

## Database Migration

Run the following to update your database schema:

```bash
npx prisma migrate dev --name add-password-field
```

Or push the schema directly:
```bash
npx prisma db push
```

## Creating an Admin User

To create an admin user, you can:

1. **Via Prisma Studio**:
   ```bash
   npx prisma studio
   ```
   - Create a user with `role: ADMIN`
   - Set a password (it will be hashed automatically via the signup API)

2. **Via API** (then manually update role):
   ```bash
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Admin User","email":"admin@example.com","password":"SecurePassword123"}'
   ```
   Then update the user's role to ADMIN in the database.

3. **Via Seed Script** (create `prisma/seed.ts`):
   ```typescript
   import { PrismaClient } from '@prisma/client';
   import bcrypt from 'bcryptjs';

   const prisma = new PrismaClient();

   async function main() {
     const hashedPassword = await bcrypt.hash('admin123', 12);
     
     await prisma.user.upsert({
       where: { email: 'admin@hatchhaven.com' },
       update: {},
       create: {
         email: 'admin@hatchhaven.com',
         name: 'Admin User',
         password: hashedPassword,
         role: 'ADMIN',
       },
     });
   }

   main()
     .catch((e) => {
       console.error(e);
       process.exit(1);
     })
     .finally(async () => {
       await prisma.$disconnect();
     });
   ```

## Usage

### Login Flow
1. User visits `/login`
2. Enters email and password
3. NextAuth validates credentials
4. On success, redirects to callback URL or home
5. Session is stored in JWT

### Signup Flow
1. User visits `/signup`
2. Fills out registration form
3. Password is validated (min 8 chars, etc.)
4. Password is hashed and user is created
5. Redirects to login page

### Admin Access
1. Admin routes (`/admin/*`) are protected by middleware
2. Non-authenticated users are redirected to `/login`
3. Non-admin users are redirected to home page
4. Admin layout checks authentication status

## Security Features

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT-based sessions
- ✅ Role-based access control
- ✅ Route protection middleware
- ✅ Secure password validation
- ✅ CSRF protection (built into NextAuth)

## Next Steps

1. **Run database migration**:
   ```bash
   npx prisma migrate dev --name add-password-field
   ```

2. **Create an admin user** (see above)

3. **Test authentication**:
   - Sign up a new user
   - Login with credentials
   - Access admin dashboard (requires ADMIN role)

4. **Optional Enhancements**:
   - Add OAuth providers (Google, GitHub)
   - Add email verification
   - Add password reset functionality
   - Add two-factor authentication

## Troubleshooting

### "No user found with this email"
- Ensure user exists in database
- Check email spelling

### "Invalid email or password"
- Verify password is correct
- Check if password field exists in database

### "Please sign in with your social account"
- User doesn't have a password set
- Use signup API or set password manually

### Middleware not working
- Ensure `middleware.ts` is in project root
- Check Next.js version (requires 13+)
- Verify route matcher pattern

