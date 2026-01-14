import type { NextFunction, Request, Response } from "express";
import type { GetProductBySkuIdUseCase } from "../../application/use-cases/GetProductBySkuId.use-case";

export class ProductController {
  constructor(
    private readonly getProductBySkuIdUseCase: GetProductBySkuIdUseCase
  ) {}

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { skuId } = req.params;
      const product = await this.getProductBySkuIdUseCase.execute(
        skuId as string
      );
      console.log("PRODUCT----->", product);

      res.json(product);
    } catch (error) {
      next(error);
    }
  };
}
