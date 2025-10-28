import Router from "@koa/router";

const router = new Router();

router.get('/health', async ctx => {
  ctx.body = "Alles ist in Ordnung!";
});

export default router;