import Router from "@koa/router";
import { getCart } from "../controllers/cart.controller";

const router = new Router();

router.get('/', getCart);

export default router;