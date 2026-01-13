import { gql } from 'graphql-tag';

export const productTypeDefs = gql`
  input CreateProductInput {
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
  }

  input UpdateProductByIdInput {
    id: ID!
    categoryId: ID
    subcategoryId: ID
    sku: String
    name: String
    description: String
    materialDescription: String
    dimensionDescription: String
    breadcrumb: String
    oldPath: String
    newPath: String
    posterImageUrl: String
    productImages: [String!]
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

  input GetProductByUrlsInput {
    categoryNewUrl: String!
    subcategoryNewUrl: String!
    productNewUrl: String!
  }

  type Query {
    productList: [Product!]!
    productById(id: ID!): Product
    productByUrls(input: GetProductByUrlsInput!): Product
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProductById(id: ID!, input: UpdateProductByIdInput!): Product
    removeProductById(id: ID!): Product
  }
`;
