import { prisma } from "@database/prisma";
import type { Product } from "@domain/entities/Product";
import type { IProductRepository } from "@domain/repositories/IProductRepository";
import type {
  ProductCreateInput,
  ProductFindManyArgs,
  ProductUpdateInput,
} from "../../../generated/prisma/models";
import type { DefaultArgs } from "@prisma/client/runtime/client";
import { ProductMapper } from "@infrastructure/mappers/ProductMapper";

export class ProductRepository implements IProductRepository {
  // async findAll(filters: ProductFindManyArgs<DefaultArgs>): Promise<Product[]> {
  //   const { select, omit, where, orderBy, cursor, take, skip, distinct } =
  //     filters;

  //   const products = await prisma.product.findMany({
  //     select: select ?? null,
  //     omit: omit ?? null,
  //     where: where ?? undefined,
  //     orderBy: orderBy ?? undefined,
  //     cursor: cursor ?? undefined,
  //     take: take ?? undefined,
  //     skip: skip ?? undefined,
  //     distinct: distinct ?? undefined,
  //   });
  //   return ProductMapper.toDomain(products);
  // }

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

  async update(data: ProductUpdateInput, skuId: string): Promise<Product> {
    return await prisma.product.update({
      where: { skuId },
      data: data,
    });
  }

  async delete(skuId: string): Promise<void> {
    await prisma.product.delete({
      where: { skuId },
    });
    return Promise.resolve();
  }
}
