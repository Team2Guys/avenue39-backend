import { gql } from 'graphql-tag';

export const commonTypeDefs = gql`
  scalar JSON
  scalar DateTime

  enum AdminRole {
    ADMIN
    SUPER_ADMIN
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

  enum InquiryType {
    EMAIL
    PHONE
    WHATSAPP
    OTHER
  }

  enum InquiryStatus {
    NEW
    READ
    RESOLVED
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

  enum AddressType {
    HOME
    OFFICE
    OTHER
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
    isMember: Boolean!

    createdAt: DateTime!
    updatedAt: DateTime!

    addresses: [JSON!]!
    orders: [JSON!]!
    defaultShippingAddress: Address
    defaultBillingAddress: Address
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
    addressType: AddressType!

    createdAt: DateTime!
    updatedAt: DateTime!

    user: User!
    defaultShippingFor: User
    defaultBillingFor: User
  }

  type NewsletterSubscriber {
    id: ID!

    email: String!
    isActive: Boolean!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Category {
    id: ID!

    name: String!
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String!
    posterImageUrl: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    subcategories: [Subcategory!]
    products: [Product!]
  }

  type Subcategory {
    id: ID!

    categoryId: ID!
    name: String!
    description: String
    breadcrumb: String
    oldPath: String
    newPath: String
    posterImageUrl: String
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String!
    status: ContentStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    category: Category!
    products: [Product!]!
  }

  type Product {
    id: ID!

    categoryId: ID!
    subcategoryId: ID
    sku: String!
    name: String!
    description: String!
    materialDescription: String!
    dimensionDescription: String!
    breadcrumb: String!
    oldPath: String
    newPath: String!
    posterImageUrl: String!
    productImages: [String!]!
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

    createdAt: DateTime!
    updatedAt: DateTime!

    category: Category
    subcategory: Subcategory
  }

  type Order {
    id: ID!

    userId: ID!
    shippingAddress: JSON!
    billingAddress: JSON!
    totalAmount: Float!
    shippingCost: Float!
    notes: String
    orderItems: [JSON!]!
    lastEditedBy: String!
    paymentStatus: PaymentStatus!
    orderStatus: OrderStatus!

    createdAt: DateTime!
    updatedAt: DateTime!

    user: User!
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
`;
