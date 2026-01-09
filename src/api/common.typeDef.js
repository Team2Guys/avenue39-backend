import { gql } from 'graphql-tag';

export const commonTypeDefs = gql`
  scalar JSON
  scalar DateTime

  enum AdminRole {
    ADMIN
    SUPER_ADMIN
  }

  enum InquiryType {
    EMAIL
    PHONE
    WHATSAPP
    OTHER
  }

  enum Permissions {
    ADD_PRODUCTS
    EDIT_PRODUCTS
    DELETE_PRODUCTS
    ADD_CATEGORY
    DELETE_CATEGORY
    EDIT_CATEGORY
    CHECK_PROFIT
    CHECK_REVENUE
    CHECK_VISITORS
    VIEW_USERS
    VIEW_SALES
    VIEW_ADMINS
    VIEW_TOTAL_PRODUCTS
    VIEW_TOTAL_CATEGORIES
  }

  enum ContentStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  enum OrderStatus {
    PENDING
    PAID
    CANCELED
    FAILED
    SHIPPED
    COMPLETED
  }

  enum PaymentStatus {
    FREE
    PENDING
    PAID
    CANCELED
    FAILED
  }

  type GenericResponse {
    message: String!
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
    permissions: [Permissions!]!
    role: AdminRole!
    lastEditedBy: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    defaultShippingAddressId: ID
    defaultBillingAddressId: ID
    firstName: String!
    lastName: String!
    email: String!
    isEmailVerified: Boolean!
    addresses: [JSON!]
    defaultShippingAddress: Address
    defaultBillingAddress: Address
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Address {
    id: ID!
    userId: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    state: String!
    country: String!
    city: String!
    address: String!
    addressType: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Category {
    id: ID!
    name: String!
    description: String!
    slug: String!
    metaTitle: String!
    metaDescription: String!
    canonicalUrl: String!
    breadcrumb: String!
    posterImageUrl: String!
    seoSchema: String!
    lastEditedBy: String!
    status: ContentStatus!
    products: [Product!]!
    subcategories: [Subcategory!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Subcategory {
    id: ID!
    categoryId: ID!
    name: String!
    description: String
    slug: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    breadcrumb: String
    posterImageUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!
    category: Category
    products: [Product!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Product {
    id: ID!
    categoryId: ID!
    subcategoryId: ID
    sku: String!
    name: String!
    slug: String!
    breadcrumb: String!
    description: String!
    materialDescription: String!
    dimensionDescription: String!
    posterImageUrl: String!
    productImages: [String!]!
    productUrl: String!
    material: String!
    size: String!
    color: String!
    seats: Int!
    stock: Int!
    price: Float!
    memberPrice: Float!
    discountPrice: Float!
    metaTitle: String!
    metaDescription: String!
    canonicalUrl: String!
    seoSchema: String!
    lastEditedBy: String!
    status: ContentStatus!
    category: Category
    subcategory: Subcategory
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Order {
    id: ID!
    userId: ID!
    shippingAddress: JSON!
    billingAddress: JSON!
    totalAmount: Float!
    shippingCost: Float!
    notes: String!
    orderItems: [JSON!]!
    paymentStatus: PaymentStatus!
    orderStatus: OrderStatus!
    lastEditedBy: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Inquiry {
    id: ID!
    name: String!
    email: String!
    phone: String!
    message: String!
    inquiryType: String!
    inquiryStatus: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type NewsletterSubscriber {
    id: ID!
    email: String!
    isActive: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
