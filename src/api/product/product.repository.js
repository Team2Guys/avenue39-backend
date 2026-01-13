import { prisma } from '#lib/index.js';

export const productRepository = {
  read: {
    productList: () =>
      prisma.product.findMany({
        include: {
          category: true,
          subcategory: true
        }
      }),

    productById: (id) =>
      prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
          subcategory: true
        }
      }),

    productByNewUrls: ({ categoryNewUrl, subcategoryNewUrl, productNewUrl }) =>
      prisma.product.findFirst({
        where: {
          productNewUrl,
          subcategory: {
            subcategoryNewUrl,
            category: { categoryNewUrl }
          }
        },
        include: {
          category: true,
          subcategory: true
        }
      }),

    productByOldUrl: (productOldUrl) =>
      prisma.product.findFirst({
        where: { productOldUrl },
        select: {
          productNewUrl: true,
          subcategory: {
            select: {
              subcategoryNewUrl: true,
              category: { select: { categoryNewUrl: true } }
            }
          }
        }
      })
  },

  write: {
    product: (data) => prisma.product.create({ data })
  },

  update: {
    productById: (id, data) => prisma.product.update({ where: { id }, data })
  },

  remove: {
    productById: (id) => prisma.product.delete({ where: { id } })
  }
};
