import { gql } from 'graphql-tag';

export const productTypeDefs = gql`
  input CreateProductInput {
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
    productOldUrl: String
    productNewUrl: String!
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
  }

  input UpdateProductByIdInput {
    id: ID!
    categoryId: ID!
    subcategoryId: ID
    sku: String
    name: String
    slug: String
    breadcrumb: String
    description: String
    materialDescription: String
    dimensionDescription: String
    posterImageUrl: String
    productImages: [String!]
    productOldUrl: String
    productNewUrl: String
    material: String
    size: String
    color: String
    seats: Int
    stock: Int
    price: Float
    memberPrice: Float
    discountPrice: Float
    metaTitle: String
    metaDescription: String
    canonicalUrl: String
    seoSchema: String
    lastEditedBy: String
    status: ContentStatus
  }

  input GetProductBySlugsInput {
    categorySlug: String!
    subcategorySlug: String!
    productSlug: String!
  }

  type Query {
    productList: [Product!]!
    productById(id: ID!): Product
    productBySlugs(input: GetProductBySlugsInput!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProductById(id: ID!, input: UpdateProductByIdInput!): Product
    removeProductById(id: ID!): Product
  }
`;
