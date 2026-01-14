import { prisma } from "@database/prisma.js";
import type { Product } from "@domain/entities/Product.js";
import type { IProductRepository } from "@domain/repositories/IProductRepository.js";
import type {
  IPageableRequest,
  IPageableResult,
} from "src/application/common/pagination.js";
import type {
  ProductCreateInput,
  ProductUpdateInput,
} from "src/generated/prisma/models.js";

export class ProductRepository implements IProductRepository {
  async getAll(filters: IPageableRequest): Promise<IPageableResult<Product>> {
    const { page, pageSize } = filters ?? {};
    const { select, omit, where, orderBy, cursor, take, skip, distinct } =
      filters.filters ?? {};

    const [total, data] = await prisma.$transaction([
      prisma.product.count({
        where: { ...where },
      }),
      prisma.product.findMany({
        // select: select ?? null,
        // omit: omit ?? null,
        where: where ?? {},
        orderBy: orderBy ?? { updatedAt: "desc" },
        // cursor: cursor ?? undefined,
        take: pageSize ?? 10,
        skip: skip ?? 0,
        // distinct: distinct ?? undefined,
      }),
    ]);

    const pageableResult: IPageableResult<Product> = {
      totalRecords: total,
      currentPage: page ?? 1,
      pageSize: pageSize ?? 10,
      totalPages: Math.ceil(total / (pageSize ?? 1)) ?? 1,
      hasNext: page ? page * (pageSize ? pageSize : 10) < total : false,
      hasPrevious: page ? page > 1 : false,
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
