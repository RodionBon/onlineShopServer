import Router from "@koa/router";
import { getUser, signIn, signUp, updateUserData } from "../controllers/user.controller";

const router = new Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

router.get('/', getUser);

router.patch('/', updateUserData);

export default router;