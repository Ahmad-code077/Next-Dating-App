# 💖 Love Finder – Built with Next.js

A modern, full-featured **Dating App** built using **Next.js App Router**.  
This app includes user authentication, real-time chat, profile matching, and more – perfect for connecting people online in a fast, beautiful, and responsive way.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ahmad-code077/Next-Dating-App
cd Next-Dating-App
```

 ### 2. Install dependencies
 
```bash
git clone https://github.com/Ahmad-code077/Next-Dating-App
cd Next-Dating-App
```

### 3. Set up your environment variables

Create a .env file in the project root with the following:
DATABASE_URL=your_database_url
AUTH_SECRET=your_auth_secret

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
NEXT_PUBLIC_CLOUDINARY_PRESET="your_upload_preset"

PUSHER_APP_ID="your_pusher_app_id"
NEXT_PUBLIC_PUSHER_APP_KEY="your_pusher_key"
PUSHER_SECRET="your_pusher_secret"
NEXT_PUBLIC_PUSHER_CLUSTER="your_pusher_cluster"

NEXT_PUBLIC_BASE_URL="http://localhost:3000"

### 4. Initialize your database

```bash
npx prisma generate
npx prisma db push
# (Optional) Open Prisma Studio:
npx prisma studio
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser to view the app.

## 🧠 Features

- ✅ User signup/login with NextAuth.js & Prisma  
- 📸 Profile creation + Cloudinary image uploads  
- ❤️ Swipe to like/dislike & matching logic  
- 💬 Real-time chat powered by Pusher  
- 📬 Inbox & outbox message containers with soft delete  
- 🔄 Cursor-based pagination for messages  
- 🌙 Dark mode toggle  
- ⚡️ Responsive UI with Tailwind CSS & Shadcn UI  


## 🛠️ Tech Stack


- ⚛️ **Framework:** Next.js 14 (App Router), TypeScript  
- 🎨 **UI:** Tailwind CSS, Shadcn UI, Lucide icons  
- 🔄 **State Management:** Zustand  
- 📋 **Forms & Validation:** React Hook Form & Zod  
- 🔒 **Authentication:** NextAuth.js (Credentials Provider & Prisma Adapter)  
- 💾 **Database & ORM:** Prisma (PostgreSQL)  
- ☁️ **Storage:** Cloudinary for image uploads  
- 🔴 **Real-time:** Pusher  
- 🔔 **Notifications:** Browser / in-app alerts  

