# Prisma Query Examples for Hatch Haven

This document provides optimized query examples for common use cases across all pages.

## Table of Contents
1. [Blog Queries](#blog-queries)
2. [Team Queries](#team-queries)
3. [FAQ Queries](#faq-queries)
4. [Testimonials](#testimonials)
5. [Gallery](#gallery)
6. [Products](#products)
7. [About Page](#about-page)
8. [Contact](#contact)
9. [Newsletter](#newsletter)

---

## Blog Queries

### Get All Published Blog Posts with Author and Category
```typescript
const posts = await prisma.blogPost.findMany({
  where: {
    published: true,
    publishedAt: { lte: new Date() }
  },
  include: {
    author: true,
    category: true,
    tags: {
      include: {
        tag: true
      }
    },
    _count: {
      select: {
        comments: {
          where: { approved: true }
        }
      }
    }
  },
  orderBy: {
    publishedAt: 'desc'
  }
});
```

### Get Featured Blog Posts
```typescript
const featuredPosts = await prisma.blogPost.findMany({
  where: {
    featured: true,
    published: true
  },
  include: {
    author: true,
    category: true
  },
  orderBy: {
    publishedAt: 'desc'
  },
  take: 3
});
```

### Get Single Blog Post by Slug
```typescript
const post = await prisma.blogPost.findUnique({
  where: { slug: 'complete-guide-free-range-chicken-farming' },
  include: {
    author: true,
    category: true,
    tags: {
      include: {
        tag: true
      }
    },
    comments: {
      where: { approved: true },
      orderBy: { createdAt: 'desc' }
    }
  }
});

// Increment views
await prisma.blogPost.update({
  where: { id: post.id },
  data: { views: { increment: 1 } }
});
```

### Get Blog Posts by Category
```typescript
const posts = await prisma.blogPost.findMany({
  where: {
    published: true,
    category: {
      slug: 'farming'
    }
  },
  include: {
    author: true,
    category: true
  },
  orderBy: {
    publishedAt: 'desc'
  }
});
```

### Get Blog Posts by Tag
```typescript
const posts = await prisma.blogPost.findMany({
  where: {
    published: true,
    tags: {
      some: {
        tag: {
          slug: 'organic'
        }
      }
    }
  },
  include: {
    author: true,
    category: true,
    tags: {
      include: {
        tag: true
      }
    }
  }
});
```

### Get Related Blog Posts (same category, different post)
```typescript
const relatedPosts = await prisma.blogPost.findMany({
  where: {
    published: true,
    categoryId: currentPost.categoryId,
    id: { not: currentPost.id }
  },
  include: {
    author: true,
    category: true
  },
  take: 3,
  orderBy: {
    publishedAt: 'desc'
  }
});
```

---

## Team Queries

### Get All Active Team Members (Ordered)
```typescript
const teamMembers = await prisma.teamMember.findMany({
  where: {
    active: true
  },
  orderBy: {
    order: 'asc'
  }
});
```

### Get Team Member by Email
```typescript
const member = await prisma.teamMember.findUnique({
  where: { email: 'john@hatchhaven.com' }
});
```

---

## FAQ Queries

### Get All Published FAQs (Ordered)
```typescript
const faqs = await prisma.fAQ.findMany({
  where: {
    published: true
  },
  orderBy: {
    order: 'asc'
  }
});
```

### Get FAQs by Category
```typescript
const faqs = await prisma.fAQ.findMany({
  where: {
    published: true,
    category: 'Products'
  },
  orderBy: {
    order: 'asc'
  }
});
```

---

## Testimonials

### Get Approved Featured Testimonials
```typescript
const testimonials = await prisma.testimonial.findMany({
  where: {
    approved: true,
    featured: true
  },
  include: {
    user: {
      select: {
        name: true,
        image: true
      }
    }
  },
  orderBy: {
    order: 'asc'
  },
  take: 4
});
```

### Get All Approved Testimonials
```typescript
const testimonials = await prisma.testimonial.findMany({
  where: {
    approved: true
  },
  include: {
    user: {
      select: {
        name: true,
        image: true
      }
    }
  },
  orderBy: {
    createdAt: 'desc'
  }
});
```

---

## Gallery

### Get All Gallery Images (Ordered)
```typescript
const images = await prisma.galleryImage.findMany({
  orderBy: {
    order: 'asc'
  }
});
```

### Get Featured Gallery Images
```typescript
const featuredImages = await prisma.galleryImage.findMany({
  where: {
    featured: true
  },
  orderBy: {
    order: 'asc'
  }
});
```

### Get Gallery Images by Category
```typescript
const images = await prisma.galleryImage.findMany({
  where: {
    category: 'Farm'
  },
  orderBy: {
    order: 'asc'
  }
});
```

---

## Products

### Get All Products with Variants and Images
```typescript
const breeds = await prisma.breed.findMany({
  include: {
    category: true,
    variants: {
      where: {
        stock: { gt: 0 }
      },
      include: {
        images: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    },
    images: {
      orderBy: {
        order: 'asc'
      }
    }
  },
  orderBy: {
    createdAt: 'desc'
  }
});
```

### Get Featured Products
```typescript
const featuredProducts = await prisma.breed.findMany({
  where: {
    variants: {
      some: {
        stock: { gt: 0 }
      }
    }
  },
  include: {
    category: true,
    variants: {
      where: {
        stock: { gt: 0 }
      },
      take: 1
    },
    images: {
      take: 1
    }
  },
  take: 8
});
```

### Get Single Product with All Details
```typescript
const breed = await prisma.breed.findUnique({
  where: { slug: 'rhode-island-red' },
  include: {
    category: true,
    variants: {
      include: {
        images: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    },
    images: {
      orderBy: {
        order: 'asc'
      }
    }
  }
});
```

### Get Products by Category
```typescript
const products = await prisma.breed.findMany({
  where: {
    category: {
      slug: 'eggs'
    },
    variants: {
      some: {
        stock: { gt: 0 }
      }
    }
  },
  include: {
    category: true,
    variants: {
      where: {
        stock: { gt: 0 }
      }
    }
  }
});
```

---

## About Page

### Get All Stats (Active, Ordered)
```typescript
const stats = await prisma.stat.findMany({
  where: {
    active: true
  },
  orderBy: {
    order: 'asc'
  }
});
```

### Get All Milestones (Ordered)
```typescript
const milestones = await prisma.milestone.findMany({
  orderBy: {
    order: 'asc'
  }
});
```

### Get All Services (Active, Ordered)
```typescript
const services = await prisma.service.findMany({
  where: {
    active: true
  },
  orderBy: {
    order: 'asc'
  }
});
```

---

## Contact

### Create Contact Submission
```typescript
const submission = await prisma.contactSubmission.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+61 2 1234 5678',
    subject: 'Inquiry about products',
    message: 'I would like to know more about...',
    userId: userId // Optional if user is logged in
  }
});
```

### Get All Contact Submissions (Admin)
```typescript
const submissions = await prisma.contactSubmission.findMany({
  include: {
    user: {
      select: {
        name: true,
        email: true
      }
    }
  },
  orderBy: {
    createdAt: 'desc'
  }
});
```

### Get Pending Contact Submissions
```typescript
const pending = await prisma.contactSubmission.findMany({
  where: {
    status: 'PENDING'
  },
  orderBy: {
    createdAt: 'desc'
  }
});
```

---

## Newsletter

### Subscribe to Newsletter
```typescript
const subscription = await prisma.newsletterSubscription.upsert({
  where: { email: 'user@example.com' },
  update: {
    active: true,
    subscribedAt: new Date(),
    unsubscribedAt: null
  },
  create: {
    email: 'user@example.com',
    source: 'homepage',
    active: true
  }
});
```

### Unsubscribe from Newsletter
```typescript
await prisma.newsletterSubscription.update({
  where: { email: 'user@example.com' },
  data: {
    active: false,
    unsubscribedAt: new Date()
  }
});
```

### Get All Active Subscriptions
```typescript
const subscribers = await prisma.newsletterSubscription.findMany({
  where: {
    active: true
  },
  orderBy: {
    subscribedAt: 'desc'
  }
});
```

---

## Complex Queries

### Home Page Data (All Sections)
```typescript
const homePageData = {
  featuredProducts: await prisma.breed.findMany({
    where: {
      variants: {
        some: { stock: { gt: 0 } }
      }
    },
    include: {
      category: true,
      variants: {
        where: { stock: { gt: 0 } },
        take: 1
      },
      images: { take: 1 }
    },
    take: 8
  }),
  
  featuredBlogPosts: await prisma.blogPost.findMany({
    where: {
      featured: true,
      published: true
    },
    include: {
      author: true,
      category: true
    },
    take: 3,
    orderBy: { publishedAt: 'desc' }
  }),
  
  testimonials: await prisma.testimonial.findMany({
    where: {
      approved: true,
      featured: true
    },
    take: 4,
    orderBy: { order: 'asc' }
  }),
  
  galleryImages: await prisma.galleryImage.findMany({
    where: { featured: true },
    take: 8,
    orderBy: { order: 'asc' }
  }),
  
  services: await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  })
};
```

### Blog Page with Pagination
```typescript
const page = 1;
const pageSize = 10;
const skip = (page - 1) * pageSize;

const [posts, total] = await Promise.all([
  prisma.blogPost.findMany({
    where: {
      published: true,
      publishedAt: { lte: new Date() }
    },
    include: {
      author: true,
      category: true,
      tags: {
        include: {
          tag: true
        }
      },
      _count: {
        select: {
          comments: {
            where: { approved: true }
          }
        }
      }
    },
    orderBy: {
      publishedAt: 'desc'
    },
    skip,
    take: pageSize
  }),
  prisma.blogPost.count({
    where: {
      published: true,
      publishedAt: { lte: new Date() }
    }
  })
]);

const totalPages = Math.ceil(total / pageSize);
```

---

## Performance Tips

1. **Use `select` instead of `include`** when you only need specific fields
2. **Use indexes** - Already added on frequently queried fields (slug, email, status, etc.)
3. **Batch queries** - Use `Promise.all()` for independent queries
4. **Limit results** - Always use `take` or pagination for lists
5. **Use `findUnique`** with unique fields (slug, email) for better performance
6. **Filter at database level** - Use `where` clauses instead of filtering in JavaScript

---

## Index Summary

The schema includes optimized indexes on:
- `slug` fields (BlogPost, BlogCategory, BlogTag, Breed, Category)
- `email` fields (User, NewsletterSubscription, ContactSubmission)
- `status` fields (Order, ContactSubmission)
- `published` and `featured` flags
- `active` flags for filtering
- Composite indexes for common query patterns (published + publishedAt, active + order)

