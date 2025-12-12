# Hatch Haven

A modern, full-stack e-commerce platform for Hatch Haven - a premium poultry farm specializing in fresh eggs, chicken, turkey, and duck products. Built with Next.js 15, TypeScript, and modern web technologies.

## 🌟 Features

### Public Features
- **Modern E-commerce Platform**: Complete online store with product catalog, shopping cart, and checkout
- **Blog System**: Dynamic blog with categories, tags, and content management
- **Gallery**: Visual showcase of farm operations and products
- **Team Profiles**: Meet the team behind Hatch Haven
- **Contact & About Pages**: Company information and contact forms
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Dashboard**: Comprehensive admin panel with analytics and insights
- **Product Management**: Full CRUD operations for products, categories, and variants
- **Order Management**: Track and manage customer orders
- **Blog Management**: Create and manage blog posts, categories, and tags
- **Team Management**: Manage team member profiles and information
- **Gallery Management**: Upload and organize farm photos
- **User Management**: Handle customer accounts and permissions

### Technical Features
- **Authentication**: Secure login system with NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **File Uploads**: Cloudinary integration for image management
- **Rich Text Editor**: TipTap editor for blog content
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI with Tailwind CSS styling
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Rich Text**: TipTap Editor
- **File Storage**: Cloudinary
- **Charts**: Recharts
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hatchhaven
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/hatchhaven"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (public)/          # Public pages (about, blog, etc.)
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── context/               # React contexts
├── features/              # Feature-based modules
│   ├── about/
│   ├── admin/
│   ├── blog/
│   ├── contact/
│   ├── gallery/
│   ├── home/
│   ├── products/
│   ├── shared/
│   └── team/
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Authentication and user management
- **Products**: Product catalog with variants and categories
- **Orders**: E-commerce order management
- **Blog**: Posts, categories, tags, and comments
- **Team**: Team member profiles
- **Gallery**: Farm photo gallery
- **FAQ**: Frequently asked questions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Database Setup
1. Set up a PostgreSQL database
2. Update `DATABASE_URL` in your environment variables
3. Run `npx prisma db push` to create tables

### Vercel Deployment
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production
Make sure to set all required environment variables:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary to Hatch Haven.

## 📞 Contact

For questions or support, please contact:
- Email: info@hatchhaven.co.ke
- Phone: 0748645010
- Location: Nanyuki, Kenya

---

Built with ❤️ for Hatch Haven - Fresh & Ethical Poultry
