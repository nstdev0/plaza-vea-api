import type { NextFunction, Request, Response } from "express";
import type { GetAllProductsUseCase } from "../../application/use-cases/GetAllLocalProducts.use-case.js";
import type { GetProductBySkuIdUseCase } from "../../application/use-cases/GetProductBySkuId.use-case.js";
import type { GetManyVtexProductsUseCase } from "../../application/use-cases/GetManyVtexProducts.use-case.js";
import type { GetManyVtexProductsAndSaveUseCase } from "../../application/use-cases/GetManyVtexProductsAndSave.use-case.js";
import { AppError } from "../../domain/errors/AppError.js";

export class ProductController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductBySkuIdUseCase: GetProductBySkuIdUseCase,
    private readonly getManyVtexUseCase: GetManyVtexProductsUseCase,
    private readonly getManyVtexProductsAndSaveUseCase: GetManyVtexProductsAndSaveUseCase
  ) {}

  getAllLocal = async (req: Request, res: Response, next: NextFunction) => {
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

  getManyVtex = async (req: Request, res: Response, next: NextFunction) => {
    let from = req.body.from ? req.body.from : "1";
    let to = req.body.to ? req.body.to : "10";

    try {
      const response = await this.getManyVtexUseCase.execute(from, to);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getAndSaveManyVtex = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let from = req.body.from ? req.body.from : "1";
    let to = req.body.to ? req.body.to : "10";

    try {
      if (Number(from) > Number(to)) {
        throw new AppError(400, "'from' cannot be greater than 'to'");
      }
      if (Number(to) - Number(from) >= 50) {
        throw new AppError(
          400,
          "Range between 'from' and 'to' cannot exceed 50"
        );
      }

      const response = await this.getManyVtexProductsAndSaveUseCase.execute(
        from,
        to
      );
      res.json(response);
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
