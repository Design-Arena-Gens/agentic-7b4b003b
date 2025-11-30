# AI-Themed Portfolio with Admin Dashboard

A high-performance, cyberpunk-styled personal portfolio built with Next.js 14, TypeScript, and MongoDB.

## 🚀 Live Demo

**Production URL:** https://agentic-7b4b003b.vercel.app

## ✨ Features

### Frontend
- **Cyberpunk Design**: Dark theme with neon accents (cyan, purple, electric blue)
- **Glassmorphism UI**: Translucent cards with blurred backgrounds and glowing borders
- **Smooth Animations**: Framer Motion for page transitions, scroll effects, and hover states
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Pages**:
  - Home page with hero section and feature highlights
  - Projects showcase with filtering by category
  - Skills page with proficiency levels
  - Experience timeline

### Backend & Admin
- **Custom OTP Authentication**: Email-based 6-digit OTP with JWT (HttpOnly Secure cookies)
- **Admin Dashboard**: Full CRUD operations for:
  - Projects (with images, technologies, links)
  - Skills (with categories and proficiency levels)
  - Experience entries (with date ranges)
- **MongoDB Database**: Mongoose models for all entities
- **API Routes**: RESTful endpoints for all resources

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animation**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Authentication**: Custom OTP + JWT (jose library)
- **UI Components**: Lucide React icons, Sonner toasts
- **Media**: Cloudinary integration ready
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:
   ```env
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/ai-portfolio

   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-change-in-production

   # Email (Nodemailer)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Admin Email
   ADMIN_EMAIL=admin@example.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

The application uses a custom OTP authentication system:

1. User enters email address
2. 6-digit OTP is sent via email
3. User enters OTP to verify
4. JWT token is stored in HttpOnly Secure cookie
5. Token expires after 7 days

**Admin Access**: Set your email in `ADMIN_EMAIL` environment variable. First login with that email grants admin role.

## 📱 Pages

- `/` - Home page
- `/projects` - Projects showcase
- `/skills` - Skills overview
- `/experience` - Work experience
- `/login` - Admin login (OTP)
- `/admin` - Admin dashboard
- `/admin/projects` - Manage projects
- `/admin/skills` - Manage skills
- `/admin/experience` - Manage experience
- `/admin/settings` - Configuration

## 🎨 Design System

### Colors
- Background: `#0a0a0f`, `#13131a`, `#1a1a24`
- Neon Cyan: `#00fff9`
- Neon Purple: `#bf00ff`
- Electric Blue: `#0066ff`
- Neon Pink: `#ff006e`

### Components
- **GlassCard**: Glassmorphism container with optional glow effects
- **Navbar**: Responsive navigation with gradient logo
- Custom scrollbar with gradient colors
- Gradient text effects

## 🚀 Deployment

The application is deployed on Vercel:

```bash
vercel deploy --prod
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/request-otp` - Request OTP
- `POST /api/auth/verify-otp` - Verify OTP and login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin)
- `GET /api/projects/[id]` - Get project by ID
- `PUT /api/projects/[id]` - Update project (admin)
- `DELETE /api/projects/[id]` - Delete project (admin)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (admin)
- `PUT /api/skills/[id]` - Update skill (admin)
- `DELETE /api/skills/[id]` - Delete skill (admin)

### Experience
- `GET /api/experience` - Get all experiences
- `POST /api/experience` - Create experience (admin)
- `PUT /api/experience/[id]` - Update experience (admin)
- `DELETE /api/experience/[id]` - Delete experience (admin)

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
