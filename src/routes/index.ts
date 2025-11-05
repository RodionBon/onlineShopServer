import Router from "@koa/router";
import ProductRouter from "./product.routes";

const router = new Router();

router.get('/health', async ctx => {
  ctx.body = "Alles ist in Ordnung!";
});

router.use('/product', ProductRouter.routes());

export default router;