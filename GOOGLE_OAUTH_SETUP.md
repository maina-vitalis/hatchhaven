# Google OAuth Setup Guide

## ✅ What's Already Done

1. **NextAuth.js Configuration Updated**
   - Added Google provider to `src/lib/auth.ts`
   - Enabled Prisma adapter for database sessions
   - Updated callbacks for proper session handling

2. **UI Components Updated**
   - Login page now has functional Google OAuth button
   - Signup page includes Google OAuth option
   - Both buttons are properly connected to NextAuth

3. **Environment Variables Added**
   - Added placeholders for Google OAuth credentials in `.env`

## 🔧 What You Need to Do

### 1. Get Google OAuth Credentials

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or select a project**
3. **Enable Google+ API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

### 2. Update Environment Variables

Replace the placeholders in your `.env` file:

```env
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
```

### 3. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `/login` or `/signup`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth consent screen

## 🎯 How It Works

- **Login Flow**: Users can sign in with existing Google accounts
- **Signup Flow**: New users are automatically created in your database
- **Session Management**: Uses database sessions via Prisma adapter
- **User Data**: Google profile info (name, email, image) is stored in your User table
- **Account Linking**: OAuth accounts are linked via the Account table

## 🔒 Security Features

- Secure session management with database storage
- Automatic CSRF protection
- Proper callback URL validation
- User role assignment (defaults to CUSTOMER)

## 📝 Notes

- Users who sign up with Google won't have a password field
- Existing users can link their Google account to their email/password account
- The system handles both OAuth and credentials authentication seamlessly
