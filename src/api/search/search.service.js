import { searchRepository } from './search.repository.js';

export const searchService = {
  search: async (input) => {
    const { query, categoryLimit, subcategoryLimit, productLimit } = input;
    if (!query || query.trim().length < 2) {
      return {
        categories: [],
        subcategories: [],
        products: []
      };
    }

    const q = query.trim();

    const [categories, subcategories, products] = await Promise.all([
      searchRepository.searchCategories(q, categoryLimit),
      searchRepository.searchSubcategories(q, subcategoryLimit),
      searchRepository.searchProducts(q, productLimit)
    ]);

    return {
      categories,
      subcategories,
      products
    };
  }
};
