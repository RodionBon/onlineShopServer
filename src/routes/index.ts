import Router from "@koa/router";
import ProductRouter from "./product.routes";
import UserRouter from "./user.routes";
import CartRouter from "./cart.routes";
import OrderRouter from "./order.router";
import { tokenCheck } from "../middleware/token.middleware";

const router = new Router();

router.get('/health', async ctx => {
  ctx.body = "Alles ist in Ordnung!";
});

router.use('/product', ProductRouter.routes());

router.use('/user', UserRouter.routes());

router.use('/cart', tokenCheck, CartRouter.routes());

router.use('/order', tokenCheck, OrderRouter.routes());

export default router;