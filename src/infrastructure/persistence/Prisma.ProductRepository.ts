import { AppError } from "../../domain/errors/AppError.js";
import type {
  IPageableRequest,
  IPageableResult,
} from "../../application/common/pagination.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type {
  ProductOrderByWithRelationInput,
  ProductWhereInput,
} from "../../generated/prisma/models.js";
import { prisma } from "../database/prisma.js";
import type { Product } from "../../domain/entities/Product.js";
import { ProductMapper } from "../mappers/ProductMapper.js";
import type { ProductResponse } from "../../application/dtos/Product.dto.js";

export class ProductRepository implements IProductRepository {
  async getAll(
    filters: IPageableRequest,
  ): Promise<IPageableResult<ProductResponse>> {
    const { page = 1, pageSize = 10, search } = filters ?? {};
    const { categories, orderBy } = filters.filters ?? {};

    if (pageSize > 50) {
      throw new AppError(403, "pageSize cannot be greater than 50");
    }

    const limit = pageSize;
    const offset = (page - 1) * limit;

    const andConditions: ProductWhereInput[] = [];

    if (search) {
      const searchTerms = search.trim().split(/\s+/).filter(Boolean);
      if (searchTerms.length > 0) {
        const searchConditions = searchTerms.map((term) => ({
          OR: [
            { name: { contains: term, mode: "insensitive" as const } },
            { searchName: { contains: term, mode: "insensitive" as const } },
            { brand: { contains: term, mode: "insensitive" as const } },
            { categories: { has: term } },
          ],
        }));
        andConditions.push(...searchConditions);
      }
    }

    if (categories) {
      const cats = categories.trim().split(/\s+/).filter(Boolean);
      if (cats.length > 0) {
        const categoryConditions = cats.map((category) => ({
          categories: { has: category },
        }));
        andConditions.push(...categoryConditions);
      }
    }

    const whereClause: ProductWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

    let orderByClause: ProductOrderByWithRelationInput = { createdAt: "desc" };

    if (typeof orderBy === "string") {
      const [term, order] = orderBy.split(",");
      const allowedFields = ["price", "name", "createdAt"] as const;

      if (
        term &&
        allowedFields.includes(term as any) &&
        (order === "asc" || order === "desc")
      ) {
        orderByClause = { [term]: order };
      }
    }

    const [total, data] = await prisma.$transaction([
      prisma.product.count({ where: whereClause }),
      prisma.product.findMany({
        where: whereClause,
        orderBy: orderByClause,
        take: limit,
        skip: offset,
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    const mappedData = data.map((product) =>
      ProductMapper.fromPersistenceToDto(
        ProductMapper.fromPersistenceToDomain(product),
      ),
    );

    return {
      totalData: total,
      currentPage: page,
      pageSize: limit,
      totalPages: totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
      totalRecords: data.length,
      records: mappedData,
    };
  }

  async findBySkuId(skuId: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { skuId },
    });
    if (product) {
      return ProductMapper.fromPersistenceToDomain(product);
    }
    return null;
  }

  async findByEan(ean: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { ean },
    });
    if (product) {
      return ProductMapper.fromPersistenceToDomain(product);
    }
    return null;
  }

  async create(data: Product): Promise<Product> {
    const product = await prisma.product.upsert({
      create: ProductMapper.fromDomainToPersistence(data),
      update: ProductMapper.fromDomainToPersistence(data),
      where: { skuId: data.skuId },
    });
    return ProductMapper.fromPersistenceToDomain(product);
  }

  async deleteAll(): Promise<boolean> {
    const result = await prisma.product.deleteMany();
    if (result.count <= 0) return false;
    return true;
  }
}
