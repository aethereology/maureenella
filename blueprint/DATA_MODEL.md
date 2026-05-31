# Data Model

## Service

```ts
type Service = {
  id: string
  title: string
  shortDescription: string
  longDescription?: string
  category: 'bridal' | 'bridal-party' | 'guest' | 'add-on' | 'education'
  price?: string
  priceStatus: 'confirmed' | 'unconfirmed' | 'hidden'
  durationMinutes?: number
  included?: string[]
  notes?: string[]
  ctaLabel?: string
}
```

## PortfolioItem

```ts
type PortfolioItem = {
  id: string
  brideName?: string
  coupleName?: string
  venue?: string
  city?: string
  state?: string
  serviceTypes: string[]
  photographer?: string
  makeupCredit?: string
  hairCredit?: string
  tags: string[]
  imageIds: string[]
  altText: string
  permissionStatus: 'confirmed' | 'needs-confirmation'
}
```

## BlogPost

```ts
type BlogPost = {
  slug: string
  title: string
  description: string
  category: 'bridal-prep' | 'real-weddings' | 'beauty-favorites' | 'education' | 'business'
  date?: string
  updatedAt?: string
  author: string
  seoTitle: string
  seoDescription: string
  relatedServices: string[]
  relatedPosts: string[]
  legacyUrls?: string[]
  status: 'draft' | 'review' | 'published'
}
```

## FAQ

```ts
type FAQ = {
  id: string
  question: string
  answer: string
  category: 'booking' | 'pricing' | 'travel' | 'trial' | 'wedding-day' | 'prep' | 'products'
  status: 'confirmed' | 'needs-confirmation'
}
```

## Testimonial

```ts
type Testimonial = {
  id: string
  name: string
  quote: string
  source?: string
  proofPoint: string[]
  permissionStatus: 'confirmed' | 'needs-confirmation'
}
```

## ProductRecommendation

```ts
type ProductRecommendation = {
  id: string
  title: string
  brand: string
  category: string
  whyRecommended: string
  bestFor: string[]
  affiliateUrl?: string
  disclosureRequired: boolean
  status: 'draft' | 'published'
}
```
