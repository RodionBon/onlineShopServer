import Router from "@koa/router";
import ProductRouter from "./product.routes";
import UserRouter from "./user.routes";

const router = new Router();

router.get('/health', async ctx => {
  ctx.body = "Alles ist in Ordnung!";
});

router.use('/product', ProductRouter.routes());

router.use('/user', UserRouter.routes());

export default router;