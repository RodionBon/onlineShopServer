import Router from "@koa/router";
import { addToCart, deleteCartItem, getCart, updateCartItem } from "../controllers/cart.controller";

const router = new Router();

router.get('/', getCart);

router.post('/addItem', addToCart);

router.put('/updateItem', updateCartItem);

router.delete('/deleteItem', deleteCartItem);

export default router;