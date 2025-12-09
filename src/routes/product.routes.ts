import Router from "@koa/router";
import { getFilteredProducts } from "../controllers/product.controller";

const router = new Router();

router.get('/', getFilteredProducts);

export default router;