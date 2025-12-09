import Router from "@koa/router";
import { createOrder, getOrder } from "../controllers/order.controller";

const router = new Router();

router.get('/', getOrder);

router.post('/create', createOrder);


export default router;