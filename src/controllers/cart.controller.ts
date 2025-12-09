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
            order: [['id', 'ASC']],
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

export const addToCart = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;

        if (!userId) {
            ctx.status = 400;
            ctx.body = { error: 'Benutzer-ID fehlt im Token.' };
            return;
        }

        const productId = ctx.request.body.productId;

        if (productId === undefined) {
            ctx.status = 400;
            ctx.body = { error: 'Produkt-ID ist erforderlich' };
            return;
        }

        const cartItem = await CartItem.findOne({
            include: [{ model: Product }],
            where: { userId, productId },
        });

        if (cartItem) {
            const newQuantity = cartItem.getDataValue('quantity') + 1;
            await cartItem.update({ quantity: newQuantity });
        } else {
            await CartItem.create({ userId, productId, quantity: 1 });
        }

        ctx.status = 200;
        ctx.body = { addedItem: cartItem };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Interner Serverfehler' };
    }
}

export const updateCartItem = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;

        if (!userId) {
            ctx.status = 400;
            ctx.body = { error: 'Benutzer-ID fehlt im Token.' };
            return;
        }

        const productId = ctx.request.body.productId;
        const quantity = ctx.request.body.quantity;

        if (productId === undefined || quantity === undefined) {
            ctx.status = 400;
            ctx.body = { error: 'Produkt-ID und Menge sind erforderlich' };
            return;
        }

        const cartItem = await CartItem.findOne({
            include: [{ model: Product }],
            where: { userId, productId },
        });

        if (!cartItem) {
            ctx.status = 404;
            ctx.body = { error: 'Artikel im Warenkorb nicht gefunden' };
            return;
        } else {
            await cartItem.update({ quantity });
        }

        ctx.status = 200;
        ctx.body = { updatedItem: cartItem };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Interner Serverfehler' };
    }
}

export const deleteCartItem = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;

        if (!userId) {
            ctx.status = 400;
            ctx.body = { error: 'Benutzer-ID fehlt im Token.' };
            return;
        }

        const productId = ctx.query.productId;

        if (productId === undefined) {
            ctx.status = 400;
            ctx.body = { error: 'Produkt-ID ist erforderlich' };
            return;
        }

        const cartItem = await CartItem.findOne({
            include: [{ model: Product }],
            where: { userId, productId },
        });

        if (!cartItem) {
            ctx.status = 404;
            ctx.body = { error: 'Artikel im Warenkorb nicht gefunden' };
            return;
        } else {
            await cartItem.destroy();
        }

        ctx.status = 200;
        ctx.body = {};
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Interner Serverfehler' };
    }
}

