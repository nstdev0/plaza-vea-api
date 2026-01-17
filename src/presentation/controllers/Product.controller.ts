import type { NextFunction, Request, Response } from "express";
import type { GetAllProductsUseCase } from "../../application/use-cases/GetAllLocalProducts.use-case.js";
import type { GetProductBySkuIdUseCase } from "../../application/use-cases/GetVtexProductBySkuId.use-case.js";
import type { GetManyVtexProductsUseCase } from "../../application/use-cases/GetManyVtexProducts.use-case.js";
import type { GetManyVtexProductsAndSaveUseCase } from "../../application/use-cases/GetManyVtexProductsAndSave.use-case.js";
import { AppError } from "../../domain/errors/AppError.js";
import { AppConfig } from "../../config/config.js";
import type { IPageableRequest } from "../../application/common/pagination.js";
import type { DeleteAllUseCase } from "../../application/use-cases/DeleteAll.use-case.js";

export class ProductController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductBySkuIdUseCase: GetProductBySkuIdUseCase,
    private readonly getManyVtexUseCase: GetManyVtexProductsUseCase,
    private readonly getManyVtexProductsAndSaveUseCase: GetManyVtexProductsAndSaveUseCase,
    private readonly deleteAllUseCase: DeleteAllUseCase,
  ) {}

  getAllLocal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, search, categories, orderBy } = req.query;

      const pageNumber = Number(page);
      const pageSizeNumber = Number(pageSize);

      const reqOptions: IPageableRequest = {
        page: !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1,
        pageSize:
          !isNaN(pageSizeNumber) && pageSizeNumber > 0 && pageSizeNumber <= 50
            ? pageSizeNumber
            : 10,
        search: typeof search === "string" ? search : "",
        filters: {
          categories: categories ? categories.toString() : "",
          orderBy: orderBy ? orderBy.toString() : "",
        },
      };

      const response = await this.getAllProductsUseCase.execute(reqOptions);
      res.json(response);
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
    next: NextFunction,
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
          "Range between 'from' and 'to' cannot exceed 50",
        );
      }

      const response = await this.getManyVtexProductsAndSaveUseCase.execute(
        from,
        to,
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
        skuId as string,
      );
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  cronFetch = async (req: Request, res: Response, next: NextFunction) => {
    req.setTimeout(10 * 60_000, () => {
      res.status(408).send("Cron timeout");
    }); // 10 minutes

    // const authHeader = req.headers["authorization"];

    // console.log("Cron fetch initiated");
    // console.log("Authorization Header:", authHeader);

    // if (authHeader !== `Bearer ${AppConfig.CRON_SECRET}`) {
    //   return res.status(401).send("No autorizado");
    // }

    try {
      const ranges = Array<[number, number]>();

      for (let start = 1; start <= 9000; start += 50) {
        ranges.push([start, start + 49]);
      }

      const BATCH_SIZE = 5;

      for (let i = 0; i < ranges.length; i += BATCH_SIZE) {
        const batch = ranges.slice(i, i + BATCH_SIZE);

        const results = await Promise.allSettled(
          batch.map(([from, to]) =>
            this.getManyVtexProductsAndSaveUseCase.execute(
              from.toString(),
              to.toString(),
            ),
          ),
        );

        const failed = results.filter((r) => r.status === "rejected");

        if (failed.length > 0) {
          console.error("Errores en batch:", failed.length);
        }
      }
      res.status(200).json({
        status: "ok",
        message: "Cron ejecutado correctamente",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteAllUseCase.execute();
    } catch (error) {
      next(error);
    }
  };
}
