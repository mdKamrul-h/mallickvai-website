# 🚀 Supabase Setup Guide - Image Upload & Free Hosting

This guide will walk you through setting up Supabase for image uploads and hosting your application for free.

---

## 📋 Table of Contents

1. [Setting Up Supabase](#setting-up-supabase)
2. [Configuring Storage Buckets](#configuring-storage-buckets)
3. [Setting Up Environment Variables](#setting-up-environment-variables)
4. [Testing the Integration](#testing-the-integration)
5. [Free Hosting Options](#free-hosting-options)
6. [Troubleshooting](#troubleshooting)

---

## 1. Setting Up Supabase

### Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with GitHub, Google, or email
4. Verify your email if required

### Step 2: Create a New Project

1. Click **"New Project"** in your dashboard
2. Fill in the project details:
   - **Name**: Your project name (e.g., "Mallick Portfolio")
   - **Database Password**: Create a strong password (save this!) VVhnxRXxbUNC6J30
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Select **"Free"** (perfect for getting started)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be set up

### Step 3: Get Your API Keys

1. Once your project is ready, go to **Settings** → **API**
2. You'll see two important values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)https://ctsbcyhtchhlrddocvkt.supabase.co
   - **anon/public key** (a long string starting with `eyJ...`)eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0c2JjeWh0Y2hobHJkZG9jdmt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1Mjg3MTksImV4cCI6MjA4MDEwNDcxOX0.dYEjWwuKH3z9sxh0tbJtfF1JBQ9duCxvxdoAQLj6t6c

**⚠️ Important**: Copy both values - you'll need them in the next step!

---

## 2. Setting Up Database Tables

Before uploading content, you need to create the database tables.

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New query"**
3. Copy the SQL from **SUPABASE_DATABASE_SCHEMA.md** file
4. Paste and click **"Run"** (or press Ctrl+Enter)
5. Verify tables were created by going to **Table Editor** - you should see 6 tables:
   - `blog_posts`
   - `gallery_images`
   - `achievements`
   - `testimonials`
   - `career_timeline`
   - `milestones`

**Note**: See `SUPABASE_DATABASE_SCHEMA.md` for detailed schema documentation.

---

## 3. Configuring Storage Buckets

Supabase Storage is where your images will be stored. We need to create five buckets for different image types.

### Step 1: Create Storage Buckets

1. In your Supabase dashboard, go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Create five buckets with these exact names:

   **Bucket 1: `gallery-images`**
   - Name: `gallery-images`
   - Public bucket: ✅ **Enabled** (IMPORTANT!)
   - Click **"Create bucket"**

   **Bucket 2: `milestone-images`**
   - Name: `milestone-images`
   - Public bucket: ✅ **Enabled** (IMPORTANT!)
   - Click **"Create bucket"**

   **Bucket 3: `journey-images`**
   - Name: `journey-images`
   - Public bucket: ✅ **Enabled** (IMPORTANT!)
   - Click **"Create bucket"**

   **Bucket 4: `blog-images`**
   - Name: `blog-images`
   - Public bucket: ✅ **Enabled** (IMPORTANT!)
   - Click **"Create bucket"**

   **Bucket 5: `testimonial-images`**
   - Name: `testimonial-images`
   - Public bucket: ✅ **Enabled** (IMPORTANT!)
   - Click **"Create bucket"**

### Step 2: Set Up Storage Policies (Make Images Publicly Accessible)

For each bucket, we need to allow public read access so everyone can view the images:

1. Go to **Storage** → Click on a bucket (e.g., `gallery-images`)
2. Click on the **"Policies"** tab
3. Click **"New Policy"**
4. Select **"For full customization"**
5. Name the policy: `Public Read Access`
6. Use this SQL (copy and paste):

```sql
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery-images' );
```

7. Click **"Review"** then **"Save policy"**
8. Repeat this for all five buckets (change `bucket_id` to match each bucket name)

**Alternative Quick Method** (if the above doesn't work):
- Go to **Storage** → **Policies**
- For each bucket, create a policy with:
  - Policy name: `Public Read`
  - Allowed operation: `SELECT`
  - Policy definition: `true` (allows everyone to read)

---

## 4. Setting Up Environment Variables

### Step 1: Create `.env` File

1. In your project root directory, create a file named `.env`
2. Add the following content (replace with your actual values):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Replace:
   - `https://xxxxxxxxxxxxx.supabase.co` with your **Project URL**
   - `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with your **anon/public key**

### Step 2: Verify Your `.env` File

Your `.env` file should look like this (with your actual values):

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Restart Your Development Server

1. Stop your current dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

**⚠️ Important**: 
- Never commit your `.env` file to Git! It's already in `.gitignore`
- The `.env` file is for local development
- For production hosting, you'll set these as environment variables in your hosting platform

---

## 5. Testing the Integration

### Step 1: Test Content Creation

1. Start your development server: `npm run dev`
2. Navigate to your admin panel (e.g., `/admin/gallery` or `/admin/blog`)
3. Click **"Add Image"** or **"New Blog Post"**
4. Fill in the form and upload an image
5. You should see:
   - A loading spinner while uploading
   - The content appears after upload completes
   - The image URL should be a Supabase URL (contains `supabase.co`)
   - Content is saved to Supabase database (check Table Editor)

### Step 2: Verify Images Are Public

1. After uploading an image, copy its URL
2. Open the URL in an incognito/private browser window
3. The image should load without any authentication

### Step 3: Check Supabase Dashboard

1. Go to your Supabase dashboard → **Storage**
2. Click on any bucket (e.g., `gallery-images`)
3. You should see your uploaded images listed there

### Step 4: Verify Database Records

1. Go to your Supabase dashboard → **Table Editor**
2. Click on any table (e.g., `blog_posts` or `gallery_images`)
3. You should see your content records listed there
4. All content is now stored in Supabase, not localStorage!

---

## 6. Free Hosting Options

Here are the best free hosting options for your React application:

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- Free tier with generous limits
- Automatic deployments from GitHub
- Built-in CDN for fast global access
- Easy environment variable setup
- Perfect for React/Vite apps

**Setup Steps:**

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Add Environment Variables:
     - Click **"Environment Variables"**
     - Add `VITE_SUPABASE_URL` with your Supabase URL
     - Add `VITE_SUPABASE_ANON_KEY` with your anon key
   - Click **"Deploy"**

3. **Your site is live!** 🎉
   - Vercel will give you a URL like `your-project.vercel.app`
   - Every push to GitHub automatically deploys

### Option 2: Netlify

**Why Netlify?**
- Free tier available
- Easy GitHub integration
- Good for static sites

**Setup Steps:**

1. Push code to GitHub (same as Vercel step 1)

2. **Deploy to Netlify**
   - Go to [https://netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click **"Add new site"** → **"Import an existing project"**
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click **"Show advanced"** → **"New variable"**
     - Add `VITE_SUPABASE_URL`
     - Add `VITE_SUPABASE_ANON_KEY`
   - Click **"Deploy site"**

### Option 3: GitHub Pages

**Why GitHub Pages?**
- Completely free
- Integrated with GitHub
- Simple setup

**Setup Steps:**

1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

**Note**: For GitHub Pages, you'll need to set environment variables differently since it's a static site. Consider using a config file or build-time replacement.

---

## 7. Troubleshooting

### Problem: "Supabase is not configured" Error

**Solution:**
- Check that your `.env` file exists in the project root
- Verify the variable names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your dev server after creating/modifying `.env`

### Problem: Images Upload But Don't Display

**Solution:**
- Check that your storage buckets are set to **Public**
- Verify storage policies allow public read access
- Check browser console for CORS errors

### Problem: "Failed to upload image" Error

**Solution:**
- Verify your Supabase URL and anon key are correct
- Check that storage buckets exist with correct names
- Ensure you have internet connection
- Check Supabase dashboard for any service issues

### Problem: Images Are Private/Require Authentication

**Solution:**
- Go to Storage → Bucket → Settings
- Ensure "Public bucket" is enabled
- Check Storage Policies allow public SELECT operations
- Re-upload images after fixing policies

### Problem: Build Fails on Vercel/Netlify

**Solution:**
- Ensure environment variables are set in hosting platform
- Check build command is `npm run build`
- Verify output directory is `build`
- Check build logs for specific errors

### Problem: localStorage Quota Exceeded (Old Issue)

**Solution:**
- This shouldn't happen anymore with Supabase!
- Old base64 images in localStorage can be cleared
- All new uploads go to Supabase, not localStorage

---

## 📊 Free Tier Limits

### Supabase Free Tier:
- ✅ 500 MB database storage
- ✅ 1 GB file storage (images)
- ✅ 2 GB bandwidth
- ✅ Unlimited API requests
- ✅ Perfect for personal portfolios!

### Vercel Free Tier:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN

---

## 🎉 You're All Set!

Your application now:
- ✅ Uploads images to Supabase (not localStorage)
- ✅ Images are publicly accessible
- ✅ No storage size limits (within free tier)
- ✅ Fast global CDN delivery
- ✅ Ready for free hosting

**Next Steps:**
1. Test uploading images in your admin panel
2. Deploy to Vercel/Netlify
3. Share your live site with the world!

---

## 📞 Need Help?

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Supabase Discord**: [https://discord.supabase.com](https://discord.supabase.com)

---

---

## 8. Setting Up Admin Authentication

To secure your admin panel, you need to set up authentication in Supabase and create an admin user.

### Step 1: Enable Email Authentication

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Providers** (left sidebar)
3. Find **Email** in the list of providers
4. Make sure **Email** is **Enabled**
5. (Optional) Configure email settings:
   - **Enable email confirmations**: You can disable this for easier testing, or keep it enabled for production
   - **Secure email change**: Recommended to keep enabled
6. Click **Save**

### Step 2: Create Admin User

You have two options to create the admin user:

#### Option A: Create User via Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users** in your Supabase dashboard
2. Click **"Add user"** → **"Create new user"**
3. Fill in the details:
   - **Email**: `mallick.nazrul@gmail.com`
   - **Password**: `NAZRULNDC99`
   - **Auto Confirm User**: ✅ **Check this box** (so you don't need to verify email)
4. Click **"Create user"**
5. The user is now created and ready to use!

#### Option B: Create User via SQL (Alternative)

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New query"**
3. Run this SQL (replace with your actual email and password):

```sql
-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'mallick.nazrul@gmail.com',
  crypt('NAZRULNDC99', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Get the user ID from the insert above, then run:
-- (Replace USER_ID_HERE with the actual user ID)
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  id,
  jsonb_build_object('sub', id::text, 'email', email),
  'email',
  NOW(),
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'mallick.nazrul@gmail.com';
```

**Note**: Option A (Dashboard) is much easier and recommended!

### Step 3: Test Login

1. Start your development server: `npm run dev`
2. Navigate to `/login` in your browser
3. Enter:
   - **Email**: `mallick.nazrul@gmail.com`
   - **Password**: `NAZRULNDC99`
4. Click **"Sign In"**
5. You should be redirected to `/admin` dashboard

### Step 4: Verify Authentication Works

1. After logging in, try accessing any admin route (e.g., `/admin/blog`)
2. You should be able to access it without being redirected to login
3. Click **"Logout"** in the admin sidebar
4. Try accessing `/admin` again - you should be redirected to `/login`

### Troubleshooting Authentication

#### Problem: "Invalid login credentials" Error

**Solutions:**
- Verify the email is exactly: `mallick.nazrul@gmail.com` (case-insensitive)
- Verify the password is exactly: `NAZRULNDC99` (case-sensitive)
- Check that the user exists in Supabase → Authentication → Users
- Make sure email authentication is enabled in Supabase

#### Problem: "Email not confirmed" Error

**Solutions:**
- Go to Supabase → Authentication → Users
- Find your user and click on it
- Click **"Confirm email"** or **"Resend confirmation email"**
- Or recreate the user with "Auto Confirm User" checked

#### Problem: Can't Access Admin After Login

**Solutions:**
- Check browser console for errors
- Verify Supabase URL and anon key in `.env` file
- Make sure you restarted the dev server after setting up `.env`
- Check that the session is being stored (check browser DevTools → Application → Local Storage)

#### Problem: Session Expires Too Quickly

**Solutions:**
- Supabase sessions last 1 hour by default
- You can extend this in Supabase → Authentication → Settings
- Or implement session refresh in your app (future enhancement)

### Security Notes

- ✅ **Password is stored securely**: Supabase uses bcrypt hashing
- ✅ **Sessions are managed**: Supabase handles session tokens automatically
- ✅ **Works from anywhere**: Once logged in, you can access admin from any device/browser
- ✅ **Logout clears session**: Logging out invalidates the session
- ⚠️ **Keep credentials secure**: Don't share your admin password
- ⚠️ **Use HTTPS in production**: Always use HTTPS for production deployments

---

**Happy Building! 🚀**

