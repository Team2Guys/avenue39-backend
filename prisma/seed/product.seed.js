// seedProducts.js
import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import { prisma } from '#lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_PATH = path.join(__dirname, 'data', 'avenue39_data.xlsx');
const SHEET_NAME = 'products';

export async function seedProducts() {
  console.log('🌱 Seeding products...');
  console.log('📂 Excel path:', EXCEL_PATH);

  const workbook = xlsx.readFile(EXCEL_PATH);
  const sheet = workbook.Sheets[SHEET_NAME];
  if (!sheet) throw new Error(`❌ Sheet "${SHEET_NAME}" not found`);

  const rows = xlsx.utils.sheet_to_json(sheet, { defval: null });
  console.log(`📄 Rows found: ${rows.length}`);
  if (!rows.length) throw new Error('❌ Products sheet is empty');

  // Fetch categories and subcategories
  const categories = await prisma.category.findMany({
    select: { id: true, name: true }
  });
  const subcategories = await prisma.subcategory.findMany({
    select: { id: true, name: true, categoryId: true }
  });

  const categoryMap = new Map(
    categories.map((c) => [c.name.trim().toLowerCase(), c.id])
  );
  const subcategoryMap = new Map(
    subcategories.map((sc) => [
      `${sc.name.trim().toLowerCase()}__${sc.categoryId}`,
      sc.id
    ])
  );

  // Resolve categoryId and subcategoryId for each row
  const resolvedRows = rows.map((row, index) => {
    const rowNum = index + 2;

    if (!row.categoryName) {
      throw new Error(`❌ Row ${rowNum}: categoryName missing`);
    }

    const categoryId = categoryMap.get(row.categoryName.trim().toLowerCase());
    if (!categoryId)
      throw new Error(
        `❌ Row ${rowNum}: Category "${row.categoryName}" not found`
      );

    let subcategoryId = null;
    if (row.subcategoryName) {
      const subcategoryKey = `${row.subcategoryName.trim().toLowerCase()}__${categoryId}`;
      subcategoryId = subcategoryMap.get(subcategoryKey) || null;

      if (!subcategoryId) {
        console.warn(
          `⚠️ Row ${rowNum}: Subcategory "${row.subcategoryName}" not found under category "${row.categoryName}". Product will be created without subcategory.`
        );
      }
    }

    const slug = slugify(row.name, { lower: true, strict: true });

    return {
      rowNum,
      categoryId,
      subcategoryId, // can now be null
      sku: row.sku || '',
      name: row.name,
      slug,
      breadcrumb: row.breadcrumb || '',
      description: row.description || '',
      materialDescription: row.materialDescription || '',
      dimensionDescription: row.dimensionDescription || '',
      posterImageUrl: row.posterImageUrl || '',
      productImages: parsePgArray(row.productImages, rowNum, 'productImages'),
      productOldUrl: row.productOldUrl || '',
      productNewUrl: row.productNewUrl || '',
      material: row.material || '',
      size: row.size || '',
      color: row.color || '',
      seats: Number(row.seats || 0),
      stock: Number(row.stock || 0),
      price: Number(row.price || 0),
      memberPrice: Number(row.memberPrice || 0),
      discountPrice: Number(row.discountPrice || 0),
      metaTitle: row.metaTitle || row.name,
      metaDescription: row.metaDescription || '',
      canonicalUrl: row.canonicalUrl || '',
      seoSchema: row.seoSchema || '',
      status: (row.status || 'PUBLISHED').toUpperCase(),
      lastEditedBy: row.lastEditedBy || 'seed-script'
    };
  });

  console.log('✅ Category & subcategory IDs resolved');

  // Upsert each product
  for (const row of resolvedRows) {
    try {
      await prisma.product.upsert({
        where: { sku: row.sku },
        update: { ...row, rowNum: undefined },
        create: { ...row, rowNum: undefined }
      });

      console.log(`➡️ [Row ${row.rowNum}] ${row.name} upserted successfully`);
    } catch (err) {
      throw new Error(
        `❌ Product upsert failed at row ${row.rowNum}: ${err.message}`
      );
    }
  }

  console.log('✅ Products seeded successfully');
}

// Helper to parse Postgres array string or handle empty arrays
export function parsePgArray(value, rowNum, fieldName) {
  if (Array.isArray(value)) return value;
  if (!value || value === '{}' || value === '[]') return [];

  if (typeof value !== 'string')
    throw new Error(`❌ Row ${rowNum}: ${fieldName} must be a string or array`);

  const trimmed = value.trim();

  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((v) => v.trim().replace(/^"(.*)"$/, '$1'))
      .filter(Boolean);
  }

  throw new Error(`❌ Row ${rowNum}: ${fieldName} is not a valid array format`);
}
