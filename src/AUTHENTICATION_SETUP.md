# 🔐 Admin Authentication Setup

This guide explains how to set up authentication for the admin panel using Supabase.

## Quick Setup Steps

### 1. Enable Email Authentication in Supabase

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Providers**
3. Enable **Email** provider
4. (Optional) Disable "Enable email confirmations" for easier testing

### 2. Create Admin User

**Option A: Via Dashboard (Recommended)**
1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - **Email**: `mallick.nazrul@gmail.com`
   - **Password**: `NAZRULNDC99`
   - ✅ Check **"Auto Confirm User"**
4. Click **"Create user"**

**Option B: Via SQL Editor**
See `SUPABASE_SETUP_GUIDE.md` Section 8 for SQL commands.

### 3. Test Login

1. Start your dev server: `npm run dev`
2. Navigate to `/login`
3. Enter your credentials
4. You should be redirected to `/admin`

## How It Works

- **Authentication**: Uses Supabase Auth (email/password)
- **Session Management**: Automatically handled by Supabase
- **Access**: Works from anywhere once logged in
- **Security**: Passwords are hashed with bcrypt
- **Persistence**: Sessions persist across page refreshes

## Admin Credentials

- **Email**: `mallick.nazrul@gmail.com`
- **Password**: `NAZRULNDC99`

⚠️ **Keep these credentials secure!**

## Troubleshooting

### "Invalid login credentials"
- Verify email and password are correct
- Check user exists in Supabase → Authentication → Users
- Ensure email authentication is enabled

### "Email not confirmed"
- Go to Supabase → Users → Find your user → Confirm email
- Or recreate user with "Auto Confirm User" checked

### Session not persisting
- Check browser console for errors
- Verify `.env` file has correct Supabase credentials
- Restart dev server after changing `.env`

## For More Details

See `SUPABASE_SETUP_GUIDE.md` Section 8 for complete documentation.


