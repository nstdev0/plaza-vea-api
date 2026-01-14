import type { NextFunction, Request, Response } from "express";
import type { GetAllProductsUseCase } from "../../application/use-cases/GetAllProducts.use-case.js";
import type { GetProductBySkuIdUseCase } from "../../application/use-cases/GetProductBySkuId.use-case.js";

export class ProductController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductBySkuIdUseCase: GetProductBySkuIdUseCase
  ) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { page, pageSize } = req.query;

    const filters = {
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 10,
    };

    try {
      const products = await this.getAllProductsUseCase.execute(filters);
      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skuId } = req.params;
      const product = await this.getProductBySkuIdUseCase.execute(
        skuId as string
      );
      res.json(product);
    } catch (error) {
      next(error);
    }
  };
}
