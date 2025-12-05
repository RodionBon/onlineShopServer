import { DataTypes } from "sequelize";
import sequelize from "./sequelize";
import Product from "./product.model";


const OrderItem = sequelize.define('order_item', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'order_item',
    timestamps: false,
    underscored: true
});

OrderItem.belongsTo(Product);


export default OrderItem;
