import { Router } from "express";
import type { ProductController } from "../controllers/Product.controller.js";

export class ProductRoutes {
  static getRoutes(controller: ProductController): Router {
    const router = Router();

    router.get("/", controller.getAllLocal);
    router.get("/skuId/:skuId", controller.getOne);
    router.post("/vtex", controller.getManyVtex);
    router.post("/vtex/getAndSave", controller.getAndSaveManyVtex);
    router.delete("/", controller.deleteAll);
    router.get("/cron-fetch", controller.cronFetch);

    return router;
  }
}
