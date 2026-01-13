import { prisma } from '#lib/index.js';

export const subcategoryRepository = {
  read: {
    subcategoryList: () =>
      prisma.subcategory.findMany({
        include: {
          category: true,
          products: true
        }
      }),

    subcategoryById: (id) =>
      prisma.subcategory.findUnique({
        where: { id },
        include: {
          category: true,
          products: true
        }
      }),

    subcategoryByNewUrls: ({ categoryNewUrl, subcategoryNewUrl }) =>
      prisma.subcategory.findFirst({
        where: {
          subcategoryNewUrl,
          category: { categoryNewUrl }
        },
        include: {
          category: true,
          products: true
        }
      }),

    subcategoryByOldUrl: (subcategoryOldUrl) =>
      prisma.subcategory.findFirst({
        where: { subcategoryOldUrl },
        select: {
          subcategoryNewUrl: true,
          category: { select: { categoryNewUrl: true } }
        }
      })
  },

  write: {
    subcategory: (data) => prisma.subcategory.create({ data })
  },

  update: {
    subcategoryById: (id, data) =>
      prisma.subcategory.update({ where: { id }, data })
  },

  remove: {
    subcategoryById: (id) => prisma.subcategory.delete({ where: { id } })
  }
};
