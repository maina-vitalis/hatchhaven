# Design Document

## Overview

The Poultry E-commerce System is a Next.js application with Prisma ORM that provides a complete single-vendor marketplace for poultry sales. The system uses a hierarchical product structure (Category → Breed → Product Variant) and supports both guest and admin user flows with cart management, order processing, and inventory tracking.

## Architecture

### Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js for admin authentication
- **File Storage**: Local file system for product images
- **State Management**: React Context for cart state

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes    │    │   Database      │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ - Product Pages │    │ - /api/products │    │ - Prisma Schema │
│ - Cart UI       │    │ - /api/cart     │    │ - Categories    │
│ - Admin Panel   │    │ - /api/orders   │    │ - Breeds        │
│ - Checkout      │    │ - /api/admin    │    │ - Variants      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Components and Interfaces

### Data Models (Prisma Schema)

#### Core Product Models

```prisma
model Category {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  image       String?
  description String?
  breeds      Breed[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Breed {
  id          String           @id @default(cuid())
  name        String
  slug        String           @unique
  description String
  origin      String?
  purpose     String?          // "Meat", "Eggs", "Dual-purpose"
  image       String?
  categoryId  String
  category    Category         @relation(fields: [categoryId], references: [id])
  variants    ProductVariant[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

model ProductVariant {
  id        String      @id @default(cuid())
  breedId   String
  breed     Breed       @relation(fields: [breedId], references: [id])
  gender    String      // "Male" | "Female" | "Pair"
  ageGroup  String      // "Chick" | "1-7 months" | "Mature"
  price     Float
  stock     Int
  image     String?
  cartItems CartItem[]
  orderItems OrderItem[]
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}
```

#### Cart and Order Models

```prisma
model Cart {
  id        String     @id @default(cuid())
  userEmail String?
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

model CartItem {
  id         String         @id @default(cuid())
  cartId     String
  cart       Cart           @relation(fields: [cartId], references: [id])
  variantId  String
  variant    ProductVariant @relation(fields: [variantId], references: [id])
  quantity   Int
  totalPrice Float
}

model Order {
  id          String      @id @default(cuid())
  userEmail   String?
  totalAmount Float
  status      String      @default("PENDING")
  items       OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model OrderItem {
  id        String         @id @default(cuid())
  orderId   String
  order     Order          @relation(fields: [orderId], references: [id])
  variantId String
  variant   ProductVariant @relation(fields: [variantId], references: [id])
  quantity  Int
  price     Float
}
```

#### Admin Model

```prisma
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
}
```

### API Endpoints

#### Public API Routes

- `GET /api/categories` - List all categories
- `GET /api/categories/[slug]` - Get category with breeds
- `GET /api/breeds/[slug]` - Get breed with variants
- `POST /api/cart` - Create/update cart
- `GET /api/cart/[id]` - Get cart contents
- `POST /api/orders` - Create order from cart
- `GET /api/orders/[id]` - Get order details

#### Admin API Routes

- `POST /api/admin/auth` - Admin authentication
- `GET /api/admin/categories` - Manage categories
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/[id]` - Update category
- `DELETE /api/admin/categories/[id]` - Delete category
- `GET /api/admin/breeds` - Manage breeds
- `POST /api/admin/breeds` - Create breed
- `PUT /api/admin/breeds/[id]` - Update breed
- `GET /api/admin/variants` - Manage variants
- `POST /api/admin/variants` - Create variant
- `PUT /api/admin/variants/[id]` - Update variant
- `GET /api/admin/orders` - List all orders
- `PUT /api/admin/orders/[id]` - Update order status

### Frontend Components

#### Page Components

- `app/page.tsx` - Homepage with category grid
- `app/categories/[slug]/page.tsx` - Category page with breeds
- `app/breeds/[slug]/page.tsx` - Breed page with variants
- `app/cart/page.tsx` - Cart management page
- `app/checkout/page.tsx` - Checkout form
- `app/admin/page.tsx` - Admin dashboard
- `app/admin/categories/page.tsx` - Category management
- `app/admin/breeds/page.tsx` - Breed management
- `app/admin/variants/page.tsx` - Variant management
- `app/admin/orders/page.tsx` - Order management

#### Reusable Components

- `CategoryCard` - Display category with image and link
- `BreedCard` - Display breed information
- `VariantCard` - Display variant with add to cart
- `CartItem` - Individual cart item with quantity controls
- `OrderSummary` - Order total and item breakdown
- `AdminTable` - Reusable data table for admin
- `ImageUpload` - File upload component for admin

### State Management

#### Cart Context

```typescript
interface CartContextType {
  cart: Cart | null;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
}
```

#### Admin Context

```typescript
interface AdminContextType {
  admin: Admin | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

## Data Models

### Product Hierarchy

The system uses a three-level hierarchy:

1. **Category** (e.g., "Chickens", "Turkeys") - Top-level grouping
2. **Breed** (e.g., "Red Bourbon", "White Holland") - Specific breed within category
3. **ProductVariant** - Actual purchasable item with age/gender/price

### Cart and Order Flow

1. Items added to cart create `CartItem` records
2. Cart persists across sessions using cart ID
3. Checkout converts cart to order and reduces stock
4. Orders track status progression (PENDING → CONFIRMED → SHIPPED → DELIVERED)

### Stock Management

- Stock levels tracked at ProductVariant level
- Cart validation prevents overselling
- Order placement reduces available stock
- Admin can adjust stock levels manually

## Error Handling

### API Error Responses

```typescript
interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}
```

### Error Scenarios

- **404 Not Found**: Category/breed/variant doesn't exist
- **400 Bad Request**: Invalid data in requests
- **409 Conflict**: Insufficient stock for cart items
- **401 Unauthorized**: Admin authentication required
- **500 Internal Server Error**: Database or server errors

### Frontend Error Handling

- Toast notifications for user feedback
- Error boundaries for component crashes
- Retry mechanisms for failed API calls
- Graceful degradation for missing images

## Testing Strategy

### Unit Tests

- API route handlers with mock database
- Component rendering and user interactions
- Utility functions for calculations
- Cart state management logic

### Integration Tests

- Complete user flows (browse → cart → checkout)
- Admin workflows (create products → manage orders)
- Database operations with test database
- API endpoint integration

### End-to-End Tests

- Customer purchase journey
- Admin product management
- Cart persistence across sessions
- Order status updates

### Test Data

- Seed script with sample categories, breeds, variants
- Factory functions for generating test data
- Mock image files for testing uploads
- Test admin credentials for authentication

## Performance Considerations

### Database Optimization

- Indexes on slug fields for SEO URLs
- Eager loading for related data (breed with variants)
- Connection pooling for concurrent requests
- Query optimization for product listings

### Frontend Optimization

- Image optimization with Next.js Image component
- Static generation for category/breed pages
- Client-side caching for cart state
- Lazy loading for admin tables

### Caching Strategy

- Static page generation for product catalogs
- API response caching for frequently accessed data
- Image caching with proper headers
- Cart state persistence in localStorage

## Security Measures

### Authentication

- Secure admin password hashing with bcrypt
- JWT tokens for admin sessions
- Session timeout and refresh logic
- CSRF protection for admin forms

### Data Validation

- Input sanitization for all user data
- Prisma schema validation
- File upload restrictions for images
- SQL injection prevention through Prisma

### Access Control

- Admin-only routes protected by middleware
- Guest cart isolation by session
- Order access restricted to email owners
- Image upload size and type restrictions
