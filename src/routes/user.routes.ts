import Router from "@koa/router";
import { getUser, signIn, signUp } from "../controllers/user.controller";

const router = new Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.get('/', getUser);

export default router;