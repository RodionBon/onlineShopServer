import { DataTypes } from "sequelize";
import sequelize from "./sequelize";

const CartItem = sequelize.define('cart_item', {
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    productId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    cartId: {
        type: DataTypes.NUMBER,
        allowNull: false
    }

}, {
    tableName: 'cart_item',
    timestamps: false,
    underscored: true
});



export default CartItem;

