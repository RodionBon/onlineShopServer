import { Context, Next } from 'koa';
import * as jwt from 'jsonwebtoken';

export const tokenCheck = async (ctx: Context, next: Next) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET wurde nicht gesetzt');
    }
    const authHeader = ctx.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        ctx.status = 401;
        ctx.body = { error: 'Kein Token angegeben.' };
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
            ctx.status = 401;
            ctx.body = { error: 'Ungültiger Token.' };
            return;
        }
        ctx.state.user = { id: decoded.id };
        await next();
    } catch (err) {
        ctx.status = 401;
        ctx.body = { error: 'Ungültiger Token.' };
        return;
    }
};
