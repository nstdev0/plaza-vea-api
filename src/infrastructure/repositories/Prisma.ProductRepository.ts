import { AppError } from "../../domain/errors/AppError.js";
import type {
  IPageableRequest,
  IPageableResult,
} from "../../application/common/pagination.js";
import type { Product } from "../../domain/entities/Product.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { ProductCreateInput } from "../../generated/prisma/models.js";
import { prisma } from "../database/prisma.js";
import { inspect } from "node:util";

export class ProductRepository implements IProductRepository {
  async getAll(filters: IPageableRequest): Promise<IPageableResult<Product>> {
    let { page, pageSize, search } = filters ?? {};
    let { select, omit, where, orderBy, cursor, take, skip, distinct } =
      filters.filters ?? {};

    pageSize = pageSize ?? 10;

    if (pageSize >= 50) {
      throw new AppError(403, "pageSize cannot be greater than 50");
    }

    const limit = pageSize ?? 10;
    const offset = skip ?? (page && page > 0 ? (page - 1) * limit : 0);

    const [total, data] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        // select: select ?? null,
        // omit: omit ?? null,
        where: {
          name: {
            contains: search ?? "",
            mode: "insensitive",
          },
        },
        orderBy: orderBy ?? { updatedAt: "desc" },
        // cursor: cursor ?? undefined,
        take: limit,
        skip: offset,
        // distinct: distinct ?? undefined,
      }),
    ]);

    const pageableResult: IPageableResult<Product> = {
      totalData: total,
      currentPage: page ?? 1,
      pageSize: pageSize ?? 10,
      totalPages: Math.ceil(total / (pageSize ?? 1)) ?? 1,
      hasNext: page ? page * (pageSize ? pageSize : 10) < total : false,
      hasPrevious: page ? page > 1 : false,
      totalRecords: data.length,
      records: data,
    };

    return pageableResult;
  }

  async findBySkuId(skuId: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { skuId },
    });
  }

  async findByEan(ean: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: { ean },
    });
  }

  async create(data: ProductCreateInput): Promise<Product> {
    return await prisma.product.upsert({
      create: data,
      update: data,
      where: { skuId: data.skuId },
    });
  }
}
