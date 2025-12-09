import { Context } from "koa";
import { Product } from "../models";
import { Op, Order, Sequelize, WhereOptions } from "sequelize";

export const getFilteredProducts = async (ctx: Context) => {
    try {
        const { searchQuery, maxPrice, minPrice, isShowOnlyAvailable, sortOrder, itemsPerPage, pageNumber } = ctx.query;

        const whereOptions: WhereOptions = {};

        if (searchQuery) {
            whereOptions.title = { [Op.iLike]: `%${searchQuery}%` };
        }

        if (minPrice && maxPrice) {
            whereOptions.price = { [Op.between]: [minPrice, maxPrice] };
        }

        if (isShowOnlyAvailable === "true") {
            whereOptions.itemsLeft = { [Op.gt]: 0 };
        }

        let orderType: Order;
        switch (sortOrder) {
            case 'fromCheap':
                orderType = [['price', 'ASC']];
                break;
            case 'fromExpensive':
                orderType = [['price', 'DESC']];
                break;
            case 'fromZtoA':
                orderType = [[Sequelize.fn('LOWER', Sequelize.col('title')), 'DESC']];
                break;
            case 'fromAtoZ':
            default:
                orderType = [[Sequelize.fn('LOWER', Sequelize.col('title')), 'ASC']];
                break;
        }

        const products = await Product.findAll({
            where: whereOptions,
            order: orderType,
            limit: Number(itemsPerPage),
            offset: Number(pageNumber) * Number(itemsPerPage),
        });
        const totalProductsCount = await Product.count({ where: whereOptions });
        const maxAvailablePrice = await Product.max('price');

        ctx.status = 200;
        ctx.body = { products, totalProductsCount, maxAvailablePrice };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Internale Serverfehler' };
    }
}
