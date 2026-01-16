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

  enum AddressType {
    HOME
    OFFICE
    OTHER
  }

  type GenericResponse {
    message: String!
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
    products: [Product!]
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
    material: String
    size: String
    color: String
    seats: Int
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
`;
