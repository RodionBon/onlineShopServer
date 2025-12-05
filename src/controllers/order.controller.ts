import { Context } from "koa";
import { CartItem, Product } from "../models";
import Order from "../models/order.model";
import OrderItem from "../models/orderItem.model";


export const getOrder = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;

        if (!userId) {
            ctx.status = 400;
            ctx.body = { error: 'Benutzer-ID fehlt im Token.' };
            return;
        }

        const orders = await Order.findAll({
            include: [{
                model: OrderItem,
                attributes: { exclude: ['productId', 'orderId'] },
                include: [{
                    model: Product
                }]
            }],
            attributes: { exclude: ['userId'] },
            where: { userId },
            order: [['id', 'ASC']],
        });

        ctx.status = 200;
        ctx.body = { orders, userId };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Interner Serverfehler' };
    }
}

export const createOrder = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;

        if (!userId) {
            ctx.status = 400;
            ctx.body = { error: 'Benutzer-ID fehlt im Token.' };
            return;
        }

        const order = await Order.create({ userId, ...ctx.request.body });

        const cartItems = await CartItem.findAll({
            include: [{ model: Product }],
            where: { userId },
            order: [['id', 'ASC']],
        });

        const orderItems = await Promise.all(cartItems.map(async (item: any) => {
            const newOrderItem = await OrderItem.create({
                orderId: order.getDataValue("id"),
                productId: item.productId,
                quantity: item.quantity
            });
            await item.destroy();
            return newOrderItem;
        }));

        ctx.status = 200;
        ctx.body = { order: { ...order.dataValues, orderItems } };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Interner Serverfehler' };
    }
}
