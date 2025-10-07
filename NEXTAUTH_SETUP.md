# NextAuth Setup Instructions

This project now includes NextAuth.js for authentication with Google OAuth. Follow these steps to complete the setup:

## 1. Create Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000/app/api/auth
NEXTAUTH_SECRET=your-secret-key-here

# Note: NEXTAUTH_URL should point to the NextAuth API endpoint with the base path

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 2. Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## 3. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create "OAuth 2.0 Client IDs"
5. Set the authorized redirect URIs:
   - For development: `http://localhost:3000/app/api/auth/callback/google`
   - For production: `https://yourdomain.com/app/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

## 4. Update NEXTAUTH_URL for Production

When deploying to production, update the `NEXTAUTH_URL` in your environment variables to match your domain.

## 5. Test the Authentication

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/app`
3. Click "Sign In to Dashboard"
4. Complete the Google OAuth flow
5. You should be redirected to the protected dashboard

## Files Added/Modified

- `src/lib/auth.ts` - NextAuth configuration
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth API route handler
- `src/types/next-auth.d.ts` - TypeScript type extensions
- `src/components/protected-page.tsx` - Updated redirect path
- `src/app/page.tsx` - Added sign-in link

## Troubleshooting

- Make sure all environment variables are set correctly
- Check that the Google OAuth redirect URI matches your domain
- Verify that the NextAuth secret is properly generated
- Check the browser console for any error messages

### Common Issues with Base Path

If you're getting redirected to `/api/auth/error` instead of `/app/api/auth/error`:

1. **Check your environment variables**: Make sure `NEXTAUTH_URL` includes the `/app` base path
2. **Verify Google OAuth configuration**: The redirect URI in Google Cloud Console should be:
   - Development: `http://localhost:3000/app/api/auth/callback/google`
   - Production: `https://yourdomain.com/app/api/auth/callback/google`
3. **Clear browser cache**: Sometimes cached redirects can cause issues
4. **Check Next.js base path**: Ensure `basePath: "/app"` is set in `next.config.ts`
