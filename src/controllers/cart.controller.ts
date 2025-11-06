import { Context } from "koa";
import { CartItem, Product } from "../models";

export const getCart = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;

        if (!userId) {
            ctx.status = 400;
            ctx.body = { error: 'Benutzer-ID fehlt im Token.' };
            return;
        }

        const cartItems = await CartItem.findAll({
            include: [{ model: Product }],
            where: { userId },
        });

        const cartItemsFormatted = cartItems.map((item: any) => {
            return {
                quantity: item.quantity,
                product: item.getDataValue('product')
            };
        });

        ctx.status = 200;
        ctx.body = { cartItems: cartItemsFormatted };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Interner Serverfehler' };
    }
}